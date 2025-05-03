import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './CollaborativeEditor.css';

const CollaborativeEditor = ({ username }) => {
const [ content, setContent ] = useState('');
const [ socket, setSocket ] = useState(null);
const [ error, setError ] = useState('');
const [ isConnected, setIsConnected ] = useState(false);
const [ systemMessage, setSystemMessage ] = useState('');
const editorRef = useRef(null);


useEffect(
	() => {
		let reconnectTimeout;
		let isComponentMounted = true;

		const connectWebSocket = () => {
			const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
			const wsHost = window.location.hostname;
			const wsPort = 5002;
			const wsUrl = `${wsProtocol}//${wsHost}:${wsPort}?userId=${encodeURIComponent(username)}`;
			const newSocket = new WebSocket(wsUrl);
			setSocket(newSocket);

			newSocket.onopen = () => {
				console.log('WebSocket connection established');
				setError('');
				setIsConnected(true);
				// Send username to server when connection is established
				newSocket.send(JSON.stringify({ type: 'join', username }));
			};

			newSocket.onmessage = (event) => {
				try {
					const message = JSON.parse(event.data);
					console.log('Received message:', message);
					if (!isComponentMounted) return;

					switch (message.type) {
						case 'init':
							setContent(message.data);
							break;
						case 'update':
							setContent(message.data);
							break;
						case 'error':
							setError(message.data);
							// If it's a username error, close the connection after a delay
							if (message.data.includes('Username is already taken')) {
								setTimeout(() => {
									if (newSocket.readyState === WebSocket.OPEN) {
										newSocket.close();
									}
								}, 2000);
							}
							break;
						case 'system':
							setSystemMessage(message.data);
							// Clear system message after 3 seconds
							setTimeout(() => {
								setSystemMessage('');
							}, 3000);
							break;
					}
				} catch (error) {
					console.error('Error parsing message:', error);
					setError('Error processing server message');
				}
			};

			newSocket.onclose = () => {
				console.log('WebSocket connection closed');
				if (isComponentMounted) {
					setError('Connection lost. Reconnecting...');
					setIsConnected(false);
					reconnectTimeout = setTimeout(connectWebSocket, 3000);
				}
			};

			newSocket.onerror = (error) => {
				console.error('WebSocket error:', error);
				if (isComponentMounted) {
					setError('Connection error occurred');
					setIsConnected(false);
				}
			};
		};

		connectWebSocket();

		return () => {
			isComponentMounted = false;
			if (reconnectTimeout) {
				clearTimeout(reconnectTimeout);
			}
			if (socket) {
				socket.send(JSON.stringify({ type: 'leave', username }));
				socket.close();
			}
		};
	},
	[ username ]
);

const handleChange = (newContent) => {
	setContent(newContent);
	if (socket && socket.readyState === WebSocket.OPEN) {
		socket.send(JSON.stringify({ type: 'update', data: newContent }));
	}
};

return (
	<div className="editor-container">
		<div className="editor-main">
			{error && <div className="error-message">{error}</div>}
			{systemMessage && <div className="system-message">{systemMessage}</div>}
			<div className="connection-status">
				<span className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}>
					{isConnected ? 'Connected' : 'Disconnected'}
				</span>
			</div>
			<ReactQuill
				ref={editorRef}
				value={content}
				onChange={handleChange}
				modules={{
					toolbar: [
						[ { header: [ 1, 2, 3, 4, 5, 6, false ] } ],
						[ 'bold', 'italic', 'underline', 'strike' ],
						[ { list: 'ordered' }, { list: 'bullet' } ],
						[ 'link', 'image' ],
						[ 'clean' ]
					]
				}}
			/>
		</div>
	</div>
);
};

export default CollaborativeEditor;