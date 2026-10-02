'use client';

import React from 'react';
import { AlertCircle, RefreshCw, MessageSquare } from 'lucide-react';
import { Button } from '@/components/common/Button';

interface ErrorStateProps {
  onRetry: () => void;
  onContactSupport: () => void;
  errorMessage?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  onRetry,
  onContactSupport,
  errorMessage = 'We encountered an issue retrieving real-time tracking data from the carrier network.',
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-subtle text-center flex flex-col items-center max-w-lg mx-auto my-6 animate-fade-in">
      <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 border border-rose-100">
        <AlertCircle className="w-7 h-7" />
      </div>

      <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
        Unable to load tracking information
      </h2>

      <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-sm leading-relaxed">
        {errorMessage}
      </p>

      <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <Button
          variant="primary"
          size="md"
          icon={<RefreshCw className="w-4 h-4" />}
          onClick={onRetry}
          fullWidth
        >
          Try again
        </Button>
        <Button
          variant="outline"
          size="md"
          icon={<MessageSquare className="w-4 h-4" />}
          onClick={onContactSupport}
          fullWidth
        >
          Contact Support
        </Button>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 w-full text-center">
        <p className="text-[11px] text-slate-400">
          Error Code: ERR_CARRIER_SYNC_TIMEOUT (504) • Ref #TK-9921
        </p>
      </div>
    </div>
  );
};
