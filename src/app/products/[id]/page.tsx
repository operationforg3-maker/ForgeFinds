import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ShieldCheck,
  Star,
  Gem,
  Wrench,
  GanttChartSquare,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PriceHistoryChart } from "@/components/price-history-chart";
import { Progress } from "@/components/ui/progress";

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const attributes = [
    { name: "Trwałość", value: 4, icon: ShieldCheck },
    { name: "Jakość/Cena", value: 5, icon: Gem },
    { name: "Łatwość użycia", value: 3, icon: Wrench },
    { name: "Wszechstronność", value: 4, icon: GanttChartSquare },
  ];

  const reviews = [
    {
      id: 1,
      author: "Jan Kowalski",
      avatarSeed: "avatar1",
      rating: 5,
      content:
        "Świetny produkt! Spełnił wszystkie moje oczekiwania. Jakość wykonania na najwyższym poziomie.",
    },
    {
      id: 2,
      author: "Anna Nowak",
      avatarSeed: "avatar2",
      rating: 4,
      content:
        "Dobry stosunek jakości do ceny. Jedyny minus to brak jednej funkcji, ale ogólnie jestem zadowolona.",
    },
  ];

  return (
    <div className="container max-w-6xl py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <Card className="overflow-hidden">
            <Image
              src={`https://picsum.photos/seed/product-detail-${params.id}/800/600`}
              alt={`Product ${params.id}`}
              width={800}
              height={600}
              className="aspect-video w-full object-cover"
              data-ai-hint="detailed product"
            />
          </Card>
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Przykładowy Produkt #{params.id}
          </h1>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Elektronika</Badge>
            <Badge variant="outline">Nowość</Badge>
          </div>
          <p className="text-lg text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-4xl font-bold text-primary">199.99 zł</p>
            <p className="text-xl text-muted-foreground line-through">
              299.99 zł
            </p>
          </div>
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
            <ShieldCheck className="h-5 w-5" />
            <span className="font-semibold">Zweryfikowany przez Forge</span>
          </div>
          <Button size="lg" className="w-full">
            Dodaj do koszyka
          </Button>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PriceHistoryChart />
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Karta Gracza</CardTitle>
              <CardDescription>
                Atrybuty produktu ocenione przez społeczność.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {attributes.map((attr) => (
                <div key={attr.name}>
                  <div className="mb-1 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <attr.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{attr.name}</span>
                    </div>
                    <span className="text-sm font-bold">{attr.value}/5</span>
                  </div>
                  <Progress value={attr.value * 20} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="mb-6 text-3xl font-bold">Recenzje</h2>
        <div className="space-y-8">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src={`https://picsum.photos/seed/${review.avatarSeed}/100/100`}
                    />
                    <AvatarFallback>
                      {review.author.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{review.author}</p>
                    <div className="flex items-center">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-muted-foreground text-muted-foreground"
                            }`}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{review.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
