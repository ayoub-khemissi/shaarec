import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="snap-container">
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
