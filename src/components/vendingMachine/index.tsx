"use client";

import { useState } from "react";

import DrinkPanel from "../drinkPanel";
import PaymentPanel from "../paymentPanel";

import INIT_INVENTORY from "@/constants/initialInventory";
import {
    Card,
    PaymentInfo,
    MoneyInventory,
    DrinkInventory,
} from "@/types/payment";

import "./vendingMachine.scss";

interface VendingMachineProps {
    paymentInfo: PaymentInfo;
    setPaymentInfo: React.Dispatch<React.SetStateAction<PaymentInfo>>;
    setMoney: React.Dispatch<React.SetStateAction<MoneyInventory>>;
    card: Card;
    setCard: React.Dispatch<React.SetStateAction<Card>>;
}

const VendingMachine = ({
    paymentInfo,
    setPaymentInfo,
    setMoney,
    card,
    setCard,
}: VendingMachineProps) => {
    const [moneyInventory, setMoneyInventory] = useState<MoneyInventory>(
        INIT_INVENTORY.money
    );
    const [drinkInventory, setDrinkInventory] = useState<DrinkInventory>(
        INIT_INVENTORY.drink
    );

    return (
        <section className="vending-machine">
            <DrinkPanel
                paymentInfo={paymentInfo}
                setPaymentInfo={setPaymentInfo}
                card={card}
                setCard={setCard}
                moneyInventory={moneyInventory}
                drinkInventory={drinkInventory}
                setDrinkInventory={setDrinkInventory}
            />
            <section className="control-area">
                <div className="ad-area">
                    <h1>자판기 구현 과제</h1>
                    <div>
                        <p>문의: byeonghun08@gmail.com</p>
                        <p>이병훈</p>
                    </div>
                </div>
                <PaymentPanel
                    paymentInfo={paymentInfo}
                    setPaymentInfo={setPaymentInfo}
                    setMoney={setMoney}
                    moneyInventory={moneyInventory}
                    setMoneyInventory={setMoneyInventory}
                    drinkInventory={drinkInventory}
                />
            </section>
            <section className="outlet-area">
                <div className="outlet-inside" />
            </section>
        </section>
    );
};

export default VendingMachine;
