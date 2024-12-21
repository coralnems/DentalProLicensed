import React from 'react';
import { FileText } from 'lucide-react';

interface FindingsListProps {
  findings: string[];
}

export default function FindingsList({ findings }: FindingsListProps) {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-900 mb-2">
        Findings
      </h3>
      <ul className="space-y-2">
        {findings.map((finding, index) => (
          <li key={index} className="flex items-start">
            <FileText className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
            <span className="text-sm text-gray-600">{finding}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
