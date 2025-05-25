"use client";

import { useEffect } from "react";

import MONEY_UNITS from "@/constants/moneyUnits";

import "./paymentPanel.scss";

const getRefundMoney = ({ amount, moneyInventory }) => {
    const units = [...MONEY_UNITS].reverse();
    let result = {};
    let found = false;

    const dfs = (index, remaining, current) => {
        if (found) return;
        if (remaining === 0) {
            result = { ...result, ...current };
            found = true;
            return;
        }

        if (index >= units.length) return;

        const unit = units[index];
        const maxAvailable = moneyInventory[unit] ?? 0;
        const maxUsable = Math.min(Math.floor(remaining / unit), maxAvailable);

        for (let count = maxUsable; count >= 0; count--) {
            dfs(index + 1, remaining - unit * count, {
                ...current,
                ...(count > 0 ? { [unit]: count } : {}),
            });
        }
    };

    dfs(0, amount, {});
    return result;
};

const PaymentPanel = ({
    paymentInfo,
    setPaymentInfo,
    setMoney,
    moneyInventory,
}) => {
    const refundAmount = () => {
        const updatedValues = {
            paymentMethod: null,
            price: 0,
        };

        if (paymentInfo.paymentMethod === "money") {
            const refundMoney = getRefundMoney({
                amount: paymentInfo.price,
                moneyInventory,
            });

            setMoney((prev) => {
                const updateValues = { ...prev };
                Object.keys(refundMoney).forEach((moneyKey) => {
                    updateValues[moneyKey] += refundMoney[moneyKey];
                });

                return updateValues;
            });
        }

        setPaymentInfo(updatedValues);
    };

    useEffect(() => {
        if (paymentInfo.errorMessage) {
            const timer = setTimeout(() => {
                setPaymentInfo((prev) => ({
                    ...prev,
                    paymentMethod: null,
                    cardCategory: null,
                    price: 0,
                    errorMessage: null,
                }));
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [paymentInfo.errorMessage]);

    return (
        <div className="payment-panel">
            <div>
                <div className="status-screen">
                    <p>
                        {paymentInfo.paymentMethod === "card"
                            ? "CARD"
                            : paymentInfo.price}
                    </p>
                    <p>{paymentInfo.errorMessage || "거래 가능"}</p>
                </div>
                <div className="paper-money-in-and-out">
                    <button>PAPER IN</button>
                    <p>PAPER OUT</p>
                </div>
            </div>
            <div>
                <div className="coin-in-and-return-button">
                    <button onClick={refundAmount}>return</button>
                    <button>COINT IN</button>
                </div>
                <div className="coin-out">
                    <p>COIN OUT</p>
                </div>
            </div>
            <button>설정</button>
        </div>
    );
};

export default PaymentPanel;
