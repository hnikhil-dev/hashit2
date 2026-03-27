import React, { useState } from 'react';
import supabase from '../lib/supabase';

function JoinRoomForm({ onRoomJoined, onCancel }) {
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!playerName.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!roomCode.trim()) {
      setError('Please enter a room code');
      return;
    }

    setLoading(true);

    try {
      // Step 1: Find room by code
      const { data: room, error: roomError } = await supabase
        .from('rooms')
        .select('room_id, room_code, total_years, current_year')
        .eq('room_code', roomCode.trim())
        .single();

      if (roomError) {
        throw new Error('Room not found. Check the code and try again.');
      }

      if (!room) {
        throw new Error('Room not found.');
      }

      // Step 2: Find or create user
      const { data: existingUser } = await supabase
        .from('users')
        .select('user_id')
        .ilike('name', playerName.trim())
        .single();

      let userId;

      if (existingUser) {
        userId = existingUser.user_id;
      } else {
        const { data: newUser, error: insertUserError } = await supabase
          .from('users')
          .insert([{ name: playerName.trim() }])
          .select('user_id')
          .single();

        if (insertUserError) throw insertUserError;
        userId = newUser.user_id;
      }

      // Step 3: Check if already in room
      const { data: existingPlayer } = await supabase
        .from('room_players')
        .select('id')
        .eq('room_id', room.room_id)
        .eq('user_id', userId)
        .single();

      if (existingPlayer) {
        throw new Error('You are already in this room.');
      }

      // Step 4: Insert into room_players
      const { error: insertPlayerError } = await supabase
        .from('room_players')
        .insert([
          {
            room_id: room.room_id,
            user_id: userId,
            starting_wealth: 50000,
            current_wealth: 50000,
            salary: 300000,
          },
        ]);

      if (insertPlayerError) throw insertPlayerError;

      // Success - notify parent
      if (onRoomJoined) {
        onRoomJoined({
          room_id: room.room_id,
          room_code: room.room_code,
          user_id: userId,
          total_years: room.total_years,
          current_year: room.current_year,
        });
      }

      setPlayerName('');
      setRoomCode('');
    } catch (err) {
      console.error('Error joining room:', err);
      setError(err.message || 'Failed to join room. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="game-form">
        <h2>Join a Room</h2>

        <div className="form-group">
          <label>Room Code</label>
          <input
            type="text"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
            placeholder="Enter 4-digit code"
            disabled={loading}
            maxLength="4"
          />
        </div>

        <div className="form-group">
          <label>Player Name</label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name"
            disabled={loading}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="primary-button" disabled={loading}>
          {loading ? 'Joining...' : 'Join Room'}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="secondary-button"
            disabled={loading}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default JoinRoomForm;
