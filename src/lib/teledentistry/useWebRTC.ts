import { useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';

interface UseWebRTCProps {
  roomId: string;
  isInitiator?: boolean;
}

export function useWebRTC({ roomId, isInitiator = false }: UseWebRTCProps) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const peerRef = useRef<Peer.Instance>();

  useEffect(() => {
    const initializeMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        
        setStream(mediaStream);
        
        const peer = new Peer({
          initiator: isInitiator,
          trickle: false,
          stream: mediaStream
        });
        
        peer.on('signal', data => {
          // Here you would send the signal to your signaling server
          console.log('Signal data:', data);
        });
        
        peer.on('stream', stream => {
          setRemoteStream(stream);
        });
        
        peer.on('error', err => {
          setError(err);
        });
        
        peerRef.current = peer;
        
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to access media devices'));
      }
    };

    initializeMedia();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (peerRef.current) {
        peerRef.current.destroy();
      }
    };
  }, [roomId, isInitiator]);

  const sendSignal = (signal: any) => {
    if (peerRef.current) {
      peerRef.current.signal(signal);
    }
  };

  return {
    localStream: stream,
    remoteStream,
    error,
    sendSignal,
    peer: peerRef.current
  };
}