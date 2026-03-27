import React, { useState, useEffect } from 'react';
import supabase from '../lib/supabase';

function LeaderboardScreen({ roomId, onBackToMenu }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [roomInfo, setRoomInfo] = useState(null);

  useEffect(() => {
    loadLeaderboard();
  }, [roomId]);

  const loadLeaderboard = async () => {
    setLoading(true);
    setError('');

    try {
      // Get room info
      const { data: room, error: roomError } = await supabase
        .from('rooms')
        .select('room_code, total_years, current_year, status')
        .eq('room_id', roomId)
        .single();

      if (roomError) throw roomError;
      setRoomInfo(room);

      // Get all players in room ordered by wealth
      const { data: players, error: playersError } = await supabase
        .from('room_players')
        .select('users(name), current_wealth, starting_wealth')
        .eq('room_id', roomId)
        .order('current_wealth', { ascending: false });

      if (playersError) throw playersError;

      setLeaderboard(players || []);
    } catch (err) {
      console.error('Error loading leaderboard:', err);
      setError('Failed to load leaderboard');
    } finally {
      setLoading(false);
    }
  };

  const totalChange = (current, starting) => current - starting;

  return (
    <div className="leaderboard-screen">
      <header className="leaderboard-header">
        <h1>Final Leaderboard</h1>
        <button onClick={onBackToMenu} className="back-button">
          ← Back to Menu
        </button>
      </header>

      {roomInfo && (
        <div className="room-summary">
          <p>
            Room: <strong>{roomInfo.room_code}</strong> | Years:
            <strong>{roomInfo.total_years}</strong> | Status:
            <strong>{roomInfo.status}</strong>
          </p>
        </div>
      )}

      {loading ? (
        <p className="loading">Loading leaderboard...</p>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : leaderboard.length === 0 ? (
        <p className="empty-message">No players in this room yet.</p>
      ) : (
        <div className="leaderboard-container">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th className="rank-col">Rank</th>
                <th className="name-col">Player Name</th>
                <th className="wealth-col">Starting Wealth</th>
                <th className="wealth-col">Final Wealth</th>
                <th className="change-col">Change</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((player, index) => {
                const change = totalChange(player.current_wealth, player.starting_wealth);
                const changePercent = (
                  ((change / player.starting_wealth) * 100).toFixed(1)
                );

                return (
                  <tr key={index} className={index === 0 ? 'winner' : ''}>
                    <td className="rank-col">
                      <span className="rank-badge">{index + 1}</span>
                    </td>
                    <td className="name-col">{player.users.name}</td>
                    <td className="wealth-col">
                      ${player.starting_wealth.toLocaleString()}
                    </td>
                    <td className="wealth-col">
                      ${player.current_wealth.toLocaleString()}
                    </td>
                    <td className={`change-col ${change >= 0 ? 'positive' : 'negative'}`}>
                      {change >= 0 ? '+' : ''}
                      ${change.toLocaleString()} ({changePercent}%)
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default LeaderboardScreen;
