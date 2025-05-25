"use client";

import DrinkItem from "../drinkItem";

import DRINK_META from "@/constants/drinkMeta";

import "./drinkPanel.scss";

const DrinkPanel = () => {
    return (
        <section className="drink-panel">
            {Object.entries(DRINK_META).map(([key, item], index) => (
                <DrinkItem
                    key={index}
                    enName={key}
                    name={item.label}
                    color={item.color}
                    price={item.price}
                    disabled={false}
                    onClick={() => {}}
                />
            ))}
        </section>
    );
};

export default DrinkPanel;
