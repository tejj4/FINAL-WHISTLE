import PredictionBar from './PredictionBar.jsx';

export default function MatchCard({
  match,
  homeCompetitor,
  awayCompetitor,
  homeLabel,
  awayLabel,
  prediction,
  onPick,
  allowDraw,
}) {
  const pickedHome = prediction && homeCompetitor && prediction === homeCompetitor.id;
  const pickedAway = prediction && awayCompetitor && prediction === awayCompetitor.id;
  const pickedDraw = prediction === 'draw';
  const canPick    = homeCompetitor && awayCompetitor;

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
    pickedHome ? 'picked-home' : '',
    pickedAway ? 'picked-away' : '',
    pickedDraw ? 'picked-draw' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClass}>
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

      {/* Popular predictions — shown when both sides are known */}
      <PredictionBar
        homeCompetitor={homeCompetitor}
        awayCompetitor={awayCompetitor}
        allowsDraw={allowDraw}
      />
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
  // TODO: replace this div with <img src={competitor.logoUrl} alt={competitor.name} />
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
