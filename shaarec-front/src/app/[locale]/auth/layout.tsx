import { FloatingShapes } from "@/components/ui/BackgroundEffects";
import { Logo } from "@/components/layout/Logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-dvh flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
      <FloatingShapes variant="accent" seed="auth" opacity="low" />

      <div className="absolute top-6 start-6 z-10">
        <Logo />
      </div>

      <div className="relative w-full max-w-md">{children}</div>
    </div>
  );
}
