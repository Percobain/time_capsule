import React, { useState, useEffect } from "react";
import { format } from "date-fns";

export default function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 10); // Update frequently for milliseconds display
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex flex-col space-y-2">
      <div className="p-3 rounded-lg bg-[#0A0D1C]/90 border border-[#252A44]/70 shadow-inner shadow-[#000]/30">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-[#4CC9F0] animate-pulse"></div>
              <div className="absolute inset-0 rounded-full bg-[#4CC9F0]/30 animate-ping"></div>
            </div>
            <span className="text-xs font-medium text-[#4CC9F0]">CHRONOSYNC</span>
          </div>
          <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-[#090B19] border border-[#252A44]/50">
            <span className="w-1 h-1 rounded-full bg-[#F72585] animate-pulse"></span>
            <span className="text-[10px] font-mono text-[#F72585]">ACTIVE</span>
          </div>
        </div>
        
        {/* Upgraded futuristic clock display */}
        <div className="relative flex justify-center py-2 bg-gradient-to-r from-[#090B19] via-[#0D0F21] to-[#090B19] rounded-lg border border-[#181B2E] mb-2">
          {/* Glowing background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F72585]/5 via-[#4361EE]/5 to-[#4CC9F0]/5"></div>
          
          {/* Hours */}
          <div className="flex flex-col items-center">
            <span className="text-[8px] font-medium text-[#4CC9F0]/70 uppercase mb-0.5">Hour</span>
            <div className="flex">
              <div className="relative mx-0.5 w-8 h-10 overflow-hidden">
                <div className="absolute inset-0 bg-[#040508] rounded backdrop-blur-sm border border-[#252A44]/80 shadow-inner shadow-black/40"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono text-xl font-bold bg-gradient-to-b from-[#4CC9F0] to-[#4361EE] bg-clip-text text-transparent">{format(currentTime, "HH").charAt(0)}</span>
                </div>
                <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/40 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              <div className="relative mx-0.5 w-8 h-10 overflow-hidden">
                <div className="absolute inset-0 bg-[#040508] rounded backdrop-blur-sm border border-[#252A44]/80 shadow-inner shadow-black/40"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono text-xl font-bold bg-gradient-to-b from-[#4CC9F0] to-[#4361EE] bg-clip-text text-transparent">{format(currentTime, "HH").charAt(1)}</span>
                </div>
                <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/40 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </div>
          </div>
          
          {/* Separator */}
          <div className="flex flex-col justify-center px-1 mx-1">
            <div className="flex flex-col h-10 justify-center">
              <div className="w-1.5 h-1.5 bg-[#F72585] rounded-full mb-2 animate-pulse"></div>
              <div className="w-1.5 h-1.5 bg-[#F72585] rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Minutes */}
          <div className="flex flex-col items-center">
            <span className="text-[8px] font-medium text-[#F72585]/70 uppercase mb-0.5">Min</span>
            <div className="flex">
              <div className="relative mx-0.5 w-8 h-10 overflow-hidden">
                <div className="absolute inset-0 bg-[#040508] rounded backdrop-blur-sm border border-[#252A44]/80 shadow-inner shadow-black/40"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono text-xl font-bold bg-gradient-to-b from-[#F72585] to-[#7209B7] bg-clip-text text-transparent">{format(currentTime, "mm").charAt(0)}</span>
                </div>
                <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/40 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              <div className="relative mx-0.5 w-8 h-10 overflow-hidden">
                <div className="absolute inset-0 bg-[#040508] rounded backdrop-blur-sm border border-[#252A44]/80 shadow-inner shadow-black/40"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono text-xl font-bold bg-gradient-to-b from-[#F72585] to-[#7209B7] bg-clip-text text-transparent">{format(currentTime, "mm").charAt(1)}</span>
                </div>
                <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/40 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </div>
          </div>
          
          {/* Separator */}
          <div className="flex flex-col justify-center px-1 mx-1">
            <div className="flex flex-col h-10 justify-center">
              <div className="w-1.5 h-1.5 bg-[#4361EE] rounded-full mb-2 animate-pulse"></div>
              <div className="w-1.5 h-1.5 bg-[#4361EE] rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Seconds */}
          <div className="flex flex-col items-center">
            <span className="text-[8px] font-medium text-[#4361EE]/70 uppercase mb-0.5">Sec</span>
            <div className="flex">
              <div className="relative mx-0.5 w-8 h-10 overflow-hidden">
                <div className="absolute inset-0 bg-[#040508] rounded backdrop-blur-sm border border-[#252A44]/80 shadow-inner shadow-black/40"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono text-xl font-bold bg-gradient-to-b from-[#4361EE] to-[#3A0CA3] bg-clip-text text-transparent">{format(currentTime, "ss").charAt(0)}</span>
                </div>
                <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/40 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              <div className="relative mx-0.5 w-8 h-10 overflow-hidden">
                <div className="absolute inset-0 bg-[#040508] rounded backdrop-blur-sm border border-[#252A44]/80 shadow-inner shadow-black/40"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono text-xl font-bold bg-gradient-to-b from-[#4361EE] to-[#3A0CA3] bg-clip-text text-transparent">{format(currentTime, "ss").charAt(1)}</span>
                </div>
                <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/40 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </div>
          </div>
          
          {/* Milliseconds */}
          <div className="flex flex-col ml-2 justify-center">
            <div className="relative w-12 h-6 overflow-hidden bg-[#040508] rounded-lg border border-[#252A44]/50">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-sm bg-gradient-to-r from-[#4CC9F0] via-[#7209B7] to-[#F72585] animate-gradient-x bg-clip-text text-transparent font-bold tracking-tight">
                  {format(currentTime, "SSS").substring(0, 3)}
                </span>
              </div>
              <div className="absolute inset-0 bg-[#040508]/10 backdrop-blur-sm"></div>
              <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black/40 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          </div>
          
          {/* Energy scan lines */}
          <div className="absolute left-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-[#4CC9F0]/50 to-transparent animate-scanning-line"></div>
          <div className="absolute left-0 bottom-0 w-full h-px bg-gradient-to-r from-transparent via-[#F72585]/50 to-transparent animate-scanning-line-reverse"></div>
        </div>
        
        {/* Enhanced bottom indicators */}
        <div className="flex justify-between items-center mt-1 px-1">
          <div className="flex items-center gap-1.5 bg-[#060810] py-0.5 px-1.5 rounded border border-[#252A44]/30">
            <span className="text-[10px] font-mono text-[#4CC9F0]/70">UTC{format(currentTime, "xxx")}</span>
          </div>
          
          {/* Day indicator with futuristic design */}
          <div className="flex items-center gap-1.5 py-0.5 px-1.5 rounded bg-[#060810] border border-[#252A44]/30">
            <span className="w-1 h-1 bg-[#F72585] rounded-full"></span>
            <span className="text-[10px] font-mono text-[#F72585]/70">{format(currentTime, "dd")}.</span>
            <span className="text-[10px] font-mono text-[#4361EE]/70">{format(currentTime, "MMM").toUpperCase()}</span>
          </div>
        </div>
        
        {/* Decorative progress bar */}
        <div className="mt-1.5 h-0.5 w-full bg-[#060810] rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#F72585] via-[#4361EE] to-[#4CC9F0]" 
            style={{ 
              width: `${(parseInt(format(currentTime, "s")) / 60 * 100) + (parseInt(format(currentTime, "SSS")) / 1000 * (100/60))}%`, 
              transition: "width 0.1s linear" 
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
