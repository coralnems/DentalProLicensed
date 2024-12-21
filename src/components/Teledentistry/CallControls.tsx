import React from 'react';
import { Camera, Mic, MicOff, Video, VideoOff, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScreenShare from './ScreenShare';

interface CallControlsProps {
  isMuted: boolean;
  isVideoOff: boolean;
  onToggleMute: () => void;
  onToggleVideo: () => void;
  onScreenShare: (stream: MediaStream) => void;
  onStopScreenShare: () => void;
  onEndCall: () => void;
}

export default function CallControls({
  isMuted,
  isVideoOff,
  onToggleMute,
  onToggleVideo,
  onScreenShare,
  onStopScreenShare,
  onEndCall
}: CallControlsProps) {
  return (
    <div className="p-4 bg-white border-t flex justify-center space-x-4">
      <Button
        variant={isMuted ? "destructive" : "default"}
        size="icon"
        onClick={onToggleMute}
      >
        {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
      </Button>
      
      <Button
        variant={isVideoOff ? "destructive" : "default"}
        size="icon"
        onClick={onToggleVideo}
      >
        {isVideoOff ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
      </Button>

      <ScreenShare
        onScreenShare={onScreenShare}
        onStopSharing={onStopScreenShare}
      />

      <Button
        variant="destructive"
        onClick={onEndCall}
      >
        <Phone className="h-4 w-4 mr-2" />
        End Call
      </Button>
    </div>
  );
}
