import React from 'react';

interface Area {
  x: number;
  y: number;
  severity: number;
}

interface AreasOfConcernProps {
  areas: Area[];
}

export default function AreasOfConcern({ areas }: AreasOfConcernProps) {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-900 mb-2">
        Areas of Concern
      </h3>
      <div className="relative w-full h-64 bg-gray-100 rounded-lg">
        {areas.map((area, index) => (
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
  );
}
