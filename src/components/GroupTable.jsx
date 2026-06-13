// Standings table for one group or a full league.
export default function GroupTable({ standings, competitors, advanceCount = 2 }) {
  return (
    <table className="standings-table">
      <thead>
        <tr>
          <th className="pos">#</th>
          <th>Team</th>
          <th>MP</th>
          <th>W</th>
          <th>D</th>
          <th>L</th>
          <th>Pts</th>
        </tr>
      </thead>
      <tbody>
        {standings.map((row, i) => {
          const comp = competitors[row.competitorId];
          if (!comp) return null;
          const advancing = i < advanceCount;
          return (
            <tr key={row.competitorId} className={advancing ? 'advance' : ''}>
              <td className="pos">{i + 1}</td>
              <td>
                <div className="team-cell">
                  {/* TODO: replace div with <img src={comp.logoUrl} /> */}
                  <div
                    className="comp-avatar"
                    style={{ background: comp.bg, color: comp.fg, width: 26, height: 26, fontSize: '.58rem', borderRadius: 4 }}
                  >
                    {comp.abbr}
                  </div>
                  {comp.name}
                </div>
              </td>
              <td>{row.mp}</td>
              <td>{row.w}</td>
              <td>{row.d}</td>
              <td>{row.l}</td>
              <td className="pts-col">{row.pts}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
