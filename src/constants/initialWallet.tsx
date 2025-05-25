import MONEY_UNITS from "./moneyUnits";

type MoneyUnits = (typeof MONEY_UNITS)[number];
// type CardType = "debit" | "credit";

type Wallet = {
    money: Record<MoneyUnits, number>;
    card: {
        debit: number;
        credit: boolean;
    };
};

const INIT_WALLET: Wallet = {
    money: {
        100: 10,
        500: 2,
        1000: 5,
        5000: 1,
        10000: 2,
    },
    card: {
        debit: 300,
        credit: true,
    },
};

export default INIT_WALLET;
