import PropTypes from 'prop-types';

const MessageList = ({ messages }) => {
    return (
        <div
            style={{
                maxHeight: '300px',
                overflowY: 'auto',
                border: '1px solid #ddd',
                padding: '10px',
                marginBottom: '10px',
            }}
        >
            {messages.length > 0 ? (
                messages.map((msg, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        <strong>{msg.username || 'Anonymous'}: </strong>
                        <span>{msg.content}</span>
                    </div>
                ))
            ) : (
                <p>No messages yet...</p>
            )}
        </div>
    );
};

// Define prop types for the component
MessageList.propTypes = {
    messages: PropTypes.arrayOf(
        PropTypes.shape({
            username: PropTypes.string,
            content: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default MessageList;