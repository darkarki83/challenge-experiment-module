import React, { useState, useEffect } from "react";
import { connectMetamask, checkIfWalletIsConnect } from "../Utils/connectMetamask";

export default function ConnectWallet() {
    // State to store the connected account address
    const [account, setAccount] = useState(null);

    // Function to handle wallet connection
    const handleConnect = async () => {
        // Check if MetaMask is installed
        if (typeof window.ethereum === "undefined") {
            alert("No Metamask detected. Please install Metamask to continue.");
            return;
        }

        try {
            // Connect to MetaMask using the utility function
            const { signer } = await connectMetamask();
            // Get the user's wallet address
            const address = await signer.getAddress();
            // Save the address into the state
            setAccount(address);
        } catch (error) {
            console.error("Error connecting wallet:", error);
            alert("Failed to connect wallet.");
        }
    };

    // When the component mounts, check if the wallet is already connected
    useEffect(() => {
        if (typeof window.ethereum !== "undefined") {
            checkIfWalletIsConnect(setAccount);
        }
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            {/* Button to connect the wallet */}
            <button onClick={handleConnect}>
                {account
                    ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
                    : "Connect Wallet"}
            </button>
        </div>
    );
}
