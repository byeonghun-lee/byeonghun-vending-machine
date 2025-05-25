import "./wallet.scss";

const Wallet = ({ money = [], card }) => {
    return (
        <section className="wallet">
            <div className="money">
                <ol className="money-list">
                    {money.map(([moneyItem, numOfMoney], index) => (
                        <li key={index}>
                            <button
                                className={`insert-money-button ${
                                    moneyItem < 1000 ? "coin" : "paper-money"
                                }`}
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
                    <button className="insert-card-button">체크카드</button>
                    <p>{card?.debit}</p>
                    <button className="edit-card-button">수정</button>
                </div>
                <div className="credit-card">
                    <button className="insert-card-button">신용카드</button>
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
