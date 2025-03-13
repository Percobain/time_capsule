import { useState, useEffect, useRef } from 'react';
import { format } from "date-fns";
import WalletConnect from '../components/WalletConnect';
import MessageStore from '../components/MessageStore';
import MessageRetriever from '../components/MessageRetriever';
import { Toaster, toast } from 'sonner';
import { AuroraText } from '../components/magicui/aurora-text';
import { Activity, ArrowUpRight, Target, CheckCircle2, CalendarIcon } from "lucide-react";
import { Calendar } from "../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { cn } from "@/lib/utils";

export default function Capsule() {
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string>("00:00");
  const [timestamp, setTimestamp] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<string>('');
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
  const messageRef = useRef<HTMLTextAreaElement>(null);

  // Function to handle successful wallet connection
  const handleConnect = (address: string) => {
    setAddress(address);
    toast.success('Wallet connected successfully', {
      description: `Connected to ${address.slice(0, 8)}...${address.slice(-4)}`,
    });
  };

  // Combine date and time into a single timestamp
  const getCombinedDateTime = () => {
    if (!date) return null;
    
    const [hours, minutes] = time.split(':').map(Number);
    const dateTime = new Date(date);
    dateTime.setHours(hours, minutes, 0, 0);
    
    return dateTime;
  };
  
  // Calculate Unix timestamp
  const getUnixTimestamp = () => {
    const dateTime = getCombinedDateTime();
    return dateTime ? Math.floor(dateTime.getTime() / 1000) : null;
  };

  // Update timestamp when date or time changes
  useEffect(() => {
    const newTimestamp = getUnixTimestamp();
    setTimestamp(newTimestamp ? newTimestamp.toString() : undefined);
  }, [date, time]);

  // Helper function to check if a date is in the past
  const isPastDate = (date: Date) => {
    // Create today's date at midnight for comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Create comparison date at midnight
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    
    // Return true if date is before today (allow today's date)
    return compareDate < today;
  };

  return (
    <div className="min-h-screen bg-[#080816] p-4 text-white">
      <Toaster position="top-right" richColors />
      
      <div className="max-w-md mx-auto pt-8">
        <div className="relative rounded-2xl overflow-hidden backdrop-blur-sm bg-[#0B0C1B]/90 border border-[#4361EE]/20 hover:border-[#4361EE]/40 transition-all duration-300 shadow-xl shadow-[#000]/20">
          {/* Header with gradient overlay */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-[#4CC9F0]/10 to-transparent opacity-50"></div>
            <div className="relative flex items-center gap-3 p-5 pb-6">
              <div className="p-2 rounded-full bg-[#0D0F21] shadow-inner shadow-[#000]/20">
                <Activity className="w-4 h-4 text-[#4CC9F0]" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white mb-0 tracking-tight">
                  <AuroraText 
                    colors={["#00FFFF", "#4CC9F0", "#9D4EDD", "#F72585"]} 
                    speed={0.8}
                  >
                    Time Capsule
                  </AuroraText>
                </h1>
                <p className="text-xs text-[#E2E8F0] mt-0.5">
                  Create and retrieve your time-locked intentions
                </p>
              </div>
            </div>
          </div>

          {/* Content area with slight padding reduction */}
          <div className="px-5 pb-5">
            {/* Wallet Connect Section */}
            <div className="mb-6">
              <WalletConnect 
                address={address} 
                onConnect={handleConnect} 
                isLoading={isLoading} 
                setIsLoading={setIsLoading}
              />
            </div>

            {/* Message Store Section with Custom Date Time Picker */}
            {address && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="flex items-center gap-2 text-xs font-medium text-white">
                    <Target className="w-3.5 h-3.5 text-[#4CC9F0]" />
                    Create New Capsule
                  </h4>
                </div>
                <div className="bg-[#0D0F21]/80 p-3 rounded-xl border border-[#4361EE]/10">
                  {/* First section: Message Input */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-white mb-1.5">
                      Your Message
                    </label>
                    <textarea 
                      className="w-full px-3 py-2 bg-[#181B2E] border border-[#252A44] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-[#4CC9F0] focus:border-[#4CC9F0]"
                      rows={3}
                      placeholder="Enter your message here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      ref={messageRef}
                    />
                  </div>

                  {/* Second section: Date Time Picker */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-white mb-1.5">
                      Unlock Date & Time
                    </label>
                    <div className="flex gap-2">
                      {/* Date Picker using Calendar and Popover */}
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            className={cn(
                              "w-full flex items-center justify-between rounded-md border border-[#252A44] bg-[#181B2E] px-3 py-2 text-sm text-white shadow-sm hover:bg-[#1F223A] focus:outline-none focus:ring-1 focus:ring-[#4CC9F0]",
                              !date && "text-[#E2E8F0]"
                            )}
                          >
                            {date ? format(date, "PPP") : "Select date"}
                            <CalendarIcon className="ml-2 h-4 w-4 text-[#4CC9F0]" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-[#0D0F21] border border-[#252A44] shadow-lg shadow-black/20" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            disabled={isPastDate} // Fix: Use our custom function instead
                            initialFocus
                            className="bg-[#0D0F21] text-white"
                          />
                        </PopoverContent>
                      </Popover>

                      {/* Time Picker */}
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="flex-shrink-0 w-24 rounded-md border border-[#252A44] bg-[#181B2E] px-3 py-2 text-sm text-white shadow-sm focus:outline-none focus:ring-1 focus:ring-[#4CC9F0]"
                      />
                    </div>
                    
                    {/* Show selected date and time */}
                    {date && (
                      <p className="mt-2 text-xs text-white">
                        Capsule will unlock at: {format(getCombinedDateTime() || new Date(), "PPP p")}
                        {timestamp && ` (Timestamp: ${timestamp})`}
                      </p>
                    )}
                  </div>

                  {/* Pass the timestamp and message to MessageStore but hide the input fields */}
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
                </div>
              </div>
            )}

            {/* Message Retriever Section */}
            {address && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="flex items-center gap-2 text-xs font-medium text-white">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#F72585]" />
                    Retrieve Capsules
                  </h4>
                </div>
                <div className="bg-[#0D0F21]/80 p-3 rounded-xl border border-[#4361EE]/10">
                  <MessageRetriever 
                    address={address} 
                    isLoading={isLoading} 
                    setIsLoading={setIsLoading} 
                    contractAddress={contractAddress}
                  />
                </div>
              </div>
            )}

            {/* Footer */}
            {address && (
              <div className="pt-3 mt-3 border-t border-[#1A1D35]">
                <button
                  type="button"
                  onClick={() => window.location.href = '/'}
                  className="inline-flex items-center gap-1.5 text-xs font-medium
                  text-white hover:text-[#4CC9F0]
                  transition-colors duration-200"
                >
                  Return to Home
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}