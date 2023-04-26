import { useState, useContext, useEffect } from 'react';
import { WebSocketContext } from '../../context/WebSocketContext';
import { UserContext } from '../../context/UserContext';
import './ChatPopup.css'

const ChatPopup = () => {
  const { socket, connected, messages, setMessages } = useContext(WebSocketContext);
  const [message, setMessage] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const { name, userMail, isAuthenticated } = useContext(UserContext);

  useEffect(() => {
    if(!isAuthenticated){
      return null
    }

    const receiveMsg = (msg) =>{
      console.log(msg);
      setMessages([...messages,msg])
    }
    socket.on('mensajes', receiveMsg);

    return ()=>{
      socket.off('mensajes', receiveMsg);
    }
  },[message]);

  const handleOpenChat = () => {
    console.log(messages);
    setChatOpen(true);
  };

  const handleCloseChat = () => {
    setChatOpen(false);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    const trimmedMessage = message.trim();
    if (socket && connected && trimmedMessage ) {
        const dt = Date.now();
        const timestamp = new Date(dt).toUTCString().slice(5);
        const msg = {
          userEmail: userMail,
          name,
          timestamp,
          text: message
        }
        socket.emit('newMensaje', msg);
        setMessage('');
    }
  };
  
  
  return (
    
    <div className="chat-popup">
      {chatOpen ? (
        <form className="chat-container" onSubmit={handleSendMessage}>
          <div className="chat-header">
            <span>Chat</span>
            <button className="close-btn" onClick={handleCloseChat}>
              X
            </button>
          </div>
          <div className="chat-messages">
            {/* Here you can render the list of messages */}
            {messages.map((msg) => 
                <div key={msg._id}>
                  <p className='chat-item'>{msg.timestamp} {msg.name}: {msg.text}</p>
                </div>
            )}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message here"
              value={message}
              onChange={handleMessageChange}
            />
            <button type='submit'>Send</button>
          </div>
        </form>
      ) : (
        <button className="open-btn" onClick={handleOpenChat} >
          <img src='../images/chat.png' />
        </button>
      )}
    </div>
  );
};

export default ChatPopup;
