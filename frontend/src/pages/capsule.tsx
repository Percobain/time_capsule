import { useState, useEffect, useRef } from 'react';
import { format } from "date-fns";
import WalletConnect from '../components/WalletConnect';
import MessageStore from '../components/MessageStore';
import MessageRetriever from '../components/MessageRetriever';
import { Toaster, toast } from 'sonner';
import { AuroraText } from '../components/magicui/aurora-text';
import { InteractiveGridPattern } from '../components/magicui/interactive-grid-pattern';
import NetworkVisualization from '../components/ui/network-visualization';
import OrbitalRings from '../components/ui/orbital-rings';
import { 
  Activity, ArrowUpRight, Target, CheckCircle2, CalendarIcon, Clock, 
  Shield, Lock, Zap, Timer, Fingerprint, Rocket
} from "lucide-react";
import { Calendar } from "../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { cn } from "@/lib/utils";
import ClockComponent from '../components/ui/clock';

export default function Capsule() {
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string>("00:00");
  const [timestamp, setTimestamp] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<string>('');
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleConnect = (address: string) => {
    setAddress(address);
    toast.success('Wallet connected successfully', {
      description: `Connected to ${address.slice(0, 8)}...${address.slice(-4)}`,
    });
  };

  const getCombinedDateTime = () => {
    if (!date) return null;
    
    const [hours, minutes] = time.split(':').map(Number);
    const dateTime = new Date(date);
    dateTime.setHours(hours, minutes, 0, 0);
    
    return dateTime;
  };

  const getUnixTimestamp = () => {
    const dateTime = getCombinedDateTime();
    return dateTime ? Math.floor(dateTime.getTime() / 1000) : null;
  };

  useEffect(() => {
    const newTimestamp = getUnixTimestamp();
    setTimestamp(newTimestamp ? newTimestamp.toString() : undefined);
  }, [date, time]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Update mouse position for interactive grid
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);

    return compareDate < today;
  };

  return (
    <div className="h-screen overflow-hidden bg-[#080816] text-white relative">
      {/* Interactive Grid Background - Updated to be more responsive */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle ${100}px at ${mousePosition.x}px ${mousePosition.y}px, rgba(76, 201, 240, 0.1), transparent)`,
          transition: 'background 0.1s'
        }}
      >
        <InteractiveGridPattern 
          width={40} 
          height={40} 
          squares={[48, 36]} 
          className="border-none opacity-20" 
          squaresClassName="stroke-[#4CC9F0]/10 hover:fill-[#4CC9F0]/5 hover:stroke-[#4CC9F0]/30"
        />
        
        {/* Using the OrbitalRings component */}
        <OrbitalRings />
      </div>
      
      <Toaster position="top-right" richColors />
      
      {/* Header Bar */}
      <header className="h-16 border-b border-[#1A1D35] px-6 flex items-center bg-[#0B0C1B]/80 backdrop-blur-sm shadow-md relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-[#0D0F21] shadow-inner shadow-[#000]/20 relative">
            <Activity className="w-4 h-4 text-[#4CC9F0]" />
            <div className="absolute inset-0 rounded-full border border-[#4CC9F0]/30 animate-ping opacity-20"></div>
          </div>
          <h1 className="text-lg font-bold text-white mb-0 tracking-tight">
            <AuroraText 
              colors={["#00FFFF", "#4CC9F0", "#9D4EDD", "#F72585"]} 
              speed={0.8}
            >
              Time Capsule
            </AuroraText>
          </h1>
        </div>
        <p className="ml-4 text-xs text-[#E2E8F0] hidden sm:block">
          Create and retrieve your time-locked intentions
        </p>
        <div className="ml-auto flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#181B2E]/50 border border-[#252A44] text-xs font-mono">
            <Timer className="h-3 w-3 text-[#4CC9F0]" />
            <span className="text-[#4CC9F0]">{format(currentTime, "HH:mm:ss")}</span>
          </div>

          {address && (
            <button
              type="button"
              onClick={() => window.location.href = '/'}
              className="inline-flex items-center gap-1.5 text-xs font-medium
              text-white hover:text-[#4CC9F0]
              transition-colors duration-200 cursor:pointer"
            >
              Return to Home
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </header>

      <div className="h-[calc(100vh-4rem)] flex flex-col md:flex-row relative z-10">
        {!address ? (
          <div className="w-full flex justify-center items-center">
            <div className="max-w-md w-full px-4">
              <WalletConnect 
                address={address} 
                onConnect={handleConnect} 
                isLoading={isLoading} 
                setIsLoading={setIsLoading}
              />
              
              <div className="flex justify-center w-full">
                <div className="mt-6 bg-[#0D0F21]/70 border border-[#252A44] rounded-xl p-6 backdrop-blur-sm max-w-md w-full mx-auto">
                  <h3 className="text-sm font-medium mb-4 flex items-center gap-2 justify-center">
                    <Shield className="h-3.5 w-3.5 text-[#4CC9F0]" />
                    Getting Started
                  </h3>
                  <ol className="text-xs text-white/70 space-y-4 list-none pl-0">
                    <li className="flex items-start gap-3">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#4CC9F0]/40 bg-[#0D0F21]">
                        <span className="text-xs text-[#4CC9F0]">1</span>
                      </div>
                      <span>Connect your Leap wallet to access the blockchain</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#4CC9F0]/40 bg-[#0D0F21]">
                        <span className="text-xs text-[#4CC9F0]">2</span>
                      </div>
                      <span>Create a time capsule with your private message</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#4CC9F0]/40 bg-[#0D0F21]">
                        <span className="text-xs text-[#4CC9F0]">3</span>
                      </div>
                      <span>Set a future date when it can be unlocked</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#4CC9F0]/40 bg-[#0D0F21]">
                        <span className="text-xs text-[#4CC9F0]">4</span>
                      </div>
                      <span>Retrieve your message after the unlock date</span>
                    </li>
                  </ol>
                  
                  <div className="mt-6 border-t border-dashed border-[#252A44] pt-4 flex justify-center">
                    <div className="flex items-center gap-2 text-xs text-white/50">
                      <Fingerprint className="h-3.5 w-3.5 text-[#4CC9F0]/50" />
                      <span>Secured by Nibiru blockchain</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Left Side - Wallet Connect */}
            <div className="w-full md:w-1/3 p-4 border-r border-[#1A1D35]/50">
              <div className="h-full flex flex-col">
                <WalletConnect 
                  address={address} 
                  onConnect={handleConnect} 
                  isLoading={isLoading} 
                  setIsLoading={setIsLoading}
                />

                <div className="mt-6 p-4 rounded-xl bg-[#0D0F21]/70 border border-[#252A44] backdrop-blur-sm">
                  <h5 className="flex items-center gap-2 text-xs font-medium text-white mb-3">
                    <Clock className="w-3.5 h-3.5 text-[#4CC9F0]" />
                    <span>Time Matrix</span>
                  </h5>

                  <div className="flex justify-center mb-3">
                    <ClockComponent />
                  </div>

                  <div className="mt-3 flex items-center justify-center">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#4CC9F0] animate-pulse"></div>
                      <span className="text-[10px] font-mono text-white/50">SYSTEM ONLINE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Middle - Create New Capsule */}
            <div className="w-full md:w-1/3 p-4 h-full overflow-auto border-r border-[#1A1D35]/50">
              <div className="flex items-center justify-between mb-3">
                <h4 className="flex items-center gap-2 text-xs font-medium text-white">
                  <Target className="w-3.5 h-3.5 text-[#4CC9F0]" />
                  Create New Capsule
                </h4>

                <div className="px-2 py-0.5 bg-[#181B2E] rounded-full text-xs border border-[#252A44] flex items-center gap-1.5">
                  <Zap className="h-3 w-3 text-[#F72585]" />
                  <span className="text-[#4CC9F0]">Capsules</span>
                </div>
              </div>
              
              <div className="bg-[#0D0F21]/80 p-4 rounded-xl border border-[#4361EE]/20 backdrop-blur-sm">
                <div className="mb-4 flex justify-center">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#4361EE]/20 to-[#7209B7]/20 flex items-center justify-center">
                      <Lock className="h-6 w-6 text-[#4CC9F0]" />
                    </div>
                    <div className="absolute inset-0 rounded-full border-2 border-[#4CC9F0]/20 animate-ping opacity-20"></div>
                    <div className="absolute -right-1 -bottom-1 w-5 h-5 bg-[#181B2E] rounded-full flex items-center justify-center shadow-lg">
                      <Rocket className="h-3 w-3 text-[#F72585]" />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-sm font-medium text-white mb-1.5 flex items-center gap-2">
                    <span>Your Message</span>
                    <div className="h-px flex-1 bg-[#252A44]/50"></div>
                  </label>
                  <div className="relative">
                    <textarea 
                      className="w-full px-3 py-2 bg-[#181B2E] border border-[#252A44] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-[#4CC9F0] focus:border-[#4CC9F0]"
                      rows={4}
                      placeholder="Enter your message here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      ref={messageRef}
                    />
                    <div className="absolute -right-1 -top-1">
                      <div className="w-2 h-2 rounded-full bg-[#4CC9F0] animate-pulse"></div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-white/50 font-mono">
                      {message.length} characters
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-sm font-medium text-white mb-1.5 flex items-center gap-2">
                    <span>Unlock Date & Time</span>
                    <div className="h-px flex-1 bg-[#252A44]/50"></div>
                  </label>
                  <div className="flex gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          className={cn(
                            "flex-1 flex items-center justify-between rounded-md border border-[#252A44] bg-[#181B2E] px-3 py-2 text-sm text-white shadow-sm hover:bg-[#1F223A] focus:outline-none focus:ring-1 focus:ring-[#4CC9F0]",
                            !date && "text-[#E2E8F0]"
                          )}
                        >
                          {date ? format(date, "MMM dd, yyyy") : "Select date"}
                          <CalendarIcon className="ml-2 h-4 w-4 text-[#4CC9F0]" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-[#0D0F21] border border-[#252A44] shadow-lg shadow-black/20" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={isPastDate}
                          initialFocus
                          className="bg-[#0D0F21] text-white"
                        />
                      </PopoverContent>
                    </Popover>

                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-24 rounded-md border border-[#252A44] bg-[#181B2E] px-3 py-2 text-sm text-white shadow-sm focus:outline-none focus:ring-1 focus:ring-[#4CC9F0]"
                    />
                  </div>

                  {date && (
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3 w-3 text-[#4CC9F0]" />
                        <p className="text-xs text-white/70">
                          Unlocks: {format(getCombinedDateTime() || new Date(), "PPP p")}
                        </p>
                      </div>

                      <span className="text-[10px] text-white/40 font-mono">
                        {timestamp}
                      </span>
                    </div>
                  )}

                  {date && (
                    <div className="mt-3 relative h-1 w-full bg-[#181B2E] rounded-full overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#F72585]/50 via-[#7209B7]/50 to-[#4CC9F0]/50"></div>
                      <div className="absolute h-1.5 w-1.5 bg-white rounded-full transform -translate-y-1/4" style={{ 
                        left: "50%",
                        boxShadow: "0 0 5px #FFF, 0 0 10px #FFF"
                      }}></div>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <MessageStore 
                    address={address} 
                    isLoading={isLoading} 
                    setIsLoading={setIsLoading} 
                    contractAddress={contractAddress}
                    timestamp={timestamp}
                    hideTimePicker={true}
                    hideMessageInput={true}
                    onlyShowButton={true}
                  />

                  <div className="absolute inset-x-0 -bottom-4 h-px bg-gradient-to-r from-transparent via-[#4CC9F0]/30 to-transparent"></div>
                </div>

                <div className="mt-5 text-xs text-white/40 flex items-center gap-2 justify-center">
                  <Shield className="h-3.5 w-3.5" />
                  <span>Manifest your Energy</span>
                </div>
              </div>
              
            </div>
            
            {/* Right Side - Retrieve Capsules */}
            <div className="w-full md:w-1/3 p-4 h-full overflow-auto">
              <div className="flex items-center justify-between mb-3">
                <h4 className="flex items-center gap-2 text-xs font-medium text-white">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F72585]" />
                  Retrieve Capsules
                </h4>
                
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F72585] animate-pulse"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#7209B7]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4361EE]"></div>
                </div>
              </div>
              
              <div className="bg-[#0D0F21]/80 p-4 rounded-xl border border-[#F72585]/20 backdrop-blur-sm">
                <MessageRetriever 
                  address={address} 
                  isLoading={isLoading} 
                  setIsLoading={setIsLoading} 
                  contractAddress={contractAddress}
                />
              </div>
              
              <div className="mt-4 relative h-40 rounded-xl bg-[#0D0F21]/40 border border-[#252A44]/50 backdrop-blur-sm overflow-hidden">
                <NetworkVisualization />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}