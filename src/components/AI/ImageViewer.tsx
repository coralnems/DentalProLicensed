import React from 'react';
import { ZoomIn, ZoomOut, RotateCw } from 'lucide-react';

interface ImageViewerProps {
  imageUrl: string;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export default function ImageViewer({ 
  imageUrl, 
  zoom, 
  onZoomIn, 
  onZoomOut, 
  onReset 
}: ImageViewerProps) {
  return (
    <div className="relative">
      <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={imageUrl}
          alt="X-Ray"
          className="w-full h-full object-contain transition-transform duration-200"
          style={{ transform: `scale(${zoom})` }}
        />
      </div>
      
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
          onClick={onReset}
          className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
          title="Reset"
        >
          <RotateCw className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
