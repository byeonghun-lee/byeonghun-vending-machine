import MONEY_UNITS from "@/constants/moneyUnits";
import { MoneyInventory } from "@/types/payment";

type RefundResult = {
    [unit: number]: number;
};

interface GetRefundMoneyParams {
    amount: number;
    moneyInventory: MoneyInventory;
}

export const getRefundMoney = ({
    amount,
    moneyInventory,
}: GetRefundMoneyParams): RefundResult => {
    const units = [...MONEY_UNITS].reverse();
    let result = {};
    let found = false;

    const dfs = (
        index: number,
        remaining: number,
        current: RefundResult
    ): void => {
        if (found) return;
        if (remaining === 0) {
            result = { ...result, ...current };
            found = true;
            return;
        }

        if (index >= units.length) return;

        const unit = units[index];
        const maxAvailable = moneyInventory[unit] ?? 0;
        const maxUsable = Math.min(Math.floor(remaining / unit), maxAvailable);

        for (let count = maxUsable; count >= 0; count--) {
            dfs(index + 1, remaining - unit * count, {
                ...current,
                ...(count > 0 ? { [unit]: count } : {}),
            });
        }
    };

    dfs(0, amount, {});
    return result;
};
