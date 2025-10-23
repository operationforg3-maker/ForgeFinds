import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ExternalLink, Flame } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

export default function DealDetailPage({ params }: { params: { id: string } }) {
  const temperature = Math.floor(Math.random() * 800) + 100;
  const comments = [
    {
      id: 1,
      author: "ŁowcaOkazji_89",
      avatarSeed: "avatar1",
      content: "Dzięki za wstawkę! Właśnie tego szukałem.",
    },
    {
      id: 2,
      author: "Cebulka_PL",
      avatarSeed: "avatar3",
      content: "Kod działa, polecam. Szybka dostawa.",
    },
  ];

  return (
    <div className="container mx-auto max-w-6xl py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="overflow-hidden">
            <Image
              src={`https://picsum.photos/seed/deal-detail-${params.id}/1200/800`}
              alt={`Deal ${params.id}`}
              width={1200}
              height={800}
              className="aspect-video w-full object-cover"
              data-ai-hint="product offer"
            />
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Gorąca Okazja #{params.id}</CardTitle>
              <CardDescription>
                Dodane przez: <span className="text-primary">SuperUser</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button size="lg" className="w-full">
                <ExternalLink className="mr-2 h-4 w-4" />
                Idź do sklepu
              </Button>
              <div>
                <p className="mb-1 text-sm text-muted-foreground">
                  Kod promocyjny
                </p>
                <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-primary bg-primary/10 p-4">
                  <span className="font-mono text-2xl font-bold tracking-widest text-primary">
                    FORGE25
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 pt-4">
                <Button variant="outline" size="icon">
                  <ArrowDown className="h-5 w-5" />
                </Button>
                <div className="flex items-center gap-2 text-2xl font-bold text-destructive">
                  <Flame />
                  <span>{temperature}°</span>
                </div>
                <Button variant="outline" size="icon">
                  <ArrowUp className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="mb-6 text-3xl font-bold">Komentarze</h2>
        <div className="space-y-8">
          <Card>
            <CardContent className="p-4">
                <Textarea placeholder="Dodaj komentarz..." className="mb-4"/>
                <Button>Opublikuj</Button>
            </CardContent>
          </Card>
          {comments.map((comment) => (
            <Card key={comment.id}>
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar>
                  <AvatarImage
                    src={`https://picsum.photos/seed/${comment.avatarSeed}/100/100`}
                  />
                  <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{comment.author}</p>
                  <p className="text-xs text-muted-foreground">2 godziny temu</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{comment.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
