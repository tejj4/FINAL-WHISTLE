import { useState, useMemo } from 'react';
import {
  generateGroupFixtures,
  calculateStandings,
  buildGroupsKnockout,
  getFixtures,
} from '../engine/format.js';
import GroupStage from './GroupStage.jsx';
import KnockoutBracket from './KnockoutBracket.jsx';
import LeagueView from './LeagueView.jsx';
import ChampionSummary from './ChampionSummary.jsx';

export default function TournamentView({ tournament, sport, competitors, predictions, onPick, onReset, userScores, onScoreInput }) {
  const fmt = tournament.formatType;

  const tabs = useMemo(() => {
    if (fmt === 'groups')  return ['Groups', 'Knockout', 'Champion'];
    if (fmt === 'bracket') return ['Bracket', 'Champion'];
    if (fmt === 'league')  return ['Standings & Fixtures', 'Champion'];
    return [];
  }, [fmt]);

  const [activeTab, setActiveTab] = useState(tabs[0]);

  // Build picks from real scores in matchData so standings reflect actual results
  const realPicks = useMemo(() => {
    if (fmt !== 'groups' || !tournament.matchData) return {};
    const picks = {};
    tournament.groups.forEach((group, gi) => {
      generateGroupFixtures(group, tournament.startDate, gi).forEach(match => {
        const fwdKey = `${match.homeId}:${match.awayId}`;
        const bwdKey = `${match.awayId}:${match.homeId}`;
        const actual = tournament.matchData[fwdKey] ?? tournament.matchData[bwdKey];
        const flipped = !tournament.matchData[fwdKey] && !!tournament.matchData[bwdKey];
        if (!actual || !('home' in actual)) return;
        const homeGoals = flipped ? actual.away : actual.home;
        const awayGoals = flipped ? actual.home : actual.away;
        if (homeGoals > awayGoals) picks[match.id] = match.homeId;
        else if (awayGoals > homeGoals) picks[match.id] = match.awayId;
        else picks[match.id] = 'draw';
      });
    });
    return picks;
  }, [tournament, fmt]);

  const groupStandings = useMemo(() => {
    if (fmt !== 'groups') return null;
    // Real scores override user predictions in standings
    const merged = { ...predictions, ...realPicks };
    const result = {};
    tournament.groups.forEach(group => {
      result[group.id] = calculateStandings(
        group.competitorIds,
        generateGroupFixtures(group),
        merged,
        sport.allowsDraw
      );
    });
    return result;
  }, [tournament, predictions, realPicks, sport, fmt]);

  const resolvedKnockoutRounds = useMemo(() => {
    if (fmt !== 'groups') return null;
    return buildGroupsKnockout(tournament, groupStandings, predictions);
  }, [fmt, tournament, groupStandings, predictions]);

  const totalMatches = useMemo(() => countTotalMatches(tournament), [tournament]);
  const pickedCount  = Object.keys(predictions).length;
  const progress     = totalMatches > 0 ? (pickedCount / totalMatches) * 100 : 0;

  return (
    <div>
      <div className="flex-row" style={{ marginBottom: 8 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '.78rem', color: 'var(--text3)', marginBottom: 4 }}>
            {pickedCount} / {totalMatches} matches predicted
          </div>
          <div className="progress-bar-wrap">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <button className="reset-btn" onClick={onReset}>Reset</button>
      </div>

      <div className="tabs">
        {tabs.map(t => (
          <button
            key={t}
            className={`tab-btn${activeTab === t ? ' active' : ''}`}
            onClick={() => setActiveTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {activeTab === 'Groups' && (
        <GroupStage
          tournament={tournament}
          sport={sport}
          competitors={competitors}
          predictions={predictions}
          onPick={onPick}
          userScores={userScores}
          onScoreInput={onScoreInput}
        />
      )}
      {activeTab === 'Knockout' && (
        <KnockoutBracket
          resolvedRounds={resolvedKnockoutRounds}
          competitors={competitors}
          predictions={predictions}
          onPick={onPick}
          sport={sport}
          userScores={userScores}
          onScoreInput={onScoreInput}
        />
      )}
      {activeTab === 'Bracket' && (
        <KnockoutBracket
          tournament={tournament}
          competitors={competitors}
          predictions={predictions}
          onPick={onPick}
          sport={sport}
          userScores={userScores}
          onScoreInput={onScoreInput}
        />
      )}
      {activeTab === 'Standings & Fixtures' && (
        <LeagueView
          tournament={tournament}
          sport={sport}
          competitors={competitors}
          predictions={predictions}
          onPick={onPick}
        />
      )}
      {activeTab === 'Champion' && (
        <ChampionSummary
          tournament={tournament}
          groupStandings={groupStandings}
          predictions={predictions}
          competitors={competitors}
        />
      )}
    </div>
  );
}

function countTotalMatches(tournament) {
  if (tournament.formatType === 'groups') {
    const groupM   = tournament.groups.reduce((s, g) => s + generateGroupFixtures(g).length, 0);
    const knockoutM = (tournament.knockoutRounds ?? []).reduce((s, r) => s + r.matches.length, 0);
    return groupM + knockoutM;
  }
  if (tournament.formatType === 'bracket') {
    return tournament.rounds.reduce((s, r) => s + r.matches.length, 0);
  }
  if (tournament.formatType === 'league') {
    const n = tournament.competitorIds.length;
    // double round-robin: n*(n-1) total matches; NFL approximation
    return tournament.divisions
      ? Math.round(tournament.competitorIds.length * 17 / 2)
      : n * (n - 1);
  }
  return 0;
}
