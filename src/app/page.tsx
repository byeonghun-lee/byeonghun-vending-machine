import VendingMachine from "@/components/vendingMachine";
import Wallet from "@/components/wallet";

export default function Home() {
    return (
        <div className="main-wrapper">
            <VendingMachine />
            <Wallet />
        </div>
    );
}
