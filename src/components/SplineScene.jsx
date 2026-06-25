import { Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

export function SplineScene({ scene, className }) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div style={{
            width: '40px',
            height: '40px',
            border: '2px solid var(--accent-color)',
            borderRadius: '50%',
            borderTop: '2px solid transparent',
            animation: 'spin 0.8s linear infinite'
          }} />
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}

export default SplineScene;
