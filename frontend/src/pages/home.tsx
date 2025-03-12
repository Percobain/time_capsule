import { Ripple } from "../components/magicui/ripple";
import { Link } from "react-router-dom";
// import { ShineBorder } from "../components/magicui/shine-border";
import { AuroraText } from "../components/magicui/aurora-text";
import { MagicCard } from "../components/magicui/magic-card";
import { CoolMode } from "../components/magicui/cool-mode";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#080816]">
      {/* Background Ripple Effect - more subtle, cybernetic feel */}
      <div className="absolute inset-0 z-0">
        <Ripple 
          mainCircleSize={250}
          mainCircleOpacity={0.2}
          numCircles={10}
        />
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-between px-4 py-12 md:py-16">
        <div className="w-full"></div> {/* Top spacer */}
        
        {/* Main content area */}
        <div className="flex w-full flex-col items-center justify-center text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            <AuroraText 
              colors={["#CDD7D6", "#CDD7D6", "#F3DFC1", "#3A0CA3"]} 
              speed={1.9}
            >
              Time Capsule
            </AuroraText>
          </h1>
          
          <p className="mb-8 max-w-2xl text-lg text-[#E2E8F0] md:text-xl">
            Manifest your future, revisit your journey. Create digital time capsules
            that can be opened at a future date of your choosing.
          </p>
          
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 mb-12">
            <Link to="/create-capsule">
              <button className="inline-flex h-12 items-center justify-center rounded-md bg-gradient-to-r from-[#4361EE] to-[#7209B7] px-6 text-sm font-medium text-white shadow transition-all duration-300 hover:shadow-lg hover:shadow-[#7209B7]/40 focus:outline-none focus:ring-2 focus:ring-[#4361EE] focus:ring-offset-2">
                Create a Capsule
              </button>
            </Link>
            <CoolMode>
              <button 
                className="inline-flex h-12 items-center justify-center rounded-md border border-[#00DDFF]/50 bg-transparent px-6 text-sm font-medium text-[#00DDFF] shadow-sm transition-colors hover:bg-[#00DDFF]/10 focus:outline-none focus:ring-2 focus:ring-[#00DDFF] focus:ring-offset-2"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Click Me
              </button>
            </CoolMode>
          </div>
        </div>
        
        <div className="w-full max-w-5xl mx-auto mt-4 mb-12">
          {/* Three Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full">
            {/* Card 1 - Leap Wallet */}
            <MagicCard 
              className="rounded-lg"
              gradientSize={150}
              gradientFrom="#00DDFF"
              gradientTo="#4361EE"
              gradientColor="#4CC9F0"
              gradientOpacity={0.15}
            >
              <div className="p-5">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold">
                    <AuroraText 
                      colors={["#4CC9F0", "#4361EE", "#3A0CA3"]} 
                      speed={1.2}
                      className="text-xl"
                    >
                      Leap Wallet
                    </AuroraText>
                  </h3>
                  <div className="mt-1 h-0.5 w-16 bg-gradient-to-r from-[#4CC9F0] to-[#4361EE] opacity-60"></div>
                </div>
                <p className="text-[#E2E8F0] text-sm mb-4 leading-relaxed">
                  Your intentions are safely stored using advanced blockchain technology. Install the Leap Wallet extension to get started.
                </p>
                <div className="pt-2">
                  <a href="https://www.leapwallet.io/" target="_blank" rel="noopener" className="inline-flex items-center text-xs text-[#4CC9F0] hover:text-[#4CC9F0]/80 transition-colors">
                    Get Leap Wallet
                    <svg className="ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </MagicCard>
            
            {/* Card 2 - Nibiru Chain Integration */}
            <MagicCard 
              className="rounded-lg"
              gradientSize={150}
              gradientFrom="#D3D0CB"
              gradientTo="#560BAD"
              gradientColor="#E2C044"
              gradientOpacity={0.15}
            >
              <div className="p-5">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold">
                    <AuroraText 
                      colors={["#CDD7D6", "#D3D0CB", "#CDD7D6"]} 
                      speed={3.5}
                      className="text-xl"
                    >
                      Nibiru Chain
                    </AuroraText>
                  </h3>
                  <div className="mt-1 h-0.5 w-16 bg-gradient-to-r from-[#7209B7] to-[#480CA8] opacity-60"></div>
                </div>
                <p className="text-[#E2E8F0] text-sm mb-4 leading-relaxed">
                  Connect your Leap Wallet to the Nibiru chain to create time-locked intentions that open exactly when you want them to.
                </p>
                <div className="pt-2">
                  <a href="https://nibiru.fi/" target="_blank" rel="noopener" className="inline-flex items-center text-xs text-[#B5179E] hover:text-[#B5179E]/80 transition-colors">
                    Learn about Nibiru
                    <svg className="ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </MagicCard>
            
            {/* Card 3 - Nibiru Faucet */}
            <MagicCard 
              className="rounded-lg sm:col-span-2 md:col-span-1"
              gradientSize={150}
              gradientFrom="#4361EE"
              gradientTo="#3A0CA3"
              gradientColor="#4361EE"
              gradientOpacity={0.15}
            >
              <div className="p-5">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold">
                    <AuroraText 
                      colors={["#4361EE", "#3A0CA3", "#3F37C9"]} 
                      speed={1}
                      className="text-xl"
                    >
                      Nibiru Faucet
                    </AuroraText>
                  </h3>
                  <div className="mt-1 h-0.5 w-16 bg-gradient-to-r from-[#4361EE] to-[#3A0CA3] opacity-60"></div>
                </div>
                <p className="text-[#E2E8F0] text-sm mb-4 leading-relaxed">
                  Built on the Nibiru blockchain network. Get started with testnet tokens from the Nibiru faucet.
                </p>
                <div className="pt-2">
                  <a href="https://app.nibiru.fi/faucet" target="_blank" rel="noopener" className="inline-flex items-center text-xs text-[#4361EE] hover:text-[#4361EE]/80 transition-colors">
                    Get testnet tokens
                    <svg className="ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </MagicCard>
          </div>
        </div>
        
        {/* Footer */}
        <div className="w-full text-center text-xs text-[#B5B9D6]/50 mt-auto pt-4">
          <p>© {new Date().getFullYear()} Time Capsule</p>
        </div>
      </div>
    </div>
  );
}