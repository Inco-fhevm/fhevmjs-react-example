import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import WalletContext from "./WalletContext.jsx";


export const Connect = ({ children }) => {
    const { account, provider, connecting, connected, error, validNetwork, switchNetwork, connect} = useContext(WalletContext);

    const child = useMemo(() => {
        if (!account || !provider) {
            return null;
        }

        if (!connecting && !validNetwork) {
            return (
                <div>
                    <p>You're not on the correct network</p>
                    <p>
                        <button className="Connect__button" onClick={switchNetwork}>
                            Switch to Inco Gentry Testnet
                        </button>
                    </p>
                </div>
            );
        }
        return null;
    }, [account, provider, validNetwork, children, switchNetwork]);

    if (error) {
        return <p>No wallet has been found.</p>;
    }

    const connectInfos = (
        <div className="Connect__info">
            {!connected && (
                <button className="Connect__button" onClick={connect}>
                    Connect your wallet
                </button>
            )}
        </div>
    );

    return (
        <>
            {connectInfos}
            <div className="Connect__child">{child}</div>
        </>
    );
};
