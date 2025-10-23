import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DealCardProps {
  id: string;
  seed: number;
}

export function DealCard({ id, seed }: DealCardProps) {
  const temperature = Math.floor(Math.random() * 500) + 50;
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="relative p-0">
        <Link href={`/deals/${id}`}>
          <Image
            src={`https://picsum.photos/seed/${seed}/600/400`}
            alt="Deal image"
            width={600}
            height={400}
            className="aspect-[16/10] w-full object-cover"
            data-ai-hint="product deal"
          />
        </Link>
        <Badge
          variant="destructive"
          className="absolute right-2 top-2 flex items-center gap-1"
        >
          <Flame className="h-4 w-4" />
          <span>{temperature}°</span>
        </Badge>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="mb-2 text-lg leading-tight">
          <Link href={`/deals/${id}`}>Gorąca Okazja #{id}</Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <div className="flex items-baseline gap-2">
          <p className="text-xl font-bold text-destructive">149.99 zł</p>
          <p className="text-sm text-muted-foreground line-through">249.99 zł</p>
        </div>
        <Button asChild variant="secondary">
          <Link href={`/deals/${id}`}>Sprawdź</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
