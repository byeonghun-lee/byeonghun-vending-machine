"use client";

import { useEffect } from "react";

import { getRefundMoney } from "@/lib/utils/payment";

import "./paymentPanel.scss";

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
        if (
            paymentInfo.errorMessage &&
            paymentInfo.errorMessage !== "잔돈 부족"
        ) {
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
                    <p className="amount-paymnet">
                        {paymentInfo.paymentMethod === "card"
                            ? "CARD"
                            : paymentInfo.price}
                    </p>
                    <p>{paymentInfo.errorMessage || "거래 가능"}</p>
                </div>
                <div className="paper-money-in-and-out">
                    <div className="money-exit">
                        <span>지폐</span>
                    </div>
                </div>
            </div>
            <div className="coin-area">
                <div className="coin-in-and-return-button">
                    <button className="return-button" onClick={refundAmount}>
                        return
                    </button>
                    <div className="coin-in-wrapper">
                        <div className="coin-in" />
                    </div>
                </div>
                <div className="coin-out" />
            </div>
            <button className="setting-button">
                <div className="key-wrapper">
                    <div className="key-in" />
                </div>
                <p>설정</p>
            </button>
        </div>
    );
};

export default PaymentPanel;
