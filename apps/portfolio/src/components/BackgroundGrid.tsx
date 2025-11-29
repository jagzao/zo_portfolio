import React from 'react';

const BackgroundGrid = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {/* 1. Base Dark Background - REMOVED (Handled by parent) */}

      {/* 2. The Dot Pattern */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:30px_30px]" 
        style={{ 
          maskImage: 'radial-gradient(circle at center, black 0%, transparent 80%)' 
        }}
      ></div>
      
      {/* 3. Ambient Gold Glow (The "Quetzal" Spirit) */}
      {/* This adds a subtle golden nebula behind the hero section */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-amber-500/10 blur-[120px] rounded-full mix-blend-screen"></div>
    </div>
  );
};

export default BackgroundGrid;
