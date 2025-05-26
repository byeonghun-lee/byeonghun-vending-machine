"use client";

import { useState } from "react";

import VendingMachine from "@/components/vendingMachine";
import Wallet from "@/components/wallet";

import INIT_WALLET from "@/constants/initialWallet";
import { Money, Card, PaymentInfo } from "@/types/payment";

export default function Home() {
    const [money, setMoney] = useState<Money>(INIT_WALLET.money);
    const [card, setCard] = useState<Card>(INIT_WALLET.card);
    const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
        paymentMethod: null,
        price: 0,
        cardCategory: null,
        errorMessage: null,
    });

    return (
        <div className="main-wrapper">
            <VendingMachine
                paymentInfo={paymentInfo}
                setPaymentInfo={setPaymentInfo}
                setMoney={setMoney}
                card={card}
                setCard={setCard}
            />
            <Wallet
                money={Object.entries(money)}
                card={card}
                setMoney={setMoney}
                setPaymentInfo={setPaymentInfo}
                paymentInfo={paymentInfo}
            />
        </div>
    );
}
