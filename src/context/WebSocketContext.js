import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:8080/", { path: '/chat'})
 
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      socket.on('mensajes', (msg)=>{
        setMessages(msg)
      });
      setConnected(true);
    });
    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
      setConnected(false);
    });
    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  },[]);

  return (
    <WebSocketContext.Provider value={{ socket, connected, messages, setMessages }}>
      {children}
    </WebSocketContext.Provider>
  );
};
