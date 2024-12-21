import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  type: AlertType;
  message: string;
  onClose?: () => void;
}

const alertStyles: Record<AlertType, { bg: string; icon: any; text: string }> = {
  success: {
    bg: 'bg-green-50',
    icon: CheckCircle,
    text: 'text-green-800',
  },
  error: {
    bg: 'bg-red-50',
    icon: XCircle,
    text: 'text-red-800',
  },
  warning: {
    bg: 'bg-yellow-50',
    icon: AlertCircle,
    text: 'text-yellow-800',
  },
  info: {
    bg: 'bg-blue-50',
    icon: Info,
    text: 'text-blue-800',
  },
};

export default function Alert({ type, message, onClose }: AlertProps) {
  const { bg, icon: Icon, text } = alertStyles[type];

  return (
    <div className={`${bg} p-4 rounded-md flex items-start`}>
      <Icon className={`${text} h-5 w-5 mt-0.5`} />
      <div className={`${text} ml-3 flex-1`}>{message}</div>
      {onClose && (
        <button
          onClick={onClose}
          className={`${text} hover:opacity-75`}
        >
          <XCircle className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}