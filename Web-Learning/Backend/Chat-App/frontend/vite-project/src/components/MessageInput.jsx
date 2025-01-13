import { useState } from 'react';
import PropTypes from 'prop-types';

const MessageInput = ({ onSend }) => {
    const [content, setContent] = useState('');

    const handleSend = () => {
        if (content.trim() !== '') {
            onSend(content);
            setContent('');
        }
    };

    return (
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <input
                type="text"
                placeholder="Type your message..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{ flex: 1, padding: '10px', fontSize: '16px' }}
            />
            <button onClick={handleSend} style={{ padding: '10px 20px' }}>
                Send
            </button>
        </div>
    );
};

// Define prop types for the component
MessageInput.propTypes = {
    onSend: PropTypes.func.isRequired,
};

export default MessageInput;