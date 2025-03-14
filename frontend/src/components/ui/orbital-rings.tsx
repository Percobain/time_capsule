import React from 'react';

const OrbitalRings: React.FC = () => {
  return (
    <>
      {/* Enhanced decorative elements */}
      <div className="absolute top-40 left-[10%] w-32 h-32 bg-[#F72585]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-[15%] w-48 h-48 bg-[#4361EE]/5 rounded-full blur-3xl"></div>
      <div className="absolute top-[30%] right-[20%] w-24 h-24 bg-[#4CC9F0]/5 rounded-full blur-2xl"></div>
      <div className="absolute bottom-[40%] left-[15%] w-36 h-36 bg-[#7209B7]/5 rounded-full blur-3xl"></div>
      
      {/* Orbital rings with particles */}
      <div className="absolute left-[5%] top-[30%] w-16 h-16 rounded-full border border-[#4CC9F0]/20 animate-[spin_20s_linear_infinite]">
        <div className="absolute -left-1 -top-1 w-2 h-2 bg-[#4CC9F0] rounded-full"></div>
      </div>
      <div className="absolute right-[10%] top-[20%] w-24 h-24 rounded-full border border-[#F72585]/20 animate-[spin_30s_linear_infinite_reverse]">
        <div className="absolute -right-1 -top-1 w-2 h-2 bg-[#F72585] rounded-full"></div>
      </div>
      <div className="absolute left-[25%] bottom-[15%] w-32 h-32 rounded-full border border-[#4361EE]/10 animate-[spin_40s_linear_infinite]">
        <div className="absolute left-1/2 -top-1 w-1.5 h-1.5 bg-[#4361EE] rounded-full"></div>
        <div className="absolute -left-1 top-1/2 w-1.5 h-1.5 bg-[#4361EE] rounded-full animate-pulse"></div>
      </div>
      
      {/* Bottom Right Area */}
      <div className="absolute right-[20%] bottom-[10%] w-28 h-28 rounded-full border border-[#7209B7]/15 animate-[spin_35s_linear_infinite_reverse]">
        <div className="absolute -right-1.5 bottom-1/2 w-3 h-3 bg-[#7209B7] rounded-full"></div>
        <div className="absolute right-1/3 -bottom-1 w-1.5 h-1.5 bg-[#7209B7]/70 rounded-full animate-pulse"></div>
      </div>
      
      {/* Bottom Left Space */}
      <div className="absolute left-[8%] bottom-[5%] w-20 h-20 rounded-full border border-[#4CC9F0]/15 animate-[spin_25s_linear_infinite]">
        <div className="absolute left-1/2 -bottom-1 w-1.5 h-1.5 bg-[#4CC9F0] rounded-full"></div>
      </div>
      
      {/* Top Center Space */}
      <div className="absolute left-[45%] top-[8%] w-16 h-16 rounded-full border border-[#F72585]/10 animate-[spin_22s_linear_infinite_reverse]">
        <div className="absolute -left-1 top-1/2 w-2 h-2 bg-[#F72585] rounded-full"></div>
      </div>
      
      {/* Middle Right Space - Double Ring System */}
      <div className="absolute right-[5%] top-[50%] w-36 h-36 rounded-full border border-[#4361EE]/10 animate-[spin_38s_linear_infinite]">
        <div className="absolute inset-[25%] rounded-full border border-[#F72585]/15 animate-[spin_15s_linear_infinite_reverse]">
          <div className="absolute -right-1 -top-1 w-1.5 h-1.5 bg-[#F72585] rounded-full"></div>
        </div>
        <div className="absolute -right-1.5 top-1/3 w-2 h-2 bg-[#4361EE] rounded-full"></div>
      </div>
      
      {/* Bottom Center Space */}
      <div className="absolute left-[45%] bottom-[3%] w-24 h-24 rounded-full border border-[#7209B7]/15 animate-[spin_32s_linear_infinite]">
        <div className="absolute left-[70%] -bottom-1 w-2 h-2 bg-[#7209B7]/80 rounded-full animate-pulse"></div>
        <div className="absolute -left-1 bottom-[30%] w-1 h-1 bg-[#7209B7] rounded-full"></div>
      </div>
      
      {/* Top Right Corner System */}
      <div className="absolute right-[3%] top-[5%] w-12 h-12 rounded-full border border-[#4CC9F0]/10 animate-[spin_18s_linear_infinite_reverse]">
        <div className="absolute right-1/2 -top-1 w-1.5 h-1.5 bg-[#4CC9F0] rounded-full animate-pulse"></div>
      </div>
      
      {/* Middle Left Space - Triple Ring System */}
      <div className="absolute left-[2%] top-[60%] w-44 h-44 rounded-full border border-[#F72585]/5 animate-[spin_45s_linear_infinite]">
        <div className="absolute inset-[20%] rounded-full border border-[#4CC9F0]/10 animate-[spin_28s_linear_infinite_reverse]">
          <div className="absolute inset-[30%] rounded-full border border-[#7209B7]/15 animate-[spin_15s_linear_infinite]">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#7209B7] rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="absolute -left-1 top-1/4 w-1.5 h-1.5 bg-[#F72585] rounded-full"></div>
      </div>
    </>
  );
};

export default OrbitalRings;
