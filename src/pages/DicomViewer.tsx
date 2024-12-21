import React, { useState } from 'react';
import { FileX2, Upload, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

export default function DicomViewer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [zoom, setZoom] = useState(1);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.name.toLowerCase().endsWith('.dcm')) {
        setSelectedFile(file);
        setError('');
      } else {
        setError('Please select a valid DICOM file (.dcm)');
      }
    }
  };

  const handleZoom = (factor: number) => {
    setZoom(prev => Math.max(0.5, Math.min(3, prev + factor)));
  };

  const resetZoom = () => setZoom(1);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">DICOM Viewer</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and analyze DICOM images
          </p>
        </div>
        <div className="flex space-x-2">
          <input
            type="file"
            accept=".dcm"
            onChange={handleFileChange}
            className="hidden"
            id="dicom-upload"
          />
          <label
            htmlFor="dicom-upload"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer flex items-center"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload DICOM
          </label>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-black rounded-lg overflow-hidden relative">
          {selectedFile ? (
            <div className="w-full h-[600px] flex items-center justify-center">
              <div 
                style={{ transform: `scale(${zoom})` }}
                className="transition-transform duration-200"
              >
                {/* DICOM image would be rendered here */}
                <div className="bg-gray-800 w-[512px] h-[512px] flex items-center justify-center text-gray-400">
                  DICOM Preview
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-[600px] flex flex-col items-center justify-center text-gray-400">
              <FileX2 className="h-16 w-16 mb-4" />
              <p>No DICOM file selected</p>
              <p className="text-sm">Upload a file to view</p>
            </div>
          )}

          {selectedFile && (
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button
                onClick={() => handleZoom(0.1)}
                className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
              >
                <ZoomIn className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleZoom(-0.1)}
                className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
              >
                <ZoomOut className="h-5 w-5" />
              </button>
              <button
                onClick={resetZoom}
                className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
              >
                <RotateCcw className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Image Information
            </h3>
            {selectedFile ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    File Name
                  </label>
                  <p className="mt-1 text-sm text-gray-900">{selectedFile.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Size
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                No file selected
              </p>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Controls
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>• Upload a DICOM file to view</p>
              <p>• Use zoom controls to adjust view</p>
              <p>• Click reset to restore default view</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}