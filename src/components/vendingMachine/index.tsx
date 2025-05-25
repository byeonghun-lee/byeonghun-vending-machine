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
            />
            <section className="control-area">
                <div>AD</div>
                <PaymentPanel
                    paymentInfo={paymentInfo}
                    setPaymentInfo={setPaymentInfo}
                    setMoney={setMoney}
                    moneyInventory={moneyInventory}
                />
            </section>
            <section className="outlet-area">
                <p>음료 아웃</p>
            </section>
        </section>
    );
};

export default VendingMachine;
