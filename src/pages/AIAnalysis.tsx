import React, { useState, useCallback } from 'react';
import { Brain } from 'lucide-react';
import { XRayAnalyzer, type AnalysisResult } from '../lib/ai/models/xrayAnalysis';
import ImageUploader from '../components/AI/ImageUploader';
import ImageViewer from '../components/AI/ImageViewer';
import FindingsList from '../components/AI/FindingsList';
import RecommendationsList from '../components/AI/RecommendationsList';
import AreasOfConcern from '../components/AI/AreasOfConcern';
import ConfidenceIndicator from '../components/AI/ConfidenceIndicator';
import Alert from '../components/Alerts/Alert';
import LoadingSpinner from '../components/Loading/LoadingSpinner';

export default function AIAnalysis() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string>('');
  const [zoom, setZoom] = useState(1);

  const handleImageSelect = useCallback((file: File) => {
    if (file.type === 'image/dicom' || file.type === 'application/dicom') {
      setSelectedImage(file);
      setError('');
    } else {
      setError('Please select a valid DICOM image file');
    }
  }, []);

  const analyzeImage = useCallback(async () => {
    if (!selectedImage) return;
    
    setAnalyzing(true);
    setError('');

    try {
      const buffer = await selectedImage.arrayBuffer();
      const analyzer = XRayAnalyzer.getInstance();
      const analysisResults = await analyzer.analyzeImage(buffer);
      setResults(analysisResults);
    } catch (error) {
      setError('Failed to analyze image. Please try again.');
      console.error('Analysis error:', error);
    } finally {
      setAnalyzing(false);
    }
  }, [selectedImage]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">AI Analysis</h1>
          <p className="mt-1 text-sm text-gray-500">
            Upload X-rays for AI-powered analysis and recommendations
          </p>
        </div>
      </div>

      {error && (
        <Alert type="error" message={error} onClose={() => setError('')} />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Upload X-Ray for Analysis
          </h2>
          
          <ImageUploader
            onFileSelect={handleImageSelect}
            selectedImage={selectedImage}
            onRemove={() => setSelectedImage(null)}
          />

          {selectedImage && (
            <ImageViewer
              imageUrl={URL.createObjectURL(selectedImage)}
              zoom={zoom}
              onZoomIn={() => setZoom(z => Math.min(3, z + 0.1))}
              onZoomOut={() => setZoom(z => Math.max(0.5, z - 0.1))}
              onReset={() => setZoom(1)}
            />
          )}

          <button
            onClick={analyzeImage}
            disabled={!selectedImage || analyzing}
            className="w-full mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {analyzing ? 'Analyzing...' : 'Analyze Image'}
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Analysis Results
          </h2>

          {analyzing ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Brain className="h-8 w-8 text-blue-600 animate-pulse mb-4" />
              <p className="text-gray-600">Analyzing image...</p>
            </div>
          ) : results ? (
            <div className="space-y-6">
              <FindingsList findings={results.findings} />
              <AreasOfConcern areas={results.areas_of_concern} />
              <RecommendationsList recommendations={results.recommendations} />
              
              <div className="flex items-center justify-between pt-4 border-t">
                <ConfidenceIndicator confidence={results.confidence} />
                <button
                  onClick={() => window.print()}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Export Report
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <Brain className="h-12 w-12 mb-4" />
              <p>Upload an image to see AI analysis results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
