import React, { useContext } from "react";
import WalletContext from "./WalletContext.jsx";
import { ArrowTopRight } from "./ArrowTopRight";


export const ConnectWallet = () => {
    const { connected, connecting, validNetwork, error } = useContext(WalletContext);
    return (
        <div>
            {/*{connecting && <Connecting/>}*/}
            {!connected && !connecting && <Connect/>}
            {!validNetwork && <SwitchNetwork/>}
            {!connected && !connecting && !validNetwork && error && <Error/>}
        </div>
    );
};

const Image = () => (
    <div className={'m-auto sm:w-[420px] w-full h-[240px]'}>
        <img src={'./mosaic.png'} alt={'hero'} className={''}/>
    </div>
)

const Connect = () => {
    const {
        connect,
        addIncoTestnet
    } = useContext(WalletContext);

    return (
        <div className={'flex items-center justify-center w-full h-full'}>
            <div className={'flex flex-col mx-auto sm:mt-[10%] sm:w-[560px] sm:p-0 p-3 w-full'}>
                <Image/>
                <button className={'w-full px-8 py-4 mt-[60px]'} onClick={connect}>
                    Connect your wallet
                </button>
                <div className={'mt-10 self-center inline flex flex-row hover:cursor-pointer'} onClick={addIncoTestnet}>
                    <span className={'text-blue'}>
                        Add Inco Testnet
                    </span>
                    <span className={'ml-2'}><ArrowTopRight/> </span>
                </div>
            </div>
        </div>
    )
}

const SwitchNetwork = () => {
    const {
        switchNetwork
    } = useContext(WalletContext);

    return (
        <div className={'flex items-center justify-center w-full h-full'}>
            <div className={'flex flex-col mx-auto sm:mt-[10%] sm:w-[560px] sm:p-0 p-3 w-full'}>
                <Image/>
                <div className={'text-green self-center font-urb text-4xl font-bold mt-[60px] leading-tight'}>
                    Please connect to Inco Testnet
                </div>
                <div className={'mt-10 self-center inline flex flex-row hover:cursor-pointer'} onClick={switchNetwork}>
                    <span className={'text-blue'}>
                        Switch to Inco Testnet
                    </span>
                    <span className={'ml-2'}><ArrowTopRight/> </span>
                </div>
            </div>
        </div>
    )
}


const Error = () => {
    return (
        <div className={'flex items-center justify-center w-full h-full'}>
            <div className={'flex flex-col mx-auto sm:mt-[10%] sm:w-[560px] sm:p-0 p-3 w-full'}>
                <Image/>
                <div className={'text-green self-center font-urb text-4xl font-bold mt-[60px] leading-tight'}>
                    No wallet has been found.
                </div>
            </div>
        </div>
    )
}
