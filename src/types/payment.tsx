// 각 돈 단위별 개수를 나타내는 타입
export type Money = {
    [unit: number]: number;
};

// 카드 정보 타입
export type Card = {
    credit: boolean;
    debit: number;
};

// 결제 정보 타입
export type PaymentInfo = {
    paymentMethod: "cash" | "card" | null;
    price: number;
    cardCategory: "credit" | "debit" | null;
    errorMessage: string | null;
};

// 자판기 현금 타입
export type MoneyInventory = {
    [unit: number]: number;
};

// 자판기 재고 타입
export type DrinkInventory = {
    [drinkName: string]: number;
};

// 카드 카테고리 타입
export type CardCategory = "credit" | "debit" | null;
