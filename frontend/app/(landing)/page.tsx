import { Hero } from "@/components/landing/hero";
import { getRandomQuote } from "@/actions/quotes";

export default async function Home() {
  const quote = await getRandomQuote();

  return (
      <>
          <Hero quote={quote.data} />
      </>
  );
}
