import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ConfidenceIndicatorProps {
  confidence: number;
}

export default function ConfidenceIndicator({ confidence }: ConfidenceIndicatorProps) {
  const getConfidenceColor = (value: number) => {
    if (value >= 0.9) return 'text-green-500';
    if (value >= 0.7) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="flex items-center">
      <AlertCircle className={`h-5 w-5 mr-2 ${getConfidenceColor(confidence)}`} />
      <span className="text-sm text-gray-500">
        AI confidence: {(confidence * 100).toFixed(1)}%
      </span>
    </div>
  );
}
