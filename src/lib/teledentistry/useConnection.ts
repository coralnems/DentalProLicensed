import { useState, useCallback } from 'react';

interface ConnectionState {
  isConnected: boolean;
  isReconnecting: boolean;
  error: Error | null;
}

export function useConnection() {
  const [state, setState] = useState<ConnectionState>({
    isConnected: false,
    isReconnecting: false,
    error: null
  });

  const handleConnectionError = useCallback((error: Error) => {
    setState(prev => ({
      ...prev,
      error,
      isConnected: false,
      isReconnecting: true
    }));

    // Attempt to reconnect after 3 seconds
    setTimeout(attemptReconnect, 3000);
  }, []);

  const attemptReconnect = useCallback(() => {
    setState(prev => ({ ...prev, isReconnecting: true }));
    // Implement reconnection logic here
  }, []);

  const resetConnection = useCallback(() => {
    setState({
      isConnected: false,
      isReconnecting: false,
      error: null
    });
  }, []);

  return {
    ...state,
    handleConnectionError,
    resetConnection
  };
}