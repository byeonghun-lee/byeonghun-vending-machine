import DrinkPanel from "../drinkPanel";

import "./vendingMachine.scss";

const VendingMachine = () => {
    return (
        <section className="vending-machine">
            <DrinkPanel />
            <section className="control-area">
                <div>AD</div>
                <div className="panel">
                    <div>
                        <div className="status-screen">000원</div>
                        <div className="paper-money-in-and-out">
                            <button>PAPER IN</button>
                            <p>PAPER OUT</p>
                        </div>
                    </div>
                    <div>
                        <div className="coin-in-and-return-button">
                            <button>return</button>
                            <button>COINT IN</button>
                        </div>
                        <div className="coin-out">
                            <p>COIN OUT</p>
                        </div>
                    </div>
                    <button>설정</button>
                </div>
            </section>
            <section className="outlet-area">
                <p>음료 아웃</p>
            </section>
        </section>
    );
};

export default VendingMachine;
