import { useState } from 'react';
import { Testnet } from '@nibiruchain/nibijs';
import { toast } from 'sonner';
import { Spinner } from "./ui/spinner";
import { WalletIcon, ExternalLink, Copy, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";

interface WalletConnectProps {
  address: string;
  onConnect: (address: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

type WalletType = 'leap' | 'metamask';

const WalletConnect = ({ 
  address, 
  onConnect,
  isLoading,
  setIsLoading
}: WalletConnectProps) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [walletType, setWalletType] = useState<WalletType>('leap');
  const [showMetaMaskWarning, setShowMetaMaskWarning] = useState(false);

  const connectLeapWallet = async () => {
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

  const connectMetaMaskWallet = async () => {
    try {
      setIsLoading(true);
      
      if (!window.ethereum) {
        toast.error('MetaMask not found', {
          description: 'Please install MetaMask wallet extension'
        });
        return;
      }

      // Define Nibiru testnet-2 parameters
      const nibiruTestnet = {
        chainId: '0x1AFF', // Chain ID in hex (6911 in decimal)
        chainName: 'Nibiru Testnet-2',
        nativeCurrency: {
          name: 'NIBI',
          symbol: 'NIBI',
          decimals: 18,
        },
        rpcUrls: ['https://evm-rpc.testnet-2.nibiru.fi'],
        blockExplorerUrls: ['https://explorer.nibiru.fi/nibiru-testnet-2/'],
      };

      try {
        // Request to switch to Nibiru Testnet-2 if it's already added
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: nibiruTestnet.chainId }],
        });
      } catch (switchError: any) {
        // If the chain hasn't been added, add it
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [nibiruTestnet],
            });
          } catch (addError) {
            throw new Error('Failed to add Nibiru Testnet-2 network to MetaMask');
          }
        } else {
          throw switchError;
        }
      }

      // Request account access
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      // Set the first account's address
      onConnect(accounts[0]);
      
      // Display information toast about limited functionality
      toast.info('Limited functionality with MetaMask', {
        description: 'Some features may not work. For full functionality, please use Leap wallet.',
        duration: 8000,
      });
      
      console.log('Connected to MetaMask:', accounts[0]);
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      toast.error('Failed to connect MetaMask', {
        description: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectWallet = async () => {
    if (walletType === 'leap') {
      await connectLeapWallet();
    } else {
      // Show warning dialog for MetaMask
      setShowMetaMaskWarning(true);
    }
  };

  const proceedWithMetaMask = async () => {
    setShowMetaMaskWarning(false);
    await connectMetaMaskWallet();
  };
  
  const switchToLeapWallet = () => {
    setShowMetaMaskWarning(false);
    setWalletType('leap');
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
    <>
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setWalletType('leap')}
            className={`flex-1 py-2 px-3 text-sm rounded-lg border transition-colors ${
              walletType === 'leap' 
                ? 'bg-[#252A44] border-[#4361EE] text-white' 
                : 'bg-[#0D0F21]/50 border-[#252A44] text-gray-400 hover:bg-[#181B2E]'
            }`}
          >
            <div className="flex items-center justify-center gap-1.5">
              <span>Leap Wallet</span>
              {walletType !== 'leap' && (
                <span className="bg-[#4CC9F0]/20 text-[#4CC9F0] text-[9px] px-1.5 py-0.5 rounded-full">Recommended</span>
              )}
            </div>
          </button>
          <button
            type="button"
            onClick={() => setWalletType('metamask')}
            className={`flex-1 py-2 px-3 text-sm rounded-lg border transition-colors ${
              walletType === 'metamask' 
                ? 'bg-[#252A44] border-[#4361EE] text-white' 
                : 'bg-[#0D0F21]/50 border-[#252A44] text-gray-400 hover:bg-[#181B2E]'
            }`}
          >
            MetaMask
          </button>
        </div>

        <button 
          onClick={handleConnectWallet}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-[#4361EE] to-[#7209B7] text-white py-2.5 px-4 rounded-lg hover:shadow-lg hover:shadow-[#7209B7]/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#252A44] disabled:from-[#252A44] disabled:to-[#252A44] focus:outline-none focus:ring-2 focus:ring-[#4CC9F0]/50"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <Spinner className="h-4 w-4 text-white" />
              <span>Connecting to {walletType === 'leap' ? 'Leap' : 'MetaMask'} Wallet...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <WalletIcon className="h-4 w-4" />
              <span>Connect {walletType === 'leap' ? 'Leap' : 'MetaMask'} Wallet</span>
            </div>
          )}
        </button>
        
        {/* Information note on wallet support */}
        <div className="mt-1 flex items-center gap-1.5 text-xs text-[#4CC9F0]/70 bg-[#0D0F21]/60 p-2 rounded-lg border border-[#252A44]/50">
          <Info className="h-3.5 w-3.5 flex-shrink-0" />
          <span>Nibiru blockchain features are fully supported only on Leap Wallet</span>
        </div>
      </div>

      {/* MetaMask Warning Dialog */}
      <Dialog open={showMetaMaskWarning} onOpenChange={setShowMetaMaskWarning}>
        <DialogContent className="bg-[#0D0F21] border border-[#252A44] text-white">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-full bg-[#F72585]/20 inline-flex">
                <AlertTriangle className="h-5 w-5 text-[#F72585]" />
              </div>
              <DialogTitle className="text-white">Limited Functionality Warning</DialogTitle>
            </div>
            <DialogDescription className="text-white/70">
              <p className="mb-3">
                This application is built on the Nibiru blockchain, which is not yet fully EVM-compatible.
              </p>
              <div className="bg-[#252A44]/30 p-3 rounded-lg border border-[#252A44]/70 mb-3">
                <p className="font-medium text-white mb-1">Important:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>MetaMask connection will show the UI but transactions will fail</li>
                  <li>Full functionality requires the <span className="text-[#4CC9F0] font-medium">Leap Wallet</span></li>
                  <li>EVM compatibility is coming soon</li>
                </ul>
              </div>
              <p>Do you want to proceed with MetaMask in view-only mode or switch to Leap Wallet?</p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex sm:justify-between gap-3">
            <button 
              onClick={switchToLeapWallet} 
              className="flex-1 py-2 bg-gradient-to-r from-[#4361EE] to-[#4CC9F0] text-white rounded-lg hover:shadow-lg transition-all"
            >
              Switch to Leap Wallet
            </button>
            <button 
              onClick={proceedWithMetaMask} 
              className="flex-1 py-2 bg-[#181B2E] border border-[#252A44] text-white/80 rounded-lg hover:bg-[#252A44]/70 transition-colors"
            >
              Proceed with MetaMask
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WalletConnect;