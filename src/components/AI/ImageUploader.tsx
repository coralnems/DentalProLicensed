import React from 'react';
import { Upload, Image } from 'lucide-react';

interface ImageUploaderProps {
  onFileSelect: (file: File) => void;
  selectedImage: File | null;
  onRemove: () => void;
}

export default function ImageUploader({ onFileSelect, selectedImage, onRemove }: ImageUploaderProps) {
  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <input
          type="file"
          accept=".dcm,application/dicom"
          onChange={(e) => e.target.files?.[0] && onFileSelect(e.target.files[0])}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          <Upload className="h-12 w-12 text-gray-400 mb-3" />
          <span className="text-sm text-gray-600">
            Click to upload or drag and drop
          </span>
          <span className="text-xs text-gray-500">
            DICOM files only
          </span>
        </label>
      </div>

      {selectedImage && (
        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
          <div className="flex items-center">
            <Image className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-sm text-gray-600">
              {selectedImage.name}
            </span>
          </div>
          <button
            onClick={onRemove}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}