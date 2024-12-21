import React, { useEffect, useRef } from 'react';
import * as cornerstone from '@cornerstonejs/core';
import * as cornerstoneTools from '@cornerstonejs/tools';

interface DicomImageViewerProps {
  imageId: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

export default function DicomImageViewer({ 
  imageId, 
  onLoad, 
  onError 
}: DicomImageViewerProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    
    // Enable the element for cornerstone
    cornerstone.enable(element);

    // Load and display the image
    cornerstone.loadImage(imageId).then(
      image => {
        cornerstone.displayImage(element, image);
        onLoad?.();
      },
      error => {
        console.error('Error loading DICOM image:', error);
        onError?.(error);
      }
    );

    // Enable tools on the element
    cornerstoneTools.addToolForElement(element, cornerstoneTools.ZoomTool);
    cornerstoneTools.addToolForElement(element, cornerstoneTools.PanTool);
    cornerstoneTools.addToolForElement(element, cornerstoneTools.WwwcTool);

    // Cleanup
    return () => {
      cornerstone.disable(element);
    };
  }, [imageId, onLoad, onError]);

  return (
    <div 
      ref={elementRef}
      className="w-full h-full"
      style={{ minHeight: '512px' }}
    />
  );
}