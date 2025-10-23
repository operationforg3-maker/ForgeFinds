import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";

export default function AdminProductsPage() {
  const products = [
    {
      id: 1,
      name: "Klawiatura Pro-Gamer X",
      status: "Aktywny",
      price: "299.99 zł",
      seed: 101,
    },
    {
      id: 2,
      name: "Mysz Ergonomiczna M-200",
      status: "Aktywny",
      price: "149.99 zł",
      seed: 102,
    },
    {
      id: 3,
      name: "Monitor 27' UltraSharp",
      status: "Nieaktywny",
      price: "1299.00 zł",
      seed: 103,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Zarządzanie Produktami</CardTitle>
        <CardDescription>Przeglądaj i zarządzaj produktami.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Nazwa</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Cena</TableHead>
              <TableHead>
                <span className="sr-only">Akcje</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src={`https://picsum.photos/seed/${product.seed}/64/64`}
                    width="64"
                    data-ai-hint="product thumbnail"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  <Badge variant={product.status === "Aktywny" ? "outline" : "secondary"}>
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {product.price}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Akcje</DropdownMenuLabel>
                      <DropdownMenuItem>Edytuj</DropdownMenuItem>
                      <DropdownMenuItem>Usuń</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
