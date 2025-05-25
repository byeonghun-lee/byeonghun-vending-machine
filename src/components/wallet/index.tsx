import "./wallet.scss";

const Wallet = ({
    money = [],
    card,
    setMoney,
    setPaymentInfo,
    paymentInfo,
}) => {
    const attemptPayment = ({ method, value, cardCategory }) => {
        const updatePaymentInfo = {
            paymentMethod: method,
            price: paymentInfo.price,
            cardCategory: null,
        };

        if (method === "money") {
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
            updatePaymentInfo.cardCategory = cardCategory;
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
                                        method: "money",
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
                <button className="edit-money-button">현금 수정</button>
            </div>
            <div className="cards">
                <div className="debit-card">
                    <button
                        className="insert-card-button"
                        disabled={paymentInfo.paymentMethod === "money"}
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
                    <button className="edit-card-button">수정</button>
                </div>
                <div className="credit-card">
                    <button
                        className="insert-card-button"
                        disabled={paymentInfo.paymentMethod === "money"}
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
                    <button className="edit-card-button">수정</button>
                </div>
            </div>
            <p className="desc">
                자판기에 금액을 넣기 위해 동전 또는 지폐를 클릭하거나 카드를
                클릭해주세요.
            </p>
        </section>
    );
};

export default Wallet;
