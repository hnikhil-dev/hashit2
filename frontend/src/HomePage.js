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
  onHome,
  onAbout,
}) {
  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="navbar-brand">
          <h2>HashIt</h2>
        </div>
        <div className="navbar-menu">
          <button className="nav-button" onClick={onHome}>
            Home
          </button>
          <button className="nav-button" onClick={onAbout}>
            About
          </button>
          <button className="nav-button signout" onClick={onSignOut} disabled={loading}>
            {loading ? 'Signing out...' : 'Sign Out'}
          </button>
        </div>
      </nav>
      
      <main className="home-main">
        <div className="welcome-section">
          <h1>Welcome back, {username}!</h1>
          <p className="welcome-subtitle">Ready to connect? Create or join a room to start chatting.</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Create a New Room</h3>
              <p>Start a new conversation space</p>
            </div>
            <form className="room-form" onSubmit={onCreateRoom}>
              <div className="input-group">
                <label>Your Name</label>
                <input
                  type="text"
                  name="createName"
                  placeholder="Enter your display name"
                  value={roomForm.createName}
                  onChange={onRoomChange}
                  required
                />
              </div>
              <button type="submit" className="primary-button">
                Create Room
              </button>
            </form>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h3>Join Existing Room</h3>
              <p>Connect with others in an active room</p>
            </div>
            <form className="room-form" onSubmit={onJoinRoom}>
              <div className="input-group">
                <label>Your Name</label>
                <input
                  type="text"
                  name="joinName"
                  placeholder="Enter your display name"
                  value={roomForm.joinName}
                  onChange={onRoomChange}
                  required
                />
              </div>
              <button type="submit" className="primary-button">
                Join Room
              </button>
            </form>
          </div>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}
      </main>
    </div>
  );
}

export default HomePage;
