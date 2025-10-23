import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Medal, Star, Flame } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DealCard } from "@/components/deal-card";

export default function ProfilePage({
  params,
}: {
  params: { userId: string };
}) {
  const badges = [
    { name: "Początkujący Łowca", icon: Medal, color: "bg-yellow-400" },
    { name: "10 Okazji", icon: Flame, color: "bg-red-500" },
    { name: "Pierwsza Recenzja", icon: Star, color: "bg-blue-500" },
  ];

  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8">
        <CardContent className="flex flex-col items-center gap-6 p-6 text-center md:flex-row md:text-left">
          <Avatar className="h-24 w-24 border-4 border-primary">
            <AvatarImage src="https://picsum.photos/seed/main-avatar/200/200" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <h1 className="text-3xl font-bold">SuperUser{params.userId}</h1>
            <p className="text-muted-foreground">Dołączył 2 miesiące temu</p>
            <div className="mt-4 flex flex-col items-center gap-4 md:flex-row">
              <div className="w-full md:w-1/2">
                <div className="flex justify-between text-sm">
                  <span>Poziom 5</span>
                  <span>1200 / 2000 pkt</span>
                </div>
                <Progress value={60} className="mt-1" />
              </div>
              <div className="flex gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">Okazji</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-sm text-muted-foreground">Recenzji</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Odznaki</h2>
        <div className="flex flex-wrap gap-4">
          {badges.map((badge, index) => (
            <Badge key={index} className="flex h-12 items-center gap-2 rounded-full px-4 text-sm" variant="secondary">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${badge.color}`}>
                <badge.icon className="h-5 w-5 text-white" />
              </div>
              <span>{badge.name}</span>
            </Badge>
          ))}
        </div>
      </div>

      <Tabs defaultValue="deals">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="deals">Dodane okazje</TabsTrigger>
          <TabsTrigger value="reviews">Recenzje</TabsTrigger>
        </TabsList>
        <TabsContent value="deals">
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <DealCard key={i} id={(i + 1).toString()} seed={i + 90} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="reviews">
          <div className="mt-6 space-y-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle>Recenzja Produktu #{i + 1}</CardTitle>
                  <div className="flex items-center">
                    {Array(5).fill(0).map((_, j) => (
                        <Star key={j} className={`h-4 w-4 ${j < 4 ? "fill-yellow-400 text-yellow-400" : "fill-muted-foreground text-muted-foreground"}`}/>
                      ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    "To jest naprawdę świetna recenzja. Bardzo pomocna i dobrze napisana."
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
