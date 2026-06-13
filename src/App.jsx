import { useState } from 'react';
import { sports, tournaments, competitors } from './data/mockData.js';
import { getTournamentStatus, getDaysUntil } from './engine/format.js';
import TournamentView from './components/TournamentView.jsx';

const FORMAT_LABELS = {
  groups:  'Group Stage + Knockout',
  bracket: 'Knockout Bracket',
  league:  'Round-Robin League',
};

// Deduplicate sports display: football + football_league both show as "Football"
const SPORT_DISPLAY = [
  { id: 'football',          name: 'Football',          icon: '⚽', matchIds: ['football', 'football_league'] },
  { id: 'basketball',        name: 'Basketball',        icon: '🏀', matchIds: ['basketball'] },
  { id: 'tennis',            name: 'Tennis',            icon: '🎾', matchIds: ['tennis'] },
  { id: 'american_football', name: 'American Football', icon: '🏈', matchIds: ['american_football'] },
];

export default function App() {
  const [selectedDisplaySport,  setSelectedDisplaySport]  = useState(null);
  const [selectedTournamentId,  setSelectedTournamentId]  = useState(null);
  const [predictions,           setPredictions]           = useState({});

  const displaySport = SPORT_DISPLAY.find(s => s.id === selectedDisplaySport) ?? null;

  // Filter tournaments by display sport (may span multiple sportIds)
  const sportTournaments = displaySport
    ? tournaments
        .filter(t => displaySport.matchIds.includes(t.sportId))
        .map(t => ({ ...t, status: getTournamentStatus(t) }))
        .sort((a, b) => {
          const order = { live: 0, upcoming: 1, ended: 2 };
          if (order[a.status] !== order[b.status]) return order[a.status] - order[b.status];
          return new Date(a.startDate) - new Date(b.startDate);
        })
    : [];

  const tournament = tournaments.find(t => t.id === selectedTournamentId) ?? null;
  const sport      = tournament ? sports.find(s => s.id === tournament.sportId) ?? null : null;

  function handlePick(matchId, competitorId) {
    setPredictions(prev => {
      if (competitorId === null) {
        const next = { ...prev };
        delete next[matchId];
        return next;
      }
      return { ...prev, [matchId]: competitorId };
    });
  }

  function selectDisplaySport(id) {
    setSelectedDisplaySport(id);
    setSelectedTournamentId(null);
    setPredictions({});
  }

  function selectTournament(id) {
    setSelectedTournamentId(id);
    setPredictions({});
  }

  function handleReset() { setPredictions({}); }

  const crumbs = [];
  if (displaySport) crumbs.push({ label: displaySport.name, onClick: () => selectDisplaySport(displaySport.id) });
  if (tournament)   crumbs.push({ label: tournament.name });

  return (
    <>
      <header className="header">
        <div className="header-logo">Final <span>Whistle</span></div>
        {crumbs.length > 0 && (
          <>
            <span className="header-sep">·</span>
            <nav className="header-crumb">
              <button className="crumb-btn" onClick={() => { setSelectedDisplaySport(null); setSelectedTournamentId(null); }}>
                All Sports
              </button>
              {crumbs.map((c, i) => (
                <span key={i} style={{ display:'flex', alignItems:'center', gap:6 }}>
                  <span className="crumb-sep">›</span>
                  {c.onClick
                    ? <button className="crumb-btn" onClick={c.onClick}>{c.label}</button>
                    : <span style={{ color:'var(--text2)' }}>{c.label}</span>
                  }
                </span>
              ))}
            </nav>
          </>
        )}
      </header>

      <main className="main">

        {/* Sport selection */}
        {!selectedDisplaySport && (
          <>
            <h1 className="page-title">Pick a sport</h1>
            <p className="page-sub">Select a sport to see available tournaments and start predicting.</p>
            <div className="sport-grid">
              {SPORT_DISPLAY.map(s => {
                const sportTours = tournaments.filter(t => s.matchIds.includes(t.sportId));
                const liveCount  = sportTours.filter(t => getTournamentStatus(t) === 'live').length;
                return (
                  <button key={s.id} className="sport-card" onClick={() => selectDisplaySport(s.id)}>
                    <span className="sport-icon">{s.icon}</span>
                    <span className="sport-name">{s.name}</span>
                    <span className="sport-format">
                      {sportTours.length} tournament{sportTours.length !== 1 ? 's' : ''}
                      {liveCount > 0 && <span className="badge-live" style={{ marginLeft:8 }}>LIVE</span>}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Tournament selection */}
        {selectedDisplaySport && !selectedTournamentId && (
          <>
            <h1 className="page-title">{displaySport.icon} {displaySport.name} Tournaments</h1>
            <p className="page-sub">Live tournaments are open. Upcoming ones unlock on their start date.</p>
            <div className="tournament-list">
              {sportTournaments.map(t => {
                const locked   = t.status !== 'live';
                const days     = t.status === 'upcoming' ? getDaysUntil(t.startDate) : null;
                return (
                  <button
                    key={t.id}
                    className={`tournament-card${locked ? ' locked' : ''}`}
                    onClick={() => !locked && selectTournament(t.id)}
                    disabled={locked}
                  >
                    <span className="tournament-sport-icon">{displaySport.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div className="tournament-name">{t.name}</div>
                      <div className="tournament-meta">
                        {FORMAT_LABELS[t.formatType] ?? t.formatType}
                        {t.status === 'upcoming' && days !== null && (
                          <span style={{ marginLeft:8, color:'var(--yellow)' }}>
                            · Opens in {days} day{days !== 1 ? 's' : ''}
                          </span>
                        )}
                        {t.status === 'ended' && (
                          <span style={{ marginLeft:8, color:'var(--text3)' }}>· Ended</span>
                        )}
                      </div>
                    </div>
                    <StatusBadge status={t.status} />
                    {!locked && <span className="tournament-arrow">›</span>}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Tournament detail */}
        {selectedTournamentId && tournament && sport && (
          <>
            <div className="flex-row" style={{ marginBottom: 20 }}>
              <div>
                <h1 className="page-title" style={{ marginBottom: 0 }}>{tournament.name}</h1>
                <div className="page-sub" style={{ marginBottom: 0 }}>
                  {displaySport?.icon} {displaySport?.name} · {FORMAT_LABELS[tournament.formatType] ?? tournament.formatType}
                </div>
              </div>
            </div>
            <TournamentView
              tournament={tournament}
              sport={sport}
              competitors={competitors}
              predictions={predictions}
              onPick={handlePick}
              onReset={handleReset}
            />
          </>
        )}
      </main>
    </>
  );
}

function StatusBadge({ status }) {
  if (status === 'live')     return <span className="tournament-badge badge-live">LIVE</span>;
  if (status === 'upcoming') return <span className="tournament-badge badge-upcoming">SOON</span>;
  if (status === 'ended')    return <span className="tournament-badge badge-ended">ENDED</span>;
  return null;
}
