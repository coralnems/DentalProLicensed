import React from 'react';
import QRGenerator from '@/components/QR/QRGenerator';
import { Card, CardContent } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';

export default function QRRegistration() {
  // This would be your deployed form URL
  const formUrl = `${window.location.origin}/patients/register`;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">QR Registration</h1>
          <p className="mt-1 text-sm text-gray-500">
            Generate QR codes for patient registration forms
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <QRGenerator formUrl={formUrl} />
        
        <Card>
          <CardContent className="pt-6">
            <Alert>
              <h4 className="font-medium">How it works:</h4>
              <ol className="mt-2 ml-4 list-decimal">
                <li>Generate a unique QR code for patient registration</li>
                <li>Patient scans the QR code with their phone's camera</li>
                <li>They're directed to the mobile-friendly registration form</li>
                <li>Form data is automatically synced with your system</li>
              </ol>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
