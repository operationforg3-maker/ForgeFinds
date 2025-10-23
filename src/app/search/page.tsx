import { PageHeader } from "@/components/page-header";
import { ProductCard } from "@/components/product-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { DealCard } from "@/components/deal-card";

export default function SearchPage() {
  return (
    <div className="container mx-auto py-8">
      <PageHeader
        title="Wyszukiwarka"
        subtitle="Znajdź interesujące Cię produkty i okazje."
      />
      <div className="mb-8 flex w-full max-w-2xl items-center space-x-2">
        <Input
          type="search"
          placeholder="Czego szukasz?"
          className="h-12 text-lg"
        />
        <Button type="submit" size="lg">
          <SearchIcon className="mr-2 h-5 w-5" /> Szukaj
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <aside className="md:col-span-1">
          <h3 className="mb-4 text-xl font-semibold">Filtry</h3>
          <div className="space-y-4">
            <div className="space-y-2">
                <h4 className="font-medium">Typ</h4>
                <div className="flex items-center space-x-2">
                    <Checkbox id="type-products" defaultChecked />
                    <Label htmlFor="type-products">Produkty</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="type-deals" defaultChecked />
                    <Label htmlFor="type-deals">Okazje</Label>
                </div>
            </div>
            <div className="space-y-2">
                <h4 className="font-medium">Kategoria</h4>
                <div className="flex items-center space-x-2">
                    <Checkbox id="cat-electronics" />
                    <Label htmlFor="cat-electronics">Elektronika</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="cat-gaming" />
                    <Label htmlFor="cat-gaming">Gaming</Label>
                </div>
            </div>
          </div>
        </aside>
        <main className="md:col-span-3">
            <h3 className="mb-4 text-xl font-semibold">Wyniki wyszukiwania (15)</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                    <ProductCard key={`p-${i}`} id={(i + 1).toString()} seed={i + 70} />
                ))}
                {Array.from({ length: 6 }).map((_, i) => (
                    <DealCard key={`d-${i}`} id={(i + 1).toString()} seed={i + 80} />
                ))}
            </div>
        </main>
      </div>
    </div>
  );
}
