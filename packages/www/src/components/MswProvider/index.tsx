import { axiosLocal } from '@utils/axiosLocal';
import { MswContext } from '@contexts/MswContext';
import { useEffect, useRef, useState } from 'react';
import { worker } from '@mocks/browser';
import { WORKER_URL } from '@constants/urls';

export interface HeartBeatProps {
  children?: React.ReactNode;
}

export const MswProvider: React.FC<HeartBeatProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const ref = useRef<{ intervalId: NodeJS.Timeout | undefined }>({
    intervalId: undefined,
  });

  const startWorker = async () => {
    await worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: WORKER_URL,
      },
    });
    setLoading(false);
  };

  const pingMsw = async () => {
    try {
      const { data } = await axiosLocal.get<{ now: string }>('/msw');
      if (typeof data === 'string' && !hasError) setHasError(true);
    } catch (_) {
      setHasError(true);
    }
  };

  useEffect(() => {
    startWorker();
  }, []);

  useEffect(() => {
    if (loading === true) return;
    ref.current.intervalId = setInterval(() => {
      pingMsw();
    }, 5000);
    return () => {
      clearInterval(ref.current.intervalId);
    };
  }, [loading]);

  useEffect(() => {
    hasError && window.location.reload();
  }, [hasError]);

  return (
    <MswContext.Provider value={{ loading, hasError }}>
      {loading ? <></> : <>{children}</>}
    </MswContext.Provider>
  );
};
