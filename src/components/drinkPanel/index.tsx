"use client";

import { useState } from "react";

import DrinkItem from "../drinkItem";

import DRINK_META from "@/constants/drinkMeta";
import INIT_INVENTORY from "@/constants/initialInventory";

import "./drinkPanel.scss";

const DrinkPanel = ({ paymentInfo, setPaymentInfo, card, setCard }) => {
    const [inventory, setInventory] = useState(INIT_INVENTORY.drink);

    const chooseDrink = ({ name, price }) => {
        if (paymentInfo.paymentMethod === "money") {
            if (paymentInfo.price < price) {
                return;
            }

            setPaymentInfo((prev) => ({
                ...prev,
                price: prev.price - price,
            }));
        } else {
            if (paymentInfo.cardCategory === "debit") {
                if (card.debit < price) {
                    setPaymentInfo((prev) => ({
                        ...prev,
                        errorMessage: "잔액 부족",
                    }));
                    return;
                } else {
                    setCard((prev) => ({
                        ...prev,
                        debit: prev.debit - price,
                    }));
                }
            } else {
                if (!card.credit) {
                    setPaymentInfo((prev) => ({
                        ...prev,
                        errorMessage: "거래 불가 카드",
                    }));
                    return;
                }
            }
        }

        setInventory((prev) => ({
            ...prev,
            [name]: prev[name] - 1,
        }));
    };

    return (
        <section className="drink-panel">
            {Object.entries(DRINK_META).map(([key, item], index) => (
                <DrinkItem
                    key={index}
                    enName={key}
                    name={item.label}
                    color={item.color}
                    price={item.price}
                    disabled={
                        !inventory[key] ||
                        !paymentInfo.paymentMethod ||
                        (paymentInfo.paymentMethod === "money" &&
                            paymentInfo.price < item.price)
                    }
                    onClick={() =>
                        chooseDrink({ name: key, price: item.price })
                    }
                />
            ))}
        </section>
    );
};

export default DrinkPanel;
