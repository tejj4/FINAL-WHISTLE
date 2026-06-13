import PredictionBar from './PredictionBar.jsx';
import { getMatchStatus, simulateScore, formatMatchDate } from '../engine/format.js';

export default function MatchCard({
  match,
  homeCompetitor,
  awayCompetitor,
  homeLabel,
  awayLabel,
  prediction,
  onPick,
  allowDraw,
  status: statusProp,
  score:  scoreProp,
  insight,
  expertPick,
  homePercent,
  drawPercent,
  awayPercent,
}) {
  const status   = statusProp ?? getMatchStatus(match.date);
  const isPlayed = status === 'played';
  const isLive   = status === 'live';

  const score = scoreProp ?? (
    isPlayed && homeCompetitor && awayCompetitor
      ? simulateScore(match.id, homeCompetitor.strength, awayCompetitor.strength)
      : null
  );

  const canPick    = !isPlayed && homeCompetitor && awayCompetitor;
  const pickedHome = canPick && prediction === homeCompetitor?.id;
  const pickedAway = canPick && prediction === awayCompetitor?.id;
  const pickedDraw = canPick && prediction === 'draw';

  const expertTeam = expertPick === homeCompetitor?.id
    ? homeCompetitor
    : expertPick === awayCompetitor?.id
      ? awayCompetitor
      : null;

  function handlePick(id) {
    if (!canPick) return;
    onPick(match.id, prediction === id ? null : id);
  }
  function handleDraw() {
    if (!canPick) return;
    onPick(match.id, pickedDraw ? null : 'draw');
  }

  const cardClass = [
    'match-card',
    isPlayed ? 'match-played' : '',
    isLive   ? 'match-live'   : '',
    pickedHome ? 'picked-home' : '',
    pickedAway ? 'picked-away' : '',
    pickedDraw ? 'picked-draw' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClass}>

      {/* Date / status header */}
      {match.date && (
        <div className="match-date-row">
          {isLive   && <span className="mbadge mbadge-live">LIVE</span>}
          {isPlayed && <span className="mbadge mbadge-ft">FT</span>}
          <span className="match-date-text">{formatMatchDate(match.date)}</span>
        </div>
      )}

      {/* Score row (played) or pick buttons (upcoming / live) */}
      {isPlayed && score ? (
        <div className="match-score-row">
          <span className="score-team">{homeCompetitor?.abbr ?? homeLabel ?? 'TBD'}</span>
          <span className="score-value">{score.home} – {score.away}</span>
          <span className="score-team">{awayCompetitor?.abbr ?? awayLabel ?? 'TBD'}</span>
        </div>
      ) : (
        <div className="match-card-inner">
          <CompetitorBtn
            competitor={homeCompetitor}
            label={homeLabel}
            picked={pickedHome}
            onClick={() => handlePick(homeCompetitor?.id)}
            disabled={!canPick}
            side="home"
          />
          <div className="match-divider">
            <span className="vs-label">VS</span>
            {allowDraw && (
              <button
                className={`draw-btn${pickedDraw ? ' picked' : ''}`}
                onClick={handleDraw}
                disabled={!canPick}
                title="Predict a draw"
              >
                Draw
              </button>
            )}
          </div>
          <CompetitorBtn
            competitor={awayCompetitor}
            label={awayLabel}
            picked={pickedAway}
            onClick={() => handlePick(awayCompetitor?.id)}
            disabled={!canPick}
            side="away"
          />
        </div>
      )}

      {/* AI insight — only for live / upcoming matches */}
      {!isPlayed && insight && (
        <div className="match-insight">
          <div className="insight-header">
            <span className="insight-ai-tag">⚡ AI</span>
            <span className="insight-pick">
              {expertTeam ? expertTeam.name : expertPick === 'draw' ? 'Draw' : ''}
            </span>
          </div>
          <p className="insight-text">{insight}</p>
        </div>
      )}

      {!isPlayed && (
        <PredictionBar
          homeCompetitor={homeCompetitor}
          awayCompetitor={awayCompetitor}
          allowsDraw={allowDraw}
          homePercent={homePercent}
          drawPercent={drawPercent}
          awayPercent={awayPercent}
        />
      )}
    </div>
  );
}

function CompetitorBtn({ competitor, label, picked, onClick, disabled, side }) {
  const cls = ['competitor-btn', side === 'away' ? 'away-btn' : '', picked ? 'picked' : '']
    .filter(Boolean).join(' ');
  return (
    <button className={cls} onClick={onClick} disabled={disabled}>
      {competitor ? (
        <>
          <Avatar competitor={competitor} />
          <span className="comp-name">{competitor.name}</span>
        </>
      ) : (
        <span className="comp-tbd">{label || 'TBD'}</span>
      )}
    </button>
  );
}

function Avatar({ competitor }) {
  return (
    <div
      className="comp-avatar"
      style={{ background: competitor.bg, color: competitor.fg }}
      title={competitor.name}
    >
      {competitor.abbr}
    </div>
  );
}
