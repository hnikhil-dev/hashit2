import React from 'react';

function HomePage({
  currentUser,
  username,
  roomForm,
  error,
  message,
  loading,
  onRoomChange,
  onCreateRoom,
  onJoinRoom,
  onSignOut,
}) {
  return (
    <main className="home-shell">
      <section className="home-panel">
        <p className="status-badge">Home</p>
        <h1>Welcome, {username}</h1>
        <p className="panel-copy">
          You are signed in as <strong>{currentUser.email}</strong>.
        </p>

        <div className="room-grid">
          <form className="room-card" onSubmit={onCreateRoom}>
            <h3>Create Room</h3>
            <label className="input-group">
              <span>Your name</span>
              <input
                type="text"
                name="createName"
                placeholder="Enter your name"
                value={roomForm.createName}
                onChange={onRoomChange}
              />
            </label>
            <button type="submit" className="primary-button">
              Create Room
            </button>
          </form>

          <form className="room-card" onSubmit={onJoinRoom}>
            <h3>Join Room</h3>
            <label className="input-group">
              <span>Your name</span>
              <input
                type="text"
                name="joinName"
                placeholder="Enter your name"
                value={roomForm.joinName}
                onChange={onRoomChange}
              />
            </label>
            <button type="submit" className="primary-button">
              Join Room
            </button>
          </form>
        </div>

        {error ? <p className="feedback error">{error}</p> : null}
        {message ? <p className="feedback success">{message}</p> : null}

        <button
          type="button"
          className="secondary-button"
          onClick={onSignOut}
          disabled={loading}
        >
          {loading ? 'Signing out...' : 'Sign out'}
        </button>
      </section>
    </main>
  );
}

export default HomePage;
