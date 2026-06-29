import LandingPage from "@/components/landing/LandingPage";

interface HeroProps {
  isRevealed?: boolean;
}

export default function Hero({ isRevealed = false }: HeroProps) {
  return <LandingPage isRevealed={isRevealed} />;
}