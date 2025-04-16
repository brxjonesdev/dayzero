
import Benefits from '@/shared/components/landing/benefits';
import LandingFeatures from '@/shared/components/landing/features';
import LandingHeader from '@/shared/components/landing/header';
import LandingHero from '@/shared/components/landing/hero';
import ShamelessPlug from '@/shared/components/landing/shameless-plug';

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 space-y-10  ">
      <LandingHeader />
      <LandingHero />
      <LandingFeatures />
      <Benefits />
      <ShamelessPlug />
    </main>
  );
}
