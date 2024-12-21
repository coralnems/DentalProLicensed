import React from 'react';
import { Brain, FileText, AlertCircle } from 'lucide-react';
import type { AnalysisResult } from '../../lib/ai/models/xrayAnalysis';

interface AnalysisResultsProps {
  results: AnalysisResult;
}

export default function AnalysisResults({ results }: AnalysisResultsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-2">
          Findings
        </h3>
        <ul className="space-y-2">
          {results.findings.map((finding, index) => (
            <li key={index} className="flex items-start">
              <FileText className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
              <span className="text-sm text-gray-600">{finding}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-2">
          Areas of Concern
        </h3>
        <div className="relative w-full h-64 bg-gray-100 rounded-lg">
          {results.areas_of_concern.map((area, index) => (
            <div
              key={index}
              className="absolute w-4 h-4 rounded-full border-2 border-red-500"
              style={{
                left: `${area.x}%`,
                top: `${area.y}%`,
                opacity: area.severity
              }}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-2">
          Recommendations
        </h3>
        <ul className="space-y-2">
          {results.recommendations.map((rec, index) => (
            <li key={index} className="flex items-start">
              <Brain className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
              <span className="text-sm text-gray-600">{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
          <span className="text-sm text-gray-500">
            AI confidence: {(results.confidence * 100).toFixed(1)}%
          </span>
        </div>
        <button
          onClick={() => window.print()}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Export Report
        </button>
      </div>
    </div>
  );
}
