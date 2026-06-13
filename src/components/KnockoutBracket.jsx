import MatchCard from './MatchCard.jsx';
import { resolveBracketSlot, resolveSource, sourceLabel, calculatePopularPick } from '../engine/format.js';

// Renders either a pure bracket tournament or the knockout stage of a groups tournament.
// For pure bracket: pass `tournament` with .rounds, `predictions`.
// For groups knockout: pass `resolvedRounds` (already resolved), `predictions`.
export default function KnockoutBracket({ tournament, resolvedRounds, competitors, predictions, onPick, sport, userScores, onScoreInput }) {
  const rounds = resolvedRounds ?? buildBracketRounds(tournament, predictions);

  return (
    <div className="bracket-scroll">
      <div className="bracket">
        {rounds.map((round, ri) => (
          <RoundColumn
            key={round.id}
            round={round}
            roundIndex={ri}
            totalRounds={rounds.length}
            competitors={competitors}
            predictions={predictions}
            onPick={onPick}
            sport={sport}
            userScores={userScores}
            onScoreInput={onScoreInput}
          />
        ))}

        {/* Champion slot */}
        <ChampionSlot
          finalRound={rounds[rounds.length - 1]}
          predictions={predictions}
          competitors={competitors}
        />
      </div>
    </div>
  );
}

function buildBracketRounds(tournament, predictions) {
  return tournament.rounds.map((round, ri) => ({
    ...round,
    matches: round.matches.map((match, mi) => ({
      ...match,
      homeId: resolveBracketSlot(tournament, ri, mi, 'home', predictions),
      awayId: resolveBracketSlot(tournament, ri, mi, 'away', predictions),
    })),
  }));
}

function RoundColumn({ round, roundIndex, totalRounds, competitors, predictions, onPick, sport, userScores, onScoreInput }) {
  const matchCount = round.matches.length;

  return (
    <>
      <div className="bracket-round">
        <div className="bracket-round-header">{round.name}</div>
        <div className="bracket-round-matches" style={{ gap: `${matchCount > 2 ? 8 : 16}px` }}>
          {round.matches.map(match => {
            const home      = match.homeId ? competitors[match.homeId] : null;
            const away      = match.awayId ? competitors[match.awayId] : null;
            const allowDraw = sport?.allowsDraw ?? false;
            const pickPcts  = home && away
              ? calculatePopularPick(home.strength, away.strength, allowDraw)
              : null;
            return (
              <div key={match.id} className="bracket-match-wrapper">
                <MatchCard
                  match={match}
                  homeCompetitor={home}
                  awayCompetitor={away}
                  homeLabel={match.homeLabel}
                  awayLabel={match.awayLabel}
                  prediction={predictions[match.id]}
                  onPick={onPick}
                  allowDraw={allowDraw}
                  userScore={userScores?.[match.id]}
                  onScoreInput={onScoreInput}
                  homePercent={pickPcts?.homePercent}
                  drawPercent={pickPcts?.drawPercent}
                  awayPercent={pickPcts?.awayPercent}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Connector lines between rounds (not after the last round) */}
      {roundIndex < totalRounds - 1 && (
        <ConnectorColumn matchCount={matchCount} />
      )}
    </>
  );
}

function ConnectorColumn({ matchCount }) {
  const pairs = Math.ceil(matchCount / 2);
  return (
    <div className="bracket-connector" style={{ justifyContent: 'space-around' }}>
      {Array.from({ length: pairs }).map((_, i) => (
        <div key={i} className="bracket-connector-pair">
          <div className="connector-line top" />
          <div className="connector-line bot" />
        </div>
      ))}
    </div>
  );
}

function ChampionSlot({ finalRound, predictions, competitors }) {
  const finalMatchId = finalRound?.matches[0]?.id;
  const championId = finalMatchId ? predictions[finalMatchId] : null;
  const champion = championId ? competitors[championId] : null;

  return (
    <div className="bracket-round" style={{ minWidth: 140, justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="bracket-round-header">Champion</div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 8px' }}>
        {champion ? (
          <div style={{ textAlign: 'center' }}>
            <div
              className="comp-avatar"
              style={{ width: 54, height: 54, background: champion.bg, color: champion.fg, fontSize: '.9rem', borderRadius: 10, margin: '0 auto 8px' }}
            >
              {champion.abbr}
            </div>
            <div style={{ fontSize: '.85rem', fontWeight: 700, color: 'var(--green)' }}>{champion.name}</div>
          </div>
        ) : (
          <div style={{ color: 'var(--text3)', fontSize: '.8rem', textAlign: 'center' }}>Pick<br/>winners</div>
        )}
      </div>
    </div>
  );
}
