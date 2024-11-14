import Benefits from '@/components/landing/benefits';
import LandingFeatures from '@/components/landing/features';
import LandingHeader from '@/components/landing/header';
import LandingHero from '@/components/landing/hero';
import ShamelessPlug from '@/components/landing/shameless-plug';

export default function Home() {
  return (
    <main className="max-w-[96rem] mx-auto px-4 space-y-10">
      <LandingHeader />
      <LandingHero />
      <LandingFeatures />
      <Benefits />
      <ShamelessPlug />
    </main>
  );
}
