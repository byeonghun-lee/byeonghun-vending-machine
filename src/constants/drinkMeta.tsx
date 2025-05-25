interface DrinkInfo {
    label: string;
    color: string;
    price: number;
}

type DrinkKey = "coke" | "water" | "coffee";

const DRINK_META: Record<DrinkKey, DrinkInfo> = {
    coke: {
        label: "콜라",
        color: "red",
        price: 1100,
    },
    water: {
        label: "물",
        color: "blue",
        price: 600,
    },
    coffee: {
        label: "커피",
        color: "brown",
        price: 700,
    },
};

export default DRINK_META;
