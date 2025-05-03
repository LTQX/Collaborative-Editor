const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 5002 });

let content = '';
const clients = new Map(); // Map to store client connections with their usernames
const usernames = new Set(); // Set to track unique usernames

// Helper function to broadcast messages to all clients except the sender
function broadcast(sender, message) {
	server.clients.forEach((client) => {
		if (client !== sender && client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify(message));
		}
	});
}

// Helper function to broadcast the list of online users to all clients
function broadcastUserList() {
	const userList = Array.from(clients.values());
	const message = JSON.stringify({ type: 'users', data: userList });

	// Send to all clients including the sender
	server.clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(message);
		}
	});
}

server.on('connection', (ws) => {
	console.log('New client connected');

	ws.on('message', (message) => {
		try {
			const data = JSON.parse(message);

			switch (data.type) {
				case 'join':
					// Check if username is already taken
					if (usernames.has(data.username)) {
						ws.send(
							JSON.stringify({
								type: 'error',
								data: 'Username is already taken. Please choose another one.'
							})
						);
						ws.close();
						return;
					}

					// Store the client with their username
					clients.set(ws, data.username);
					usernames.add(data.username);

					// Send current content to the new client
					ws.send(JSON.stringify({ type: 'init', data: content }));

					// Send current user list to the new client
					ws.send(
						JSON.stringify({
							type: 'users',
							data: Array.from(clients.values())
						})
					);

					// Broadcast user joined message
					broadcast(ws, {
						type: 'system',
						data: `${data.username} has joined the editor`
					});

					// Broadcast updated user list to all clients
					broadcastUserList();
					break;

				case 'update':
					content = data.data;
					// Broadcast the update to all clients except the sender
					broadcast(ws, { type: 'update', data: content });
					break;

				case 'leave':
					// Remove the client from the maps
					const username = clients.get(ws);
					if (username) {
						usernames.delete(username);
						clients.delete(ws);

						// Broadcast user left message
						broadcast(ws, {
							type: 'system',
							data: `${username} has left the editor`
						});

						// Broadcast updated user list to remaining clients
						broadcastUserList();
					}
					break;
			}
		} catch (error) {
			console.error('Error processing message:', error);
			ws.send(
				JSON.stringify({
					type: 'error',
					data: 'Error processing your request. Please try again.'
				})
			);
		}
	});

	ws.on('close', () => {
		console.log('Client disconnected');
		// Remove the client from the maps
		const username = clients.get(ws);
		if (username) {
			usernames.delete(username);
			clients.delete(ws);

			// Broadcast user left message
			broadcast(ws, {
				type: 'system',
				data: `${username} has left the editor`
			});

			// Broadcast updated user list to remaining clients
			broadcastUserList();
		}
	});
});

console.log('WebSocket server is running on port 5002');
