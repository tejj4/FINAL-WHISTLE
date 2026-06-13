import { calculatePopularPick } from '../engine/format.js';

export default function PredictionBar({ homeCompetitor, awayCompetitor, allowsDraw }) {
  if (!homeCompetitor || !awayCompetitor) return null;

  const { homePercent, drawPercent, awayPercent } = calculatePopularPick(
    homeCompetitor.strength,
    awayCompetitor.strength,
    allowsDraw
  );

  return (
    <div className="prediction-bar-wrap">
      {/* Segmented bar */}
      <div className="prediction-bar-track">
        <div className="prediction-bar-seg seg-home" style={{ width: `${homePercent}%` }} />
        {allowsDraw && drawPercent > 0 && (
          <div className="prediction-bar-seg seg-draw" style={{ width: `${drawPercent}%` }} />
        )}
        <div className="prediction-bar-seg seg-away" style={{ width: `${awayPercent}%` }} />
      </div>

      {/* Labels */}
      <div className="prediction-bar-labels">
        <span className="pbl-home">{homeCompetitor.abbr} {homePercent}%</span>
        {allowsDraw && drawPercent > 0 && (
          <span className="pbl-draw">Draw {drawPercent}%</span>
        )}
        <span className="pbl-away">{awayPercent}% {awayCompetitor.abbr}</span>
      </div>
    </div>
  );
}
