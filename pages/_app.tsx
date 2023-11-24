import { ThemeProvider } from '@material-tailwind/react'
import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { celo, celoAlfajores, celoCannoli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";


export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const { chains, publicClient } = configureChains(
    [celoAlfajores, celo, celoCannoli],
    [publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: "Kickstarter",
    projectId: "304bb25132c30b8673622bd3433ef4ee",
    chains,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });
  return (
    <ThemeProvider>
      <Toaster />
      <SessionProvider session={session}>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
      </SessionProvider>
    </ThemeProvider>
  )
}
