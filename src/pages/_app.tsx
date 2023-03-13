import '@/styles/globals.css'
import type { AppProps } from "next/app";
import React from "react";
import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    PhantomWalletAdapter
} from '@solana/wallet-adapter-wallets';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { useMemo } from 'react';

const App = ({ Component, pageProps }: AppProps) => {
  // you can use Mainnet, Devnet or Testnet here
    const solNetwork = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(solNetwork), [solNetwork]);
    const wallets = useMemo(
      () => [
          new PhantomWalletAdapter(),
      ],
      [solNetwork]
    )

  return(
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
          <Component {...pageProps} />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};  

export default App;