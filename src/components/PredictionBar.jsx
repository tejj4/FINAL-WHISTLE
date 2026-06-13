import { calculatePopularPick } from '../engine/format.js';

export default function PredictionBar({
  homeCompetitor, awayCompetitor, allowsDraw,
  homePercent: homePct, drawPercent: drawPct, awayPercent: awayPct,
}) {
  if (!homeCompetitor || !awayCompetitor) return null;

  const isAI = homePct !== undefined;
  const computed = calculatePopularPick(homeCompetitor.strength, awayCompetitor.strength, allowsDraw);
  const homePercent = isAI ? homePct : computed.homePercent;
  const drawPercent = isAI ? drawPct : computed.drawPercent;
  const awayPercent = isAI ? awayPct : computed.awayPercent;

  return (
    <div className="prediction-bar-wrap">
      {isAI && <span className="pbar-ai-tag">AI odds</span>}
      <div className="prediction-bar-track">
        <div className="prediction-bar-seg seg-home" style={{ width: `${homePercent}%` }} />
        {allowsDraw && drawPercent > 0 && (
          <div className="prediction-bar-seg seg-draw" style={{ width: `${drawPercent}%` }} />
        )}
        <div className="prediction-bar-seg seg-away" style={{ width: `${awayPercent}%` }} />
      </div>
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
