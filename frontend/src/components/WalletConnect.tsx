import { useState } from 'react';
import { Testnet } from '@nibiruchain/nibijs';
import { toast } from 'sonner';
import { Spinner } from "./ui/spinner";
import { WalletIcon, ExternalLink, Copy, CheckCircle2 } from 'lucide-react';

interface WalletConnectProps {
  address: string;
  onConnect: (address: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const WalletConnect = ({ 
  address, 
  onConnect,
  isLoading,
  setIsLoading
}: WalletConnectProps) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const connectWallet = async () => {
    try {
      setIsLoading(true);
      
      if (!window.leap) {
        toast.error('Wallet not found', {
          description: 'Please install Leap wallet extension'
        });
        return;
      }

      // Get the testnet configuration
      const testnet = Testnet(2);
      
      // Request connection to Leap wallet
      await window.leap.enable(testnet.chainId);
      
      // Get the offline signer for the chain
      const offlineSigner = window.leap.getOfflineSigner(testnet.chainId);
      
      // Ensure offlineSigner exists
      if (!offlineSigner) {
        throw new Error('Failed to get offline signer');
      }
      
      // Get user accounts
      const accounts = await offlineSigner.getAccounts();
      
      // Set the first account's address
      onConnect(accounts[0].address);
      
      console.log('Connected to wallet:', accounts[0].address);
    } catch (error) {
      console.error('Error connecting to wallet:', error);
      toast.error('Failed to connect wallet', {
        description: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopySuccess(true);
    
    // Reset copy success after 2 seconds
    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);

    toast.success('Address copied', {
      description: 'Wallet address copied to clipboard'
    });
  };

  const truncateAddress = (addr: string) => {
    return `${addr.substring(0, 8)}...${addr.substring(addr.length - 8)}`;
  };

  if (address) {
    return (
      <div className="bg-[#0D0F21]/50 border border-[#252A44] rounded-xl p-3 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-[#181B2E]">
              <WalletIcon className="h-3.5 w-3.5 text-[#4CC9F0]" />
            </div>
            <span className="text-xs font-medium text-white">Connected Wallet</span>
          </div>
          <a 
            href={`https://explorer.nibiru.fi/nibiru-testnet-2/account/${address}`} 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-[#4CC9F0] hover:text-[#7209B7] transition-colors duration-200"
          >
            View
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
        
        <div className="relative group">
          <div className="flex items-center bg-[#181B2E] border border-[#252A44] rounded-lg p-2 pr-10">
            <span className="text-xs text-white font-mono">{address}</span>
            <button 
              onClick={copyAddress}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 bg-[#0D0F21] rounded-md hover:bg-[#252A44] transition-colors duration-200"
            >
              {copySuccess ? (
                <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
              ) : (
                <Copy className="h-3.5 w-3.5 text-[#4CC9F0]" />
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button 
      onClick={connectWallet}
      disabled={isLoading}
      className="w-full bg-gradient-to-r from-[#4361EE] to-[#7209B7] text-white py-2.5 px-4 rounded-lg hover:shadow-lg hover:shadow-[#7209B7]/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#252A44] disabled:from-[#252A44] disabled:to-[#252A44] focus:outline-none focus:ring-2 focus:ring-[#4CC9F0]/50"
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <Spinner className="h-4 w-4 text-white" />
          <span>Connecting to Leap Wallet...</span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2">
          <WalletIcon className="h-4 w-4" />
          <span>Connect Leap Wallet</span>
        </div>
      )}
    </button>
  );
};

export default WalletConnect;