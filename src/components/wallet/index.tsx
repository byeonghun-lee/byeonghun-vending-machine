import {
    PaymentInfo,
    Card,
    MoneyInventory,
    CardCategory,
} from "@/types/payment";

import "./wallet.scss";

interface WalletProps {
    money: [string, number][];
    card: Card;
    setMoney: React.Dispatch<React.SetStateAction<MoneyInventory>>;
    setPaymentInfo: React.Dispatch<React.SetStateAction<PaymentInfo>>;
    paymentInfo: PaymentInfo;
}

const Wallet = ({
    money = [],
    card,
    setMoney,
    setPaymentInfo,
    paymentInfo,
}: WalletProps) => {
    const attemptPayment = ({
        method,
        value,
        cardCategory,
    }: {
        method: "cash" | "card";
        value?: number;
        cardCategory?: CardCategory;
    }) => {
        const updatePaymentInfo: PaymentInfo = {
            paymentMethod: method,
            price: paymentInfo.price,
            cardCategory: null,
            errorMessage: null,
        };

        if (method === "cash") {
            setMoney((prev) => {
                const updateValues = { ...prev };
                const targetMoney = money.find(
                    (item) => item[0] === value.toString()
                );

                updateValues[value] = targetMoney[1] - 1;
                return updateValues;
            });

            updatePaymentInfo.price += value;
        } else {
            updatePaymentInfo.price = 0;
            updatePaymentInfo.cardCategory = cardCategory || null;
        }

        setPaymentInfo(updatePaymentInfo);
    };

    return (
        <section className="wallet">
            <div className="money">
                <ol className="money-list">
                    {money.map(([moneyItem, numOfMoney], index) => (
                        <li key={index}>
                            <button
                                className={`insert-money-button ${
                                    Number(moneyItem) < 1000
                                        ? "coin"
                                        : "paper-money"
                                }`}
                                disabled={
                                    paymentInfo.paymentMethod === "card" ||
                                    !numOfMoney
                                }
                                onClick={() => {
                                    attemptPayment({
                                        method: "cash",
                                        value: Number(moneyItem),
                                    });
                                }}
                            >
                                {moneyItem}
                            </button>
                            <p>{numOfMoney}개</p>
                        </li>
                    ))}
                </ol>
            </div>
            <div className="cards">
                <div className="debit-card">
                    <button
                        className="insert-card-button"
                        disabled={paymentInfo.paymentMethod === "cash"}
                        onClick={() => {
                            attemptPayment({
                                method: "card",
                                cardCategory: "debit",
                            });
                        }}
                    >
                        체크카드
                    </button>
                    <p>{card?.debit}</p>
                </div>
                <div className="credit-card">
                    <button
                        className="insert-card-button"
                        disabled={paymentInfo.paymentMethod === "cash"}
                        onClick={() => {
                            attemptPayment({
                                method: "card",
                                cardCategory: "credit",
                            });
                        }}
                    >
                        신용카드
                    </button>
                    <p>거래 {card?.credit ? "가능" : "불가"}</p>
                </div>
            </div>
            <ul>
                <li>
                    * 자판기에 금액을 넣기 위해 동전 또는 지폐를 클릭하거나
                    카드를 클릭해주세요.
                </li>
                <li>* 돈을 돌려받기 위해선 return 버튼을 눌러주세요.</li>
                <li>
                    * 설정 버튼을 눌러 현재 자판기의 잔돈과 음료 재고를 볼 수
                    있습니다.
                </li>
            </ul>
        </section>
    );
};

export default Wallet;
