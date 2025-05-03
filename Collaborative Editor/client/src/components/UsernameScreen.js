import React, { useState } from 'react';
import './UsernameScreen.css';

const UsernameScreen = ({ onUsernameSubmit }) => {
	const [ username, setUsername ] = useState('');
	const [ error, setError ] = useState('');

	const validateUsername = (username) => {
		if (username.length < 3) {
			return 'Username must be at least 3 characters long';
		}
		if (username.length > 20) {
			return 'Username must be less than 20 characters';
		}
		if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
			return 'Username can only contain letters, numbers, underscores, and hyphens';
		}
		return '';
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const trimmedUsername = username.trim();
		const validationError = validateUsername(trimmedUsername);

		if (validationError) {
			setError(validationError);
			return;
		}

		setError('');
		onUsernameSubmit(trimmedUsername);
	};

	return (
		<div className="username-screen">
			<div className="username-container">
				<h2>Welcome to Collaborative Editor</h2>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						value={username}
						onChange={(e) => {
							setUsername(e.target.value);
							setError('');
						}}
						placeholder="Enter your username"
						required
					/>
					{error && <div className="error-message">{error}</div>}
					<button type="submit">Join Editor</button>
				</form>
			</div>
		</div>
	);
};

export default UsernameScreen;
