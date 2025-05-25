"use client";

import { useState } from "react";

import VendingMachine from "@/components/vendingMachine";
import Wallet from "@/components/wallet";

import INIT_INVENTORY from "@/constants/initialInventory";
import INIT_WALLET from "@/constants/initialWallet";

export default function Home() {
    const [money, setMoney] = useState(INIT_WALLET.money);
    const [card, setCard] = useState(INIT_WALLET.card);

    return (
        <div className="main-wrapper">
            <VendingMachine />
            <Wallet money={Object.entries(money)} card={card} />
        </div>
    );
}
