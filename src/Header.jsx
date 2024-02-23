import { Brand } from "./Brand.jsx";
import { useContext } from "react";
import WalletContext from "./WalletContext.jsx";

const Header = () => {
    const { account, provider } = useContext(WalletContext);
    return (
        <header className={'w-full h-20 absolute top-0 left-0 flex items-center justify-center px-10 py-6'}>
            <div className={'flex flex-row items-center justify-between max-w-[1440px] w-full'}>
                <h1 className={'flex flew-row items-center'}>
                    <span> <Brand/> </span>
                    <span className={'text-4xl font-bold ml-4'}> Gentry Testnet </span>
                </h1>
                <div>
                    <span>{account}</span>
                </div>
            </div>
        </header>
    );
}
export default Header
