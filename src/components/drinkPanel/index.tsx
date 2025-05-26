"use client";

import { useEffect, useState } from "react";

import DrinkItem from "../drinkItem";

import { getRefundMoney } from "@/lib/utils/payment";

import DRINK_META from "@/constants/drinkMeta";
import {
    PaymentInfo,
    Card,
    MoneyInventory,
    DrinkInventory,
} from "@/types/payment";

import "./drinkPanel.scss";

interface DrinkPanelProps {
    paymentInfo: PaymentInfo;
    setPaymentInfo: React.Dispatch<React.SetStateAction<PaymentInfo>>;
    card: Card;
    setCard: React.Dispatch<React.SetStateAction<Card>>;
    moneyInventory: MoneyInventory;
    drinkInventory: DrinkInventory;
    setDrinkInventory: React.Dispatch<React.SetStateAction<DrinkInventory>>;
}

const DrinkPanel = ({
    paymentInfo,
    setPaymentInfo,
    card,
    setCard,
    moneyInventory,
    drinkInventory,
    setDrinkInventory,
}: DrinkPanelProps) => {
    const chooseDrink = ({ name, price }: { name: string; price: number }) => {
        if (paymentInfo.paymentMethod === "cash") {
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
                ...(paymentInfo.price - price === 0 && { paymentMethod: null }),
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

            setPaymentInfo((prev) => ({
                ...prev,
                cardCategory: null,
                paymentMethod: null,
            }));
        }

        setDrinkInventory((prev) => ({
            ...prev,
            [name]: prev[name] - 1,
        }));
    };

    useEffect(() => {
        if (
            Object.values(drinkInventory).every(
                (numOfInventory) => numOfInventory === 0
            )
        ) {
            setPaymentInfo((prev) => ({
                ...prev,
                errorMessage: "재고 부족",
            }));
        }
    }, [drinkInventory]);

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
                        soldOut={!drinkInventory[key]}
                        disabled={
                            !drinkInventory[key] ||
                            !paymentInfo.paymentMethod ||
                            (paymentInfo.paymentMethod === "cash" &&
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
