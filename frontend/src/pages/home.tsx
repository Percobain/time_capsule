import { Ripple } from "../components/magicui/ripple";
import { Link } from "react-router-dom";
import { ShineBorder } from "../components/magicui/shine-border";
import { AuroraText } from "../components/magicui/aurora-text";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background Ripple Effect */}
      <div className="absolute inset-0 z-0">
        <Ripple 
          mainCircleSize={250}
          mainCircleOpacity={0.3}
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
              colors={["#9F7E69", "#F7FFE0", "#9F7E69", "#F7FFE0"]} 
              speed={1.9}
            >
              Time Capsule
            </AuroraText>
          </h1>
          
          <p className="mb-8 max-w-2xl text-lg text-gray-300 md:text-xl">
            Manifest your future, revisit your journey. Create digital time capsules
            that can be opened at a future date of your choosing.
          </p>
          
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 mb-12">
            <Link to="/create-capsule">
              <button className="inline-flex h-12 items-center justify-center rounded-md bg-purple-600 px-6 text-sm font-medium text-white shadow transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2">
                Create a Capsule
              </button>
            </Link>
            <Link to="/about">
              <button className="inline-flex h-12 items-center justify-center rounded-md border border-purple-500/30 bg-transparent px-6 text-sm font-medium text-purple-200 shadow-sm transition-colors hover:bg-purple-900/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                Learn More
              </button>
            </Link>
          </div>
        </div>
        
        <div className="w-full max-w-5xl mx-auto mt-4 mb-12">
          {/* Three Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full">
            {/* Card 1 - Leap Wallet */}
            <div className="relative overflow-hidden bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-lg hover:border-purple-500/50 transition-all duration-300">
              <ShineBorder 
                shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} 
                borderWidth={2} 
                duration={10}
              />
              <div className="p-5">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold">
                    <AuroraText 
                      colors={["#D1E3DD", "#E3655B", "#5B8C5A"]} 
                      speed={1.2}
                      className="text-xl"
                    >
                      Leap Wallet
                    </AuroraText>
                  </h3>
                  <div className="mt-1 h-0.5 w-16 bg-gradient-to-r from-purple-500 to-purple-300 opacity-60"></div>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Your intentions are safely stored using advanced blockchain technology. Install the Leap Wallet extension to get started.
                </p>
                <div className="pt-2">
                  <a href="https://www.leapwallet.io/" target="_blank" rel="noopener" className="inline-flex items-center text-xs text-purple-300 hover:text-purple-200">
                    Get Leap Wallet
                    <svg className="ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Card 2 - Nibiru Chain Integration */}
            <div className="relative overflow-hidden bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-lg hover:border-purple-500/50 transition-all duration-300">
              <ShineBorder 
                shineColor={["#9333EA", "#7C3AED", "#A855F7"]} 
                borderWidth={2} 
                duration={12}
              />
              <div className="p-5">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold">
                    <AuroraText 
                      colors={["#9333EA", "#7C3AED", "#A855F7"]} 
                      speed={0.8}
                      className="text-xl"
                    >
                      Nibiru Chain
                    </AuroraText>
                  </h3>
                  <div className="mt-1 h-0.5 w-16 bg-gradient-to-r from-purple-500 to-purple-300 opacity-60"></div>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Connect your Leap Wallet to the Nibiru chain to create time-locked intentions that open exactly when you want them to.
                </p>
                <div className="pt-2">
                  <a href="https://nibiru.fi/" target="_blank" rel="noopener" className="inline-flex items-center text-xs text-purple-300 hover:text-purple-200">
                    Learn about Nibiru
                    <svg className="ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Card 3 - Nibiru Faucet */}
            <div className="relative overflow-hidden bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-lg hover:border-purple-500/50 transition-all duration-300 sm:col-span-2 md:col-span-1">
              <ShineBorder 
                shineColor={["#7C3AED", "#6366F1", "#818CF8"]} 
                borderWidth={2} 
                duration={14}
              />
              <div className="p-5">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold">
                    <AuroraText 
                      colors={["#7C3AED", "#6366F1", "#818CF8"]} 
                      speed={1}
                      className="text-xl"
                    >
                      Nibiru Faucet
                    </AuroraText>
                  </h3>
                  <div className="mt-1 h-0.5 w-16 bg-gradient-to-r from-purple-500 to-purple-300 opacity-60"></div>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Built on the Nibiru blockchain network. Get started with testnet tokens from the Nibiru faucet.
                </p>
                <div className="pt-2">
                  <a href="https://app.nibiru.fi/faucet" target="_blank" rel="noopener" className="inline-flex items-center text-xs text-purple-300 hover:text-purple-200">
                    Get testnet tokens
                    <svg className="ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="w-full text-center text-xs text-purple-300/50 mt-auto pt-4">
          <p>© {new Date().getFullYear()} Time Capsule</p>
        </div>
      </div>
    </div>
  );
}