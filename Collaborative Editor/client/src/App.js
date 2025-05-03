import React, { useState } from 'react';
import CollaborativeEditor from './components/CollaborativeEditor';
import UsernameScreen from './components/UsernameScreen';
import './App.css';

function App() {
	const [username, setUsername] = useState('');

	return (
		<div className="App">
			{!username ? (
				<UsernameScreen onUsernameSubmit={setUsername} />
			) : (
				<>
					<header className="App-header">
						<h1>Collaborative Editor</h1>
						<div className="user-info">
							<span>Welcome, {username}</span>
							<button onClick={() => setUsername('')} className="logout-btn">
								Logout
							</button>
						</div>
					</header>
					<main>
						<CollaborativeEditor username={username} />
					</main>
				</>
			)}
		</div>
	);
}

export default App;
