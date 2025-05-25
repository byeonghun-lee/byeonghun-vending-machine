import MONEY_UNITS from "./moneyUnits";

type MoneyUnits = (typeof MONEY_UNITS)[number];
type DrinkName = "coke" | "water" | "coffee";

type Inventory = {
    money: Record<MoneyUnits, number>;
    drink: Record<DrinkName, number>;
};

const INIT_INVENTORY: Inventory = {
    money: {
        100: 50,
        500: 50,
        1000: 30,
        5000: 30,
        10000: 10,
    },
    drink: {
        coke: 30,
        water: 30,
        coffee: 30,
    },
};

export default INIT_INVENTORY;
