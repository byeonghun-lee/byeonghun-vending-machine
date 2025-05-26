import MONEY_UNITS from "@/constants/moneyUnits";

export const getRefundMoney = ({ amount, moneyInventory }) => {
    const units = [...MONEY_UNITS].reverse();
    let result = {};
    let found = false;

    const dfs = (index, remaining, current) => {
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
