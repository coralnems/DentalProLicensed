import React from 'react';
import { Brain } from 'lucide-react';

interface RecommendationsListProps {
  recommendations: string[];
}

export default function RecommendationsList({ recommendations }: RecommendationsListProps) {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-900 mb-2">
        Recommendations
      </h3>
      <ul className="space-y-2">
        {recommendations.map((rec, index) => (
          <li key={index} className="flex items-start">
            <Brain className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
            <span className="text-sm text-gray-600">{rec}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
