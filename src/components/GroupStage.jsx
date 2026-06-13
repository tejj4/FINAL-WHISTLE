import { generateGroupFixtures, calculateStandings } from '../engine/format.js';
import MatchCard from './MatchCard.jsx';
import GroupTable from './GroupTable.jsx';

export default function GroupStage({ tournament, sport, competitors, predictions, onPick }) {
  return (
    <div className="groups-grid">
      {tournament.groups.map(group => {
        const fixtures = generateGroupFixtures(group);
        const standings = calculateStandings(
          group.competitorIds,
          fixtures,
          predictions,
          sport.allowsDraw
        );

        return (
          <div key={group.id} className="group-block">
            <div className="group-header">
              <span className="group-header-badge">{group.id}</span>
              {group.name}
            </div>

            {/* Standings table */}
            <GroupTable
              standings={standings}
              competitors={competitors}
              advanceCount={2}
            />

            {/* Fixtures */}
            <div className="fixtures-block">
              <div className="round-label">Fixtures</div>
              <div className="fixtures-list">
                {fixtures.map(match => (
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
        );
      })}
    </div>
  );
}
