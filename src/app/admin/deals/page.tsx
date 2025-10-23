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

export default function AdminDealsPage() {
  const deals = [
    {
      id: 1,
      title: "Zestaw słuchawkowy za pół ceny",
      author: "SuperUser",
      temperature: "678°",
      status: "Aktywna",
    },
    {
      id: 2,
      title: "Gra PC - Przecena 80%",
      author: "GamerPro",
      temperature: "412°",
      status: "Aktywna",
    },
    {
      id: 3,
      title: "Smartfon taniej o 200zł",
      author: "GadgetFan",
      temperature: "-50°",
      status: "Wygasła",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Zarządzanie Okazjami</CardTitle>
        <CardDescription>Przeglądaj i zarządzaj okazjami.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tytuł</TableHead>
              <TableHead className="hidden md:table-cell">Autor</TableHead>
              <TableHead className="hidden md:table-cell">Temperatura</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <span className="sr-only">Akcje</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deals.map((deal) => (
              <TableRow key={deal.id}>
                <TableCell className="font-medium">{deal.title}</TableCell>
                <TableCell className="hidden md:table-cell">{deal.author}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant={deal.temperature.startsWith('-') ? "secondary" : "destructive"}>
                    {deal.temperature}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={deal.status === "Aktywna" ? "outline" : "secondary"}>
                    {deal.status}
                  </Badge>
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
                      <DropdownMenuItem>Zakończ</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Usuń</DropdownMenuItem>
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
