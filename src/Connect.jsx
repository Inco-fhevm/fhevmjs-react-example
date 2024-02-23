import React, { useContext } from "react";
import WalletContext from "./WalletContext.jsx";


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

const Connect = () => {
    const {
        connect
    } = useContext(WalletContext);

    return (
        <div className={'flex items-center justify-center w-full h-full'}>
            <div className={'flex flex-col mx-auto sm:mt-[10%] sm:w-[560px] sm:p-0 p-3 w-full'}>
                <div className={'m-auto w-[420px] h-[240px]'}>
                    <img src={'./mosaic.png'} alt={'hero'} className={''}/>
                </div>
                <button className={'w-full px-8 py-4 mt-[60px]'} onClick={connect}>
                    Connect your wallet
                </button>
                <div className={'mt-10 self-center'}>
                    Add Inco Testnet <span> </span>
                </div>
            </div>
        </div>
    )
}

const SwitchNetwork = () => {
    // if (!connecting && !validNetwork) {
    //     return (
    //         <div>
    //             <p>You're not on the correct network</p>
    //             <p>
    //                 <button className="Connect__button" onClick={switchNetwork}>
    //                     Switch to Inco Gentry Testnet
    //                 </button>
    //             </p>
    //         </div>
    //     );
    // }
    return (
        <> </>
    )
}


const Error = () => {
    return (
        <div>
            No wallet has been found.
        </div>
    )
}
