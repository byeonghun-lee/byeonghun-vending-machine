"use client";

import "./drinkItem.scss";

const DrinkItem = ({ enName, name, price, color, disabled, onClick }) => {
    return (
        <div className="drink-item">
            <div
                className="drink-figures"
                style={{ backgroundColor: color || "gray" }}
            >
                <p>{enName.toUpperCase()}</p>
            </div>
            <p className="drink-name">{name}</p>
            <p className="drink-price">
                {price.toLocaleString()}
                <span>원</span>
            </p>
            <button
                className="select-button"
                disabled={disabled}
                onClick={onClick}
            >
                선택
            </button>
        </div>
    );
};

export default DrinkItem;
