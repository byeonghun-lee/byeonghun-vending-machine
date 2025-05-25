import "./wallet.scss";

const Wallet = () => {
    return (
        <section className="wallet">
            <div className="money">
                <ol>
                    <li>
                        <button>500</button>
                        <p>1</p>
                    </li>
                </ol>
                <button>수정</button>
            </div>
            <div className="cards">
                <div className="debit-card">
                    <button>체크카드</button>
                    <p>1000</p>
                    <button>수정</button>
                </div>
                <div className="credit-card">
                    <button>신용카드</button>
                    <p>거래 가능/불가능</p>
                    <button>수정</button>
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
