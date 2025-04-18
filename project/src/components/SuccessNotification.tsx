import React from 'react';
import { CheckCircle, X } from 'lucide-react';

interface SuccessNotificationProps {
  message: string;
  onClose: () => void;
}

export default function SuccessNotification({ message, onClose }: SuccessNotificationProps) {
  return (
    <div className="fixed top-4 right-4 bg-green-50 text-green-800 rounded-lg shadow-lg p-4 max-w-md animate-slide-in">
      <div className="flex items-start gap-3">
        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-green-500 hover:text-green-700"
          aria-label="Close notification"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}