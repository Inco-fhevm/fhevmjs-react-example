import { Brand } from "./Brand.jsx";
import { useContext } from "react";
import WalletContext from "./WalletContext.jsx";

const formatAddressLong = (address) => {
    return address.slice(0, 6) + "..." + address.slice(-6);
}

const formatAddressShort = (address) => {
    return "..." + address.slice(-6);
}

const Account = ({ account }) => {
    return (
        <>
            <div className={'sm:hidden h-[40px] px-4 py-2 border-2 rounded border-border'}>
                <span>{formatAddressShort(account)}</span>
            </div>
            <div className={'hidden sm:block h-[40px]  px-4 py-2 border-2 rounded border-border'}>
                <span>{formatAddressLong(account)}</span>
            </div>
        </>
    )
}

const Header = () => {
    const { account } = useContext(WalletContext);
    return (
        <header className={'w-full h-20 absolute top-0 left-0 flex items-center justify-center sm:px-10 sm:py-6 p-4'}>
            <div className={'flex flex-row items-center justify-between max-w-[1440px] w-full'}>
                <h1 className={'flex flew-row items-center'}>
                    <span className={'sm:h-[40px] h-[24px]'}> <Brand/> </span>
                    <span className={'sm:text-4xl text-base font-bold ml-4'}> Gentry Testnet </span>
                </h1>
                {account && <Account account={account}/>}
            </div>
        </header>
    );
}
export default Header
