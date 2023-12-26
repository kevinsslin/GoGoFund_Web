"use client";

import React from "react";
import { MagicConnectConnector } from "@everipedia/wagmi-magic-connector";
import { ThemeProvider } from "@material-tailwind/react";
import {
  RainbowKitProvider,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import {
  rainbowWallet,
  walletConnectWallet,
  metaMaskWallet,
  coreWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { goerli, avalancheFuji } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

import Navbar from "./navbar";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [goerli, avalancheFuji],
  [publicProvider()],
);
const ProjectId = "966691db73928f3c8a904ea62261b457";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rainbowMagicConnector = ({ chains }: any) => ({
  id: "magic",
  name: "Magic_Email",
  iconUrl: "https://avatars.githubusercontent.com/u/37784843?s=200&v=4",
  iconBackground: "#fff",
  createConnector: () => {
    const connector = new MagicConnectConnector({
      chains: chains,
      options: {
        apiKey: "pk_live_32DBE398F99D1619",
        magicSdkConfiguration: {
          network: {
            rpcUrl: "https://rpc.ankr.com/eth_goerli",
            chainId: 5,
          },
        },
      },
    });
    return {
      connector,
    };
  },
});

const connectors = connectorsForWallets([
  {
    groupName: "Email",
    wallets: [
        rainbowMagicConnector({ chains }),
    ],
  },
  {
    groupName: "Recommended",
    wallets: [
      metaMaskWallet({ projectId: ProjectId, chains }),
      coreWallet({ projectId: ProjectId, chains }),
      rainbowWallet({ projectId: ProjectId, chains }),
      walletConnectWallet({ projectId: ProjectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 10,
    },
  },
});
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} coolMode>
          <ThemeProvider>
            <Navbar />
            {children}
          </ThemeProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}

export default Layout;
