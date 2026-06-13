import { generateGroupFixtures, calculateStandings, getMatchStatus, simulateScore } from '../engine/format.js';
import MatchCard from './MatchCard.jsx';
import GroupTable from './GroupTable.jsx';

export default function GroupStage({ tournament, sport, competitors, predictions, onPick }) {
  const matchData = tournament.matchData ?? {};

  return (
    <div className="groups-grid">
      {tournament.groups.map((group, groupIndex) => {
        const fixtures  = generateGroupFixtures(group, tournament.startDate, groupIndex);
        const standings = calculateStandings(group.competitorIds, fixtures, predictions, sport.allowsDraw);

        return (
          <div key={group.id} className="group-block">
            <div className="group-header">
              <span className="group-header-badge">{group.id}</span>
              {group.name}
            </div>

            <GroupTable standings={standings} competitors={competitors} advanceCount={2} />

            <div className="fixtures-block">
              <div className="round-label">Fixtures</div>
              <div className="fixtures-list">
                {fixtures.map(match => {
                  const home = competitors[match.homeId];
                  const away = competitors[match.awayId];

                  // Look up real data (try home:away first, then reversed)
                  const fwdKey = `${match.homeId}:${match.awayId}`;
                  const bwdKey = `${match.awayId}:${match.homeId}`;
                  const actualFwd = matchData[fwdKey];
                  const actualBwd = matchData[bwdKey];
                  const actual  = actualFwd ?? actualBwd;
                  const flipped = !actualFwd && !!actualBwd;

                  const date   = actual?.date ?? match.date;
                  const hasRealScore = actual && 'home' in actual;
                  // Force 'played' when we have a confirmed score, even if date is today
                  const status = hasRealScore ? 'played' : getMatchStatus(date);

                  // Real score > simulated for played matches
                  let score = null;
                  if (status === 'played') {
                    if (actual && 'home' in actual) {
                      score = flipped
                        ? { home: actual.away, away: actual.home }
                        : { home: actual.home, away: actual.away };
                    } else if (home && away) {
                      score = simulateScore(match.id, home.strength, away.strength);
                    }
                  }

                  // Expert prediction data — swap percentages when home/away is flipped
                  const expertPick   = actual?.expertPick;
                  const insight      = status !== 'played' ? actual?.insight : undefined;
                  const homePercent  = actual?.homePercent !== undefined
                    ? (flipped ? actual.awayPercent : actual.homePercent)
                    : undefined;
                  const drawPercent  = actual?.drawPercent;
                  const awayPercent  = actual?.awayPercent !== undefined
                    ? (flipped ? actual.homePercent : actual.awayPercent)
                    : undefined;

                  return (
                    <MatchCard
                      key={match.id}
                      match={{ ...match, date, time: actual?.time }}
                      homeCompetitor={home}
                      awayCompetitor={away}
                      prediction={predictions[match.id]}
                      onPick={onPick}
                      allowDraw={sport.allowsDraw}
                      status={status}
                      score={score}
                      insight={insight}
                      expertPick={expertPick}
                      homePercent={homePercent}
                      drawPercent={drawPercent}
                      awayPercent={awayPercent}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
