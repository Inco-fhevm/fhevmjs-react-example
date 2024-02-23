import { BrowserProvider } from "ethers";
import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { createFhevmInstance } from "./utils/fhevm";

const defaultValue = {
    account: null,
    provider: null,
    validNetwork: false,
    connected: false,
    error: null,
    switchNetwork: () => {
    },
    connect: () => {
    },
}
export const WalletContext = createContext(defaultValue);

const AUTHORIZED_CHAIN_ID = ["0x2382", "0x2383"]; // 9090, 9091
export const WalletProvider = ({ children }) => {
    const [account, setAccount] = useState(defaultValue.account);
    const [connecting, setConnecting] = useState(false);
    const [connected, setConnected] = useState(defaultValue.connected);
    const [provider, setProvider] = useState(defaultValue.provider);
    const [validNetwork, setValidNetwork] = useState(defaultValue.validNetwork);
    const [error, setError] = useState(defaultValue.error);

    const hasValidNetwork = async () => {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' })
        console.log('hasValidNetwork', chainId, AUTHORIZED_CHAIN_ID.includes(chainId.toLowerCase()))
        return AUTHORIZED_CHAIN_ID.includes(chainId.toLowerCase());
    };

    const refreshNetwork = useCallback(async () => {
        setConnecting(true);
        if ((
            await hasValidNetwork()
        )) {
            await createFhevmInstance();
            setValidNetwork(true);
        } else {
            setValidNetwork(false);
        }
        setConnecting(false);
    }, [hasValidNetwork]);

    const switchNetwork = useCallback(async () => {
        try {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: AUTHORIZED_CHAIN_ID[0] }],
            });
        } catch (e) {
            await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                    {
                        chainId: AUTHORIZED_CHAIN_ID[0],
                        rpcUrls: ["https://testnet.inco.org"],
                        chainName: "Inco Gentry Testnet",
                        nativeCurrency: {
                            name: "INCO",
                            symbol: "INCO",
                            decimals: 18,
                        },
                        blockExplorerUrls: ["https://explorer.testnet.inco.org/"],
                    },
                ],
            });
        }
        await refreshNetwork();
    }, [provider, refreshNetwork]);

    const connect = useCallback(async () => {
        if (!provider) {
            return;
        }
        const accounts = await provider.send("eth_requestAccounts", []);

        if (accounts.length > 0) {
            setAccount(accounts[0]);
            setConnected(true);
            const isValidNetwork = await hasValidNetwork();
            if (!isValidNetwork) {
                await switchNetwork();
            } else {
                await refreshNetwork();
            }
        }
    }, [provider, refreshNetwork, switchNetwork]);

    useEffect(() => {
        connect();
    }, [provider])

    const refreshAccounts = useCallback(async () => {
        window.ethereum.request("eth_accounts", [])
            .then(async (accounts) => {
                setAccount(accounts[0] || "");
                setConnected(accounts.length > 0);
            })
            .catch(() => {
                // Do nothing
            });
    }, [provider, refreshNetwork]);

    useEffect(() => {
        const eth = window.ethereum;
        if (!eth) {
            setError("No wallet has been found");
            return;
        }
        console.log(eth)
        setProvider(new BrowserProvider(eth));
        refreshAccounts();
    }, []);

    useEffect(() => {
        if (!window.ethereum) {
            return;
        }
        window.ethereum.on("accountsChanged", refreshAccounts);
        window.ethereum.on("chainChanged", refreshNetwork);
    }, []);

    const value = useMemo(() => (
        { account, setAccount, provider, setProvider, validNetwork, error, connecting, connected, switchNetwork, connect }
    ), [account, provider, validNetwork, error, connecting, connected, switchNetwork, connect]);

    return (
        <WalletContext.Provider value={value}>
            {children}
        </WalletContext.Provider>
    )
}

export default WalletContext;
