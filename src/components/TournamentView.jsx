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

  const groupStandings = useMemo(() => {
    if (fmt !== 'groups') return null;
    const result = {};
    tournament.groups.forEach(group => {
      result[group.id] = calculateStandings(
        group.competitorIds,
        generateGroupFixtures(group),
        predictions,
        sport.allowsDraw
      );
    });
    return result;
  }, [tournament, predictions, sport, fmt]);

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
