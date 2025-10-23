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

interface ProductCardProps {
  id: string;
  seed: number;
}

export function ProductCard({ id, seed }: ProductCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/products/${id}`}>
          <Image
            src={`https://picsum.photos/seed/${seed}/600/400`}
            alt="Product image"
            width={600}
            height={400}
            className="aspect-video w-full object-cover"
            data-ai-hint="product image"
          />
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="mb-2 text-lg leading-tight">
          <Link href={`/products/${id}`}>Przykładowy Produkt #{id}</Link>
        </CardTitle>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <p className="text-xl font-bold">199.99 zł</p>
        <Button asChild>
          <Link href={`/products/${id}`}>Zobacz</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
