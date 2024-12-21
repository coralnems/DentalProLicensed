import React from 'react';
import { AlertCircle, Wifi, WifiOff } from 'lucide-react';
import { Alert } from '@/components/ui/alert';

interface ConnectionStatusProps {
  isConnected: boolean;
  isReconnecting: boolean;
  error: Error | null;
}

export default function ConnectionStatus({ 
  isConnected, 
  isReconnecting, 
  error 
}: ConnectionStatusProps) {
  if (!isConnected && !isReconnecting && !error) return null;

  return (
    <div className="absolute top-4 right-4 z-50">
      {error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <span>Connection error: {error.message}</span>
        </Alert>
      ) : isReconnecting ? (
        <Alert>
          <WifiOff className="h-4 w-4" />
          <span>Reconnecting...</span>
        </Alert>
      ) : isConnected && (
        <Alert>
          <Wifi className="h-4 w-4" />
          <span>Connected</span>
        </Alert>
      )}
    </div>
  );
}
