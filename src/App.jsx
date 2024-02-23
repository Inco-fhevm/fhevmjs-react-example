import "./App.css";
import { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { getInstance, init } from "./utils/fhevm";
import { toHexString } from "./utils/utils";
import Layout from "./Layout.jsx";
import { WalletContext, WalletProvider } from "./WalletContext.jsx";
import { ConnectWallet } from "./Connect.jsx";
import { Copy } from "./Copy.jsx";

const App = () => {
    const [isInitialized, setIsInitialized] = useState(false);
    console.log("isInitialized", isInitialized);

    useEffect(() => {
        init()
            .then(() => {
                setIsInitialized(true);
            })
            .catch(() => setIsInitialized(false));
    }, []);

    if (!isInitialized) return null;

    return (
        <WalletProvider>
            <MainContent>
                <Utils/>
            </MainContent>
        </WalletProvider>
    );
}

const MainContent = ({ children }) => {
    const { connected, validNetwork } = useContext(WalletContext);
    const connectedToValidNetwork = connected && validNetwork;
    console.log('connected, validNetwork', connected, validNetwork)
    return (
        <Layout>
            {connectedToValidNetwork && children}
            {!connectedToValidNetwork && <ConnectWallet/>}
        </Layout>
    )
}

const groups = [{
    controlId: 'uint8',
    inputLabel: 'uint8',
    outputLabel: 'ciphertext',
    encryptFn: (instance) => instance.encrypt8
}, {
    controlId: 'uint16',
    inputLabel: 'uint16',
    outputLabel: 'ciphertext',
    encryptFn: (instance) => instance.encrypt16
}, {
    controlId: 'uint32',
    inputLabel: 'uint32',
    outputLabel: 'ciphertext',
    encryptFn: (instance) => instance.encrypt32
}]

const Group = (group) => {
    const { controlId, inputLabel, outputLabel, encryptFn } = group;
    const [amount, setAmount] = useState(0);
    const [eamount, setEamount] = useState(0);
    const handleAmountChange = async (event) => {
        setAmount(event.target.value);
        console.log(amount);
        const _instance = await getInstance();
        setEamount(toHexString(encryptFn(_instance)(+event.target.value)));
    };

    const handleCopy = () => {
        if (eamount) {
            navigator.clipboard.writeText("0x" + eamount);
        }
    };

    return (
        <>
            <Form.Group controlId={`${controlId}-input`} className={'flex flex-col sm:flex-row mb-4 sm:items-center items-start sm:w-[750px] w-full'}>
                <Form.Label className={'w-[120px] inline-block sm:mr-5 sm:text-right'}>
                    {inputLabel}
                </Form.Label>
                <Form.Control
                    type="text"
                    value={amount}
                    placeholder="10"
                    onChange={handleAmountChange}
                    className={'flex-1 inline-block h-[70px] min-h-[64px] px-4 mt-2 text-ellipsis border-border rounded border-2 bg-transparent w-full'}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId={`${controlId}-output`} className={'flex flex-col sm:flex-row mb-[60px] sm:items-center items-start sm:w-[750px] w-full relative'}>
                <Form.Label className={'w-[120px] inline-block sm:mr-5 sm:text-right'}>
                    {outputLabel}
                </Form.Label>
                <Form.Control
                    type="text"
                    value={"0x" + eamount}
                    disabled
                    onChange={handleAmountChange}
                    className={'flex-1 inline-block h-[70px] min-h-[64px] pl-4 pr-10 mt-2 text-green text-ellipsis border-border rounded border-2 bg-transparent w-full'}
                >
                </Form.Control>
                <div className={'absolute bottom-[18px] right-[10px] sm:bottom-[20px] hover:cursor-pointer'} onClick={handleCopy}>
                    <Copy/>
                </div>
            </Form.Group>
        </>
    )
}

const Utils = () => {
    return (
        <Form className={'mt-10 sm:px-5 px-3 flex flex-col mx-auto sm:w-fit w-full'}>
            {groups.map((group, index) => {
                    return <Group key={index} {...group} />
                }
            )}
        </Form>
    )
}

export default App;
