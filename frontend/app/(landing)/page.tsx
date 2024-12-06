import { Hero } from "@/components/landing/hero";
import { Divider } from "@/components/landing/ui/divider";
import { CtaCard } from "@/components/landing/cta-card";

export default function Home() {
  return (
      <>
          <Hero />
          <Divider />
          <CtaCard />
          <Divider />
      </>
  );
}
