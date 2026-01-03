const AuroraBackground = () => {
  return (
    <>
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Main Aurora Layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/50 via-pink-500/40 to-blue-500/50 animate-aurora-1"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/40 via-purple-500/50 to-pink-500/45 animate-aurora-2"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-purple-600/45 via-violet-500/35 to-blue-600/45 animate-aurora-3"></div>
        
        {/* Additional Accent Layers */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/25 via-transparent to-purple-500/25 animate-aurora-4"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-fuchsia-500/30 via-transparent to-blue-500/30 animate-aurora-5"></div>
        
        {/* Shimmer Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent animate-shimmer"></div>
      </div>
    </>
  );
};

export default AuroraBackground;
