
import Header from "@/src/components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            <main>{children}</main>
        </div>
    );
}