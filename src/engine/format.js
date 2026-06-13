// Per-sport rules engine. All functions are pure — no side effects.

// ── Group fixture generation ──────────────────────────────────────────────

// startDate + groupIndex (0-11) are optional — pass them to get date fields on each fixture.
export function generateGroupFixtures(group, startDate = null, groupIndex = 0) {
  const { id, competitorIds } = group;
  const [p0, p1, p2, p3] = competitorIds;

  // Standard FIFA round-robin rotation for 4 teams (seed1vs2, seed3vs4 in R1)
  const rounds = [
    [[p0, p1], [p2, p3]],
    [[p0, p2], [p1, p3]],
    [[p0, p3], [p1, p2]],
  ];

  const matches = [];
  rounds.forEach(([[h1, a1], [h2, a2]], rIdx) => {
    const round = rIdx + 1;
    const date  = startDate ? _groupRoundDate(startDate, round, groupIndex) : null;
    matches.push(
      { id: `grp_${id}_r${round}_0`, stage: 'group', groupId: id, round, homeId: h1, awayId: a1, date },
      { id: `grp_${id}_r${round}_1`, stage: 'group', groupId: id, round, homeId: h2, awayId: a2, date },
    );
  });

  return matches;
}

// Groups 0-2 → day 0, 3-5 → day 1, 6-8 → day 2, 9-11 → day 3.
// Round offsets: R1=+0, R2=+4, R3=+13 days from tournament start.
function _groupRoundDate(startDate, round, groupIndex) {
  const base = [0, 4, 13][round - 1] ?? 0;
  const d = new Date(startDate);
  d.setDate(d.getDate() + base + Math.floor(groupIndex / 3));
  return d.toISOString().split('T')[0];
}

// ── Round-robin schedule (circle method) ─────────────────────────────────
// Returns [{id, round, homeId, awayId}] for all matchdays.
// doubleRoundRobin=true → home+away legs (2*(n-1) rounds).
export function generateRoundRobinSchedule(competitorIds, doubleRoundRobin = true) {
  const n = competitorIds.length;
  // Pad to even if odd (bye week as null)
  const teams = n % 2 === 0 ? [...competitorIds] : [...competitorIds, null];
  const size  = teams.length;
  const rounds = size - 1;
  const fixed  = teams[0];
  const rotating = teams.slice(1);
  const fixtures = [];

  for (let r = 0; r < rounds; r++) {
    const roundTeams = [fixed, ...rotating];
    for (let m = 0; m < size / 2; m++) {
      const home = roundTeams[m];
      const away = roundTeams[size - 1 - m];
      if (home && away) {
        fixtures.push({ id: `rr_r${r + 1}_${home}_${away}`, round: r + 1, homeId: home, awayId: away });
      }
    }
    // Rotate: move last element of rotating to front
    rotating.unshift(rotating.pop());
  }

  if (!doubleRoundRobin) return fixtures;

  // Second leg: swap home/away, offset round numbers
  const secondLeg = fixtures.map(f => ({
    id:     `rr_r${f.round + rounds}_${f.awayId}_${f.homeId}`,
    round:  f.round + rounds,
    homeId: f.awayId,
    awayId: f.homeId,
  }));

  return [...fixtures, ...secondLeg];
}

// ── NFL schedule generator ────────────────────────────────────────────────
// Produces a simplified 18-week schedule (17 games per team, 1 bye each).
// Division games are scheduled first (home+away vs 3 division opponents),
// remaining games filled from round-robin across other teams.
export function generateNFLSchedule(tournament) {
  const { competitorIds, divisions } = tournament;
  // Build lookup: teamId → divisionName
  const teamDiv = {};
  const divTeams = {};
  Object.entries(divisions).forEach(([div, teams]) => {
    teams.forEach(t => { teamDiv[t] = div; });
    divTeams[div] = teams;
  });

  const allFixtures = [];
  let matchIdx = 0;

  // 1) Schedule all intra-division games (home+away vs 3 div opponents = 6 games each)
  const divisionsDone = new Set();
  Object.entries(divTeams).forEach(([div, teams]) => {
    if (divisionsDone.has(div)) return;
    divisionsDone.add(div);
    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        allFixtures.push({ id: `nfl_d${matchIdx++}`, round: null, homeId: teams[i], awayId: teams[j] });
        allFixtures.push({ id: `nfl_d${matchIdx++}`, round: null, homeId: teams[j], awayId: teams[i] });
      }
    }
  });

  // 2) Fill remaining 11 games per team from inter-division matchups
  //    Use round-robin on full 32-team list, skip pairs already scheduled
  const divPairs = new Set(allFixtures.map(f => `${f.homeId}|${f.awayId}`));
  const extraFixtures = [];

  const rrAll = generateRoundRobinSchedule(competitorIds, false); // single round-robin
  rrAll.forEach(f => {
    if (!divPairs.has(`${f.homeId}|${f.awayId}`) && !divPairs.has(`${f.awayId}|${f.homeId}`)) {
      extraFixtures.push({ id: `nfl_e${matchIdx++}`, round: null, homeId: f.homeId, awayId: f.awayId });
    }
  });

  // Combine, then assign week numbers (18 weeks, 16 games/week, 1 bye per team)
  const combined = [...allFixtures, ...extraFixtures];
  const weekAssignments = assignNFLWeeks(combined, competitorIds);
  return weekAssignments;
}

function assignNFLWeeks(fixtures, teams) {
  // Greedy week assignment: each team plays at most once per week, byes in weeks 5-14
  const byeWeeks = {};
  teams.forEach((t, i) => { byeWeeks[t] = 5 + (i % 10); }); // spread byes over weeks 5-14

  const weekSlots = {}; // week → Set of teams playing that week
  for (let w = 1; w <= 18; w++) weekSlots[w] = new Set();

  const result = [];
  const unscheduled = [...fixtures];
  let attempts = 0;

  while (unscheduled.length > 0 && attempts < unscheduled.length * 100) {
    const f = unscheduled.shift();
    let placed = false;
    for (let w = 1; w <= 18; w++) {
      const slot = weekSlots[w];
      if (slot.has(f.homeId) || slot.has(f.awayId)) continue;
      if (byeWeeks[f.homeId] === w || byeWeeks[f.awayId] === w) continue;
      slot.add(f.homeId);
      slot.add(f.awayId);
      result.push({ ...f, round: w });
      placed = true;
      break;
    }
    if (!placed) {
      unscheduled.push(f);
      attempts++;
    }
  }

  // Any still unscheduled: force into any open slot
  unscheduled.forEach(f => {
    result.push({ ...f, round: 18 });
  });

  return result.sort((a, b) => a.round - b.round);
}

// ── Unified fixture getter ────────────────────────────────────────────────
// Use this everywhere instead of reading tournament.fixtures directly.
export function getFixtures(tournament) {
  if (tournament.fixtures)  return tournament.fixtures;                // IPL/explicit
  if (tournament.divisions) return generateNFLSchedule(tournament);   // NFL
  return generateRoundRobinSchedule(tournament.competitorIds, true);   // EPL, Liga, etc.
}

// ── Standings calculation ─────────────────────────────────────────────────
// realScores: optional map of matchId → { home, away } for actual goal data
export function calculateStandings(competitorIds, matches, predictions, allowsDraw, realScores = {}) {
  const table = {};
  competitorIds.forEach(id => {
    table[id] = { competitorId: id, mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 };
  });

  matches.forEach(match => {
    const pick = predictions[match.id];
    if (!pick) return;
    const { homeId, awayId } = match;
    if (!table[homeId] || !table[awayId]) return;
    table[homeId].mp++;
    table[awayId].mp++;

    // Add real goals when available
    const rs = realScores[match.id];
    if (rs) {
      table[homeId].gf += rs.home; table[homeId].ga += rs.away;
      table[awayId].gf += rs.away; table[awayId].ga += rs.home;
    }

    if (allowsDraw && pick === 'draw') {
      table[homeId].d++; table[homeId].pts += 1;
      table[awayId].d++; table[awayId].pts += 1;
    } else {
      const loser = pick === homeId ? awayId : homeId;
      table[pick].w++;  table[pick].pts += 3;
      table[loser].l++;
    }
  });

  return Object.values(table).sort((a, b) => {
    const gdA = a.gf - a.ga, gdB = b.gf - b.ga;
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (gdB !== gdA)     return gdB - gdA;
    if (b.gf  !== a.gf)  return b.gf - a.gf;
    return b.w - a.w;
  });
}

// ── Source resolution ─────────────────────────────────────────────────────

export function resolveSource(source, groupStandings, predictions) {
  if (!source) return null;

  if (source.type === 'group') {
    const standings = groupStandings?.[source.groupId];
    if (!standings) return null;
    return standings[source.pos - 1]?.competitorId ?? null;
  }

  if (source.type === 'match') {
    return predictions[source.matchId] ?? null;
  }

  if (source.type === 'best3rd') {
    // Collect all third-place teams across all groups, sorted by pts then wins
    const thirds = Object.values(groupStandings ?? {})
      .map(s => s[2])               // index 2 = 3rd place
      .filter(Boolean)
      .sort((a, b) => b.pts !== a.pts ? b.pts - a.pts : b.w - a.w);
    return thirds[source.rank - 1]?.competitorId ?? null;
  }

  return null;
}

export function sourceLabel(source) {
  if (!source) return 'TBD';
  if (source.type === 'group')   return `${source.pos === 1 ? 'Winner' : 'Runner-up'} Grp ${source.groupId}`;
  if (source.type === 'best3rd') return `Best 3rd #${source.rank}`;
  return 'TBD';
}

// ── Bracket slot resolution ───────────────────────────────────────────────
export function resolveBracketSlot(tournament, roundIndex, matchIndex, side, predictions) {
  if (roundIndex === 0) {
    const m = tournament.rounds[0].matches[matchIndex];
    return side === 'home' ? m.homeId : m.awayId;
  }
  const prevMatchIndex = matchIndex * 2 + (side === 'away' ? 1 : 0);
  const prevRound = tournament.rounds[roundIndex - 1];
  if (!prevRound?.matches[prevMatchIndex]) return null;
  return predictions[prevRound.matches[prevMatchIndex].id] ?? null;
}

// ── Groups-format knockout builder ────────────────────────────────────────
export function buildGroupsKnockout(tournament, groupStandings, predictions) {
  return tournament.knockoutRounds.map(round => ({
    ...round,
    matches: round.matches.map(match => ({
      ...match,
      homeId:    resolveSource(match.homeSource, groupStandings, predictions),
      awayId:    resolveSource(match.awaySource, groupStandings, predictions),
      homeLabel: sourceLabel(match.homeSource),
      awayLabel: sourceLabel(match.awaySource),
    })),
  }));
}

// ── Champion helpers ──────────────────────────────────────────────────────
export function getChampion(tournament, groupStandings, predictions) {
  if (tournament.formatType === 'bracket') {
    const last = tournament.rounds[tournament.rounds.length - 1];
    return predictions[last.matches[0].id] ?? null;
  }
  if (tournament.formatType === 'groups') {
    const last = tournament.knockoutRounds[tournament.knockoutRounds.length - 1];
    return predictions[last.matches[0].id] ?? null;
  }
  if (tournament.formatType === 'league') {
    const fixtures  = getFixtures(tournament);
    const standings = calculateStandings(tournament.competitorIds, fixtures, predictions, false);
    return standings[0]?.mp > 0 ? standings[0].competitorId : null;
  }
  return null;
}

export function getChampionPath(tournament, groupStandings, predictions) {
  const champion = getChampion(tournament, groupStandings, predictions);
  if (!champion) return [];
  const path = [];

  if (tournament.formatType === 'bracket') {
    tournament.rounds.forEach((round, ri) => {
      round.matches.forEach((match, mi) => {
        if (predictions[match.id] === champion) {
          const homeId = resolveBracketSlot(tournament, ri, mi, 'home', predictions);
          const awayId = resolveBracketSlot(tournament, ri, mi, 'away', predictions);
          const opp = homeId === champion ? awayId : homeId;
          if (opp) path.push({ round: round.name, opponentId: opp });
        }
      });
    });
  }

  if (tournament.formatType === 'groups') {
    buildGroupsKnockout(tournament, groupStandings, predictions).forEach(round => {
      round.matches.forEach(match => {
        if (predictions[match.id] === champion) {
          const opp = match.homeId === champion ? match.awayId : match.homeId;
          if (opp) path.push({ round: round.name, opponentId: opp });
        }
      });
    });
  }

  return path;
}

// ── Popular pick calculator ───────────────────────────────────────────────
function sigmoid(x) { return 1 / (1 + Math.exp(-x)); }

export function calculatePopularPick(homeStrength, awayStrength, allowsDraw) {
  const adj      = (homeStrength + 5 - awayStrength) * 0.08;
  const rawHome  = sigmoid(adj);
  const rawAway  = sigmoid(-adj);
  const rawDraw  = allowsDraw ? Math.max(0.08, 0.35 - Math.abs(adj) * 1.2) : 0;
  const total    = rawHome + rawAway + rawDraw;
  const home     = Math.round((rawHome / total) * 100);
  const away     = Math.round((rawAway / total) * 100);
  const draw     = 100 - home - away;
  return { homePercent: home, drawPercent: Math.max(0, draw), awayPercent: away };
}

// ── Date utilities ────────────────────────────────────────────────────────
export function getTournamentStatus(tournament) {
  const now   = new Date();
  const start = new Date(tournament.startDate);
  const end   = new Date(tournament.endDate);
  if (now < start) return 'upcoming';
  if (now > end)   return 'ended';
  return 'live';
}

export function getDaysUntil(dateStr) {
  const diff = new Date(dateStr) - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// ── Match-level date/score helpers ────────────────────────────────────────

export function getMatchStatus(dateStr) {
  if (!dateStr) return 'upcoming';
  const today = new Date().toISOString().split('T')[0];
  if (dateStr < today) return 'played';
  if (dateStr === today) return 'live';
  return 'upcoming';
}

export function formatMatchDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export function formatMatchTime(timeStr) {
  if (!timeStr) return '';
  const [h, m] = timeStr.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12}:${m.toString().padStart(2, '0')} ${ampm} SGT`;
}

// Deterministic simulated FT score for played matches.
// Same matchId always produces the same score.
export function simulateScore(matchId, homeStrength, awayStrength) {
  const s = Math.abs([...matchId].reduce((h, c) => ((h * 31) + c.charCodeAt(0)) | 0, 0));
  const adj = homeStrength + 5 - awayStrength; // positive → home favoured
  const homeBase = adj > 10 ? 2 : 1;
  const awayBase = adj < -10 ? 2 : adj < 0 ? 1 : 0;
  return {
    home: Math.min(homeBase + (s % 3), 5),
    away: Math.min(awayBase + ((s >>> 4) % 3), 4),
  };
}
