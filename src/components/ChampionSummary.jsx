import { getChampion, getChampionPath } from '../engine/format.js';

export default function ChampionSummary({ tournament, groupStandings, predictions, competitors }) {
  const championId = getChampion(tournament, groupStandings, predictions);
  const champion = championId ? competitors[championId] : null;

  if (!champion) {
    return (
      <div className="champion-empty">
        Make your predictions to reveal your predicted champion.
      </div>
    );
  }

  const path = getChampionPath(tournament, groupStandings, predictions);

  return (
    <div className="champion-wrap">
      <div className="champion-label">Predicted Champion</div>

      {/* TODO: replace div with <img src={champion.logoUrl} className="champion-avatar" /> */}
      <div
        className="champion-avatar"
        style={{ background: champion.bg, color: champion.fg }}
      >
        {champion.abbr}
      </div>

      <div className="champion-trophy">🏆</div>
      <div className="champion-name">{champion.name}</div>

      {path.length > 0 && (
        <>
          <div className="champion-path-title">Path to glory</div>
          <div className="champion-path">
            {path.map((step, i) => {
              const opp = competitors[step.opponentId];
              return (
                <span key={i} className="champion-path-item">
                  <strong>{step.round}:</strong> beat {opp?.name ?? '?'}
                </span>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
