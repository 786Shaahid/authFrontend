// useSocket.js
import { useEffect, useMemo } from 'react';
import io from 'socket.io-client';

const useSocket = () => {
  const socket = useMemo(() => io('http://localhost:4000', { transports: ['websocket', 'polling'] }), []);

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return socket;
};

export default useSocket;
