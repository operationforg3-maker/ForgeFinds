import { ProductCard } from "@/components/product-card";
import { DealCard } from "@/components/deal-card";

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <section className="mb-12">
        <h2 className="mb-6 text-3xl font-bold tracking-tight">
          Polecane Produkty
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCard key={i} id={(i + 1).toString()} seed={i + 1} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-3xl font-bold tracking-tight">Gorące Okazje</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <DealCard key={i} id={(i + 1).toString()} seed={i + 10} />
          ))}
        </div>
      </section>
    </div>
  );
}
