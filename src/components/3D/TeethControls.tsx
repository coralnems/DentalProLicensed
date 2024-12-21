import React from 'react';
import { ZoomIn, ZoomOut, RotateCw, RotateCcw, Move } from 'lucide-react';

interface TeethControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onRotateLeft: () => void;
  onRotateRight: () => void;
  onReset: () => void;
}

export default function TeethControls({
  onZoomIn,
  onZoomOut,
  onRotateLeft,
  onRotateRight,
  onReset,
}: TeethControlsProps) {
  return (
    <div className="absolute bottom-4 right-4 flex space-x-2">
      <button
        onClick={onZoomIn}
        className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
        title="Zoom In"
      >
        <ZoomIn className="h-5 w-5" />
      </button>
      <button
        onClick={onZoomOut}
        className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
        title="Zoom Out"
      >
        <ZoomOut className="h-5 w-5" />
      </button>
      <button
        onClick={onRotateLeft}
        className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
        title="Rotate Left"
      >
        <RotateCcw className="h-5 w-5" />
      </button>
      <button
        onClick={onRotateRight}
        className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
        title="Rotate Right"
      >
        <RotateCw className="h-5 w-5" />
      </button>
      <button
        onClick={onReset}
        className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
        title="Reset View"
      >
        <Move className="h-5 w-5" />
      </button>
    </div>
  );
}