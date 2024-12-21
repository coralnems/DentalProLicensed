import React, { useState } from 'react';
import { Monitor, StopCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ScreenShareProps {
  onScreenShare: (stream: MediaStream) => void;
  onStopSharing: () => void;
}

export default function ScreenShare({ onScreenShare, onStopSharing }: ScreenShareProps) {
  const [isSharing, setIsSharing] = useState(false);

  const startScreenShare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true
      });
      
      onScreenShare(stream);
      setIsSharing(true);

      stream.getVideoTracks()[0].onended = () => {
        stopScreenShare();
      };
    } catch (err) {
      console.error('Error sharing screen:', err);
    }
  };

  const stopScreenShare = () => {
    onStopSharing();
    setIsSharing(false);
  };

  return (
    <Button
      variant={isSharing ? "destructive" : "default"}
      size="icon"
      onClick={isSharing ? stopScreenShare : startScreenShare}
    >
      {isSharing ? <StopCircle className="h-4 w-4" /> : <Monitor className="h-4 w-4" />}
    </Button>
  );
}