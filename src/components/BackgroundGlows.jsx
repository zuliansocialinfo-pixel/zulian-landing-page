import React from 'react';

const BackgroundGlows = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Glow Blob 1 */}
      <div 
        className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-glow-slow"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.3) 0%, rgba(0,0,0,0) 70%)',
          willChange: 'transform',
        }}
      />
      {/* Glow Blob 2 */}
      <div 
        className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full mix-blend-screen filter blur-[120px] opacity-15 animate-glow-slower"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.2) 0%, rgba(0,0,0,0) 70%)',
          willChange: 'transform',
        }}
      />
    </div>
  );
};

export default BackgroundGlows;
