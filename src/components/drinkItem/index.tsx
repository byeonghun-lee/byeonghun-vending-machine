"use client";

import "./drinkItem.scss";

interface DrinkItemProps {
    enName: string;
    name: string;
    price: number;
    color?: string;
    disabled: boolean;
    onClick: () => void;
    soldOut: boolean;
}

const DrinkItem = ({
    enName,
    name,
    price,
    color,
    disabled,
    onClick,
    soldOut,
}: DrinkItemProps) => {
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
                {soldOut ? "품절" : "선택"}
            </button>
        </div>
    );
};

export default DrinkItem;
