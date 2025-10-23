import { PageHeader } from "@/components/page-header";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export default function ProductsPage() {
  return (
    <div className="container py-8">
      <PageHeader
        title="Produkty"
        subtitle="Przeglądaj wszystkie dostępne produkty w naszym katalogu."
      />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <aside className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Filtry</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="category">Kategoria</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Wybierz kategorię" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Elektronika</SelectItem>
                    <SelectItem value="clothing">Odzież</SelectItem>
                    <SelectItem value="home">Dom i ogród</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subcategory">Podkategoria</Label>
                <Select>
                  <SelectTrigger id="subcategory">
                    <SelectValue placeholder="Wybierz podkategorię" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="smartphones">Smartfony</SelectItem>
                    <SelectItem value="laptops">Laptopy</SelectItem>
                    <SelectItem value="tvs">Telewizory</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Cena</Label>
                <Slider defaultValue={[250, 750]} max={1000} step={10} />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>250 zł</span>
                  <span>750 zł</span>
                </div>
              </div>
              <Button className="w-full">Filtruj</Button>
            </CardContent>
          </Card>
        </aside>
        <main className="md:col-span-3">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <ProductCard key={i} id={(i + 1).toString()} seed={i + 20} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
