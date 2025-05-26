"use client";

import { useState } from "react";

import DrinkPanel from "../drinkPanel";
import PaymentPanel from "../paymentPanel";

import INIT_INVENTORY from "@/constants/initialInventory";

import "./vendingMachine.scss";

const VendingMachine = ({
    paymentInfo,
    setPaymentInfo,
    setMoney,
    card,
    setCard,
}) => {
    const [moneyInventory, setMoneyInventory] = useState(INIT_INVENTORY.money);

    return (
        <section className="vending-machine">
            <DrinkPanel
                paymentInfo={paymentInfo}
                setPaymentInfo={setPaymentInfo}
                card={card}
                setCard={setCard}
                moneyInventory={moneyInventory}
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
                />
            </section>
            <section className="outlet-area">
                <div className="outlet-inside"/>
            </section>
        </section>
    );
};

export default VendingMachine;
