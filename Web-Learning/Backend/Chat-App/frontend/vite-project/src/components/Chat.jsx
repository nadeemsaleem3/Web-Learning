import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const socket = io('http://localhost:5000');

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Fetch initial messages
        axios.get('http://localhost:5000/api/chat')
            .then((res) => setMessages(res.data));

        // Listen for new messages
        socket.on('receive_message', (data) => {
            setMessages((prev) => [...prev, data]);
        });

        // Cleanup on unmount
        return () => socket.disconnect();
    }, []);

    const handleSendMessage = (content) => {
        const message = { username: username || 'Anonymous', content };
        socket.emit('send_message', message);
        axios.post('http://localhost:5000/api/chat', message);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
            <h2>Chat Room</h2>
            <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
            />
            <MessageList messages={messages} />
            <MessageInput onSend={handleSendMessage} />
        </div>
    );
};

export default Chat;