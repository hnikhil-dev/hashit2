import React, { useState } from 'react';
import supabase from '../lib/supabase';

function generateRoomCode() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

function CreateRoomForm({ onRoomCreated, onCancel }) {
  const [playerName, setPlayerName] = useState('');
  const [numberOfYears, setNumberOfYears] = useState('5');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [roomCode, setRoomCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setRoomCode('');

    if (!playerName.trim()) {
      setError('Please enter your name');
      return;
    }

    setLoading(true);

    try {
      // Step 1: Insert or get user
      const { data: existingUser, error: selectError } = await supabase
        .from('users')
        .select('user_id')
        .ilike('name', playerName.trim())
        .single();

      let userId;

      if (selectError && selectError.code !== 'PGRST116') {
        throw selectError;
      }

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

      // Step 2: Generate unique room code
      let code = generateRoomCode();
      let isUnique = false;
      let attempts = 0;

      while (!isUnique && attempts < 5) {
        const { data: existingCode } = await supabase
          .from('rooms')
          .select('room_id')
          .eq('room_code', code)
          .single();

        if (!existingCode) {
          isUnique = true;
        } else {
          code = generateRoomCode();
          attempts++;
        }
      }

      if (!isUnique) {
        throw new Error('Failed to generate unique room code. Try again.');
      }

      // Step 3: Insert room
      const { data: newRoom, error: insertRoomError } = await supabase
        .from('rooms')
        .insert([
          {
            room_code: code,
            total_years: parseInt(numberOfYears),
            current_year: 1,
            status: 'waiting',
          },
        ])
        .select('room_id')
        .single();

      if (insertRoomError) throw insertRoomError;

      // Step 4: Insert room player
      const { error: insertPlayerError } = await supabase
        .from('room_players')
        .insert([
          {
            room_id: newRoom.room_id,
            user_id: userId,
            starting_wealth: 50000,
            current_wealth: 50000,
            salary: 300000,
          },
        ]);

      if (insertPlayerError) throw insertPlayerError;

      setRoomCode(code);
      setPlayerName('');
      setNumberOfYears('5');

      // Notify parent with room details
      if (onRoomCreated) {
        onRoomCreated({
          room_code: code,
          room_id: newRoom.room_id,
          user_id: userId,
        });
      }
    } catch (err) {
      console.error('Error creating room:', err);
      setError(err.message || 'Failed to create room. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (roomCode) {
    return (
      <div className="form-container">
        <div className="success-card">
          <h2>Room Created!</h2>
          <p>Share this code with others to join:</p>
          <div className="room-code-display">{roomCode}</div>
          <button
            onClick={() => {
              setRoomCode('');
              if (onRoomCreated) onRoomCreated({ room_code: roomCode });
            }}
            className="primary-button"
          >
            Go to Game
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="game-form">
        <h2>Create a New Room</h2>

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

        <div className="form-group">
          <label>Number of Years</label>
          <select
            value={numberOfYears}
            onChange={(e) => setNumberOfYears(e.target.value)}
            disabled={loading}
          >
            <option value="5">5 Years</option>
            <option value="6">6 Years</option>
            <option value="8">8 Years</option>
          </select>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="primary-button" disabled={loading}>
          {loading ? 'Creating Room...' : 'Create Room'}
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

export default CreateRoomForm;
