import { useState, useMemo } from 'react';
import { getFixtures, calculateStandings } from '../engine/format.js';
import GroupTable from './GroupTable.jsx';
import MatchCard from './MatchCard.jsx';

export default function LeagueView({ tournament, sport, competitors, predictions, onPick }) {
  const fixtures = useMemo(() => getFixtures(tournament), [tournament]);

  const standings = useMemo(
    () => calculateStandings(tournament.competitorIds, fixtures, predictions, sport.allowsDraw),
    [tournament, fixtures, predictions, sport]
  );

  const rounds = useMemo(
    () => [...new Set(fixtures.map(f => f.round))].sort((a, b) => a - b),
    [fixtures]
  );

  const [currentRound, setCurrentRound] = useState(rounds[0] ?? 1);
  const roundFixtures = fixtures.filter(f => f.round === currentRound);
  const totalRounds   = rounds.length;
  const roundIdx      = rounds.indexOf(currentRound);

  return (
    <div className="league-layout">
      {/* Left: fixtures with matchday nav */}
      <div>
        <div className="matchday-nav">
          <button
            className="matchday-btn"
            onClick={() => setCurrentRound(rounds[roundIdx - 1])}
            disabled={roundIdx === 0}
          >
            ‹ Prev
          </button>
          <span className="matchday-label">Matchday {currentRound}</span>
          <button
            className="matchday-btn"
            onClick={() => setCurrentRound(rounds[roundIdx + 1])}
            disabled={roundIdx >= totalRounds - 1}
          >
            Next ›
          </button>
        </div>

        <div className="card">
          <div className="fixtures-list" style={{ padding: '8px 12px 12px' }}>
            {roundFixtures.map(match => (
              <MatchCard
                key={match.id}
                match={match}
                homeCompetitor={competitors[match.homeId]}
                awayCompetitor={competitors[match.awayId]}
                prediction={predictions[match.id]}
                onPick={onPick}
                allowDraw={sport.allowsDraw}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right: live standings */}
      <div>
        <div className="card" style={{ position: 'sticky', top: 72 }}>
          <div className="group-header">
            <span className="group-header-badge">Table</span>
            Points Standings
          </div>
          <GroupTable
            standings={standings}
            competitors={competitors}
            advanceCount={4}
          />
        </div>
      </div>
    </div>
  );
}
