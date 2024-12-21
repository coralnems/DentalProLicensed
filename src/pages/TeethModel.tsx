import { CircleDot } from 'lucide-react';
import TeethViewer from '../components/3D/TeethViewer';

export default function TeethModel() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">3D Teeth Model</h1>
          <p className="mt-1 text-sm text-gray-500">
            Interactive 3D visualization of dental anatomy
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <CircleDot className="h-6 w-6 text-blue-600" />
          <span className="text-sm font-medium text-gray-700">
            Click teeth to inspect details
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TeethViewer />
        </div>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Selected Tooth Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tooth Number
                </label>
                <p className="mt-1 text-sm text-gray-900">Not selected</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Condition
                </label>
                <p className="mt-1 text-sm text-gray-900">Healthy</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Treatment History
                </label>
                <p className="mt-1 text-sm text-gray-900">No previous treatments</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Legend
            </h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-white border border-gray-300 rounded-full mr-2" />
                <span className="text-sm text-gray-700">Healthy</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-200 rounded-full mr-2" />
                <span className="text-sm text-gray-700">Needs Attention</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-200 rounded-full mr-2" />
                <span className="text-sm text-gray-700">Treatment Planned</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-200 rounded-full mr-2" />
                <span className="text-sm text-gray-700">Treated</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Controls
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>• Left click + drag to rotate</p>
              <p>• Right click + drag to pan</p>
              <p>• Scroll to zoom</p>
              <p>• Click on a tooth to select</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}