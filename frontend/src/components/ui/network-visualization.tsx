import { useEffect, useState } from 'react';

export const NetworkVisualization = () => {
  const [position, setPosition] = useState({ x: 20, y: 50 });
  
  // Update the position of the time-based node
  useEffect(() => {
    const updatePosition = () => {
      setPosition({
        x: 20 + Math.sin(Date.now() / 1000) * 15,
        y: 50 + Math.cos(Date.now() / 1000) * 15
      });
    };
    
    const intervalId = setInterval(updatePosition, 100);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden">
      {/* Animated orbital paths */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 rounded-full border border-[#4CC9F0]/10 animate-[spin_20s_linear_infinite]"></div>
        <div className="absolute inset-[10%] rounded-full border border-[#F72585]/10 animate-[spin_15s_linear_infinite_reverse]"></div>
        <div className="absolute inset-[25%] rounded-full border border-[#7209B7]/10 animate-[spin_25s_linear_infinite]"></div>
        <div className="absolute inset-[40%] rounded-full border border-[#4361EE]/10 animate-[spin_10s_linear_infinite_reverse]"></div>
      </div>
      
      {/* Central node */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-3 h-3 bg-[#4CC9F0] rounded-full animate-pulse shadow-[0_0_8px_#4CC9F0]"></div>
        <div className="absolute inset-0 rounded-full bg-[#4CC9F0]/30 animate-ping"></div>
      </div>
      
      {/* Animated network nodes with improved effects */}
      <div className="absolute inset-0">
        {/* Node 1 with orbit animation */}
        <div className="absolute top-[20%] left-[30%] animate-[orbit_15s_linear_infinite]">
          <div className="w-1.5 h-1.5 bg-[#F72585] rounded-full shadow-[0_0_5px_#F72585]"></div>
          <div className="absolute inset-0 rounded-full bg-[#F72585]/30 animate-ping opacity-70"></div>
        </div>
        
        {/* Node 2 with reverse orbit */}
        <div className="absolute top-[70%] left-[65%] animate-[orbit_20s_linear_infinite_reverse]">
          <div className="w-2 h-2 bg-[#7209B7] rounded-full shadow-[0_0_6px_#7209B7]"></div>
          <div className="absolute inset-0 rounded-full bg-[#7209B7]/30 animate-ping opacity-70"></div>
        </div>
        
        {/* Node 3 with faster animation */}
        <div className="absolute top-[25%] left-[75%] animate-[orbit_10s_linear_infinite]">
          <div className="w-1 h-1 bg-[#4361EE] rounded-full shadow-[0_0_4px_#4361EE]"></div>
          <div className="absolute inset-0 rounded-full bg-[#4361EE]/30 animate-ping opacity-70"></div>
        </div>
        
        {/* Node 4 */}
        <div className="absolute top-[85%] left-[25%] animate-[orbit_12s_linear_infinite_reverse]">
          <div className="w-1.5 h-1.5 bg-[#4CC9F0] rounded-full shadow-[0_0_5px_#4CC9F0]"></div>
          <div className="absolute inset-0 rounded-full bg-[#4CC9F0]/30 animate-ping opacity-70"></div>
        </div>
        
        {/* Node 5 */}
        <div className="absolute top-[40%] left-[15%] animate-[orbit_18s_linear_infinite]">
          <div className="w-1 h-1 bg-[#F72585] rounded-full shadow-[0_0_4px_#F72585]"></div>
        </div>
        
        {/* Node 6 */}
        <div className="absolute top-[60%] left-[85%] animate-[orbit_14s_linear_infinite]">
          <div className="w-1 h-1 bg-[#4CC9F0] rounded-full shadow-[0_0_4px_#4CC9F0]"></div>
        </div>
        
        {/* Animated laser-like connection lines */}
        <div className="absolute top-[20%] left-[30%] w-[40px] h-[1px] bg-gradient-to-r from-[#F72585] to-transparent origin-left rotate-[30deg] animate-pulse"></div>
        <div className="absolute top-[70%] left-[65%] w-[50px] h-[1px] bg-gradient-to-r from-[#7209B7] to-transparent origin-left rotate-[-60deg] animate-pulse"></div>
        <div className="absolute top-[25%] left-[75%] w-[60px] h-[1px] bg-gradient-to-r from-[#4361EE] to-transparent origin-left rotate-[140deg] animate-pulse"></div>
        <div className="absolute top-[85%] left-[25%] w-[70px] h-[1px] bg-gradient-to-r from-[#4CC9F0] to-transparent origin-left rotate-[-20deg] animate-pulse"></div>
        
        {/* Dynamic data transmission effects */}
        <div className="absolute top-[20%] left-[30%] w-2 h-1 bg-white/80 rounded-full animate-[dataTransfer_3s_ease-in_infinite] opacity-70"></div>
        <div className="absolute top-[70%] left-[65%] w-2 h-1 bg-white/80 rounded-full animate-[dataTransfer_5s_ease-out_infinite] opacity-70 delay-700"></div>
        <div className="absolute top-[40%] left-[15%] w-2 h-1 bg-white/80 rounded-full animate-[dataTransfer_4s_ease-in-out_infinite] opacity-70 delay-1500"></div>
      </div>
      
      {/* Reactive glow based on time */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#F72585]/5 via-transparent to-[#4CC9F0]/5"></div>
      
      {/* Network status indicator */}
      <div className="absolute bottom-2 right-2 flex items-center gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-[#4CC9F0] animate-pulse"></div>
        <span className="text-[8px] text-[#4CC9F0] font-mono">NETWORK ACTIVE</span>
      </div>
      
      {/* Add time-based node that moves along path */}
      <div 
        className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_8px_white]"
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          transition: 'left 0.5s, top 0.5s'
        }}
      ></div>
    </div>
  );
};

export default NetworkVisualization;