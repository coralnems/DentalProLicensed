import * as cornerstone from '@cornerstonejs/core';
import * as cornerstoneTools from '@cornerstonejs/tools';
import dicomParser from 'dicom-parser';
import * as cornerstoneDICOMImageLoader from '@cornerstonejs/dicom-image-loader';

export async function initCornerstone() {
  await cornerstone.init();
  
  // Initialize tools
  await cornerstoneTools.init();
  
  // Initialize DICOM image loader
  cornerstoneDICOMImageLoader.external.cornerstone = cornerstone;
  cornerstoneDICOMImageLoader.external.dicomParser = dicomParser;
  await cornerstoneDICOMImageLoader.initializeImageLoader();
  
  // Register all tools
  cornerstoneTools.addTool(cornerstoneTools.ZoomTool);
  cornerstoneTools.addTool(cornerstoneTools.PanTool);
  cornerstoneTools.addTool(cornerstoneTools.LengthTool);
  cornerstoneTools.addTool(cornerstoneTools.AngleTool);
  cornerstoneTools.addTool(cornerstoneTools.WwwcTool);
  
  // Set tool modes
  cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 2 });
  cornerstoneTools.setToolActive('Pan', { mouseButtonMask: 1 });
  cornerstoneTools.setToolActive('Wwwc', { mouseButtonMask: 4 });
}