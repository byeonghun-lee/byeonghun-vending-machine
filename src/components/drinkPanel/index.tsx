"use client";

import { useEffect, useState } from "react";

import DrinkItem from "../drinkItem";

import DRINK_META from "@/constants/drinkMeta";
import INIT_INVENTORY from "@/constants/initialInventory";

import { getRefundMoney } from "@/lib/utils/payment";

import "./drinkPanel.scss";

const DrinkPanel = ({
    paymentInfo,
    setPaymentInfo,
    card,
    setCard,
    moneyInventory,
}) => {
    const [inventory, setInventory] = useState(INIT_INVENTORY.drink);

    const chooseDrink = ({ name, price }) => {
        if (paymentInfo.paymentMethod === "money") {
            if (paymentInfo.price < price) {
                return;
            }

            const change = getRefundMoney({
                amount: paymentInfo.price - price,
                moneyInventory,
            });
            const hasChange = paymentInfo.price - price > 0;

            if (hasChange && !Object.keys(change)?.length) {
                setPaymentInfo((prev) => ({
                    ...prev,
                    errorMessage: "잔돈 부족",
                }));
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

    useEffect(() => {
        if (
            Object.values(inventory).every(
                (numOfInventory) => numOfInventory === 0
            )
        ) {
            setPaymentInfo((prev) => ({
                ...prev,
                errorMessage: "재고 부족",
            }));
        }
    }, [inventory]);

    return (
        <section className="drink-panel">
            <div className="drink-view">
                {Object.entries(DRINK_META).map(([key, item], index) => (
                    <DrinkItem
                        key={index}
                        enName={key}
                        name={item.label}
                        color={item.color}
                        price={item.price}
                        soldOut={!inventory[key]}
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
            </div>
        </section>
    );
};

export default DrinkPanel;
