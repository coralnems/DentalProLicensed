import React from 'react';
import QRCode from 'qrcode.react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Share2 } from 'lucide-react';

interface QRGeneratorProps {
  formUrl: string;
  patientId?: string;
}

export default function QRGenerator({ formUrl, patientId }: QRGeneratorProps) {
  const qrValue = `${formUrl}${patientId ? `?id=${patientId}` : ''}`;

  const downloadQR = () => {
    const canvas = document.getElementById('qr-code') as HTMLCanvasElement;
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = 'patient-registration-qr.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const shareQR = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Patient Registration Form',
          text: 'Scan this QR code to fill out your registration form',
          url: formUrl,
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <Card className="max-w-sm">
      <CardHeader>
        <h3 className="text-lg font-semibold">Patient Registration QR Code</h3>
        <p className="text-sm text-muted-foreground">
          Scan with your phone's camera to access the registration form
        </p>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="bg-white p-4 rounded-lg">
          <QRCode
            id="qr-code"
            value={qrValue}
            size={200}
            level="H"
            includeMargin
            renderAs="canvas"
          />
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={downloadQR}>
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" size="sm" onClick={shareQR}>
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
