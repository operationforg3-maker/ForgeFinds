import { StatCard } from "@/components/stat-card";
import { Package, Users, Flame, Activity } from "lucide-react";
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

export default function AdminDashboardPage() {
  const stats = [
    {
      title: "Wszystkie produkty",
      value: "1,254",
      icon: Package,
      description: "+20.1% od ostatniego miesiąca",
    },
    {
      title: "Aktywni użytkownicy",
      value: "832",
      icon: Users,
      description: "+180.1% od ostatniego miesiąca",
    },
    {
      title: "Gorące okazje",
      value: "152",
      icon: Flame,
      description: "+19% od ostatniego miesiąca",
    },
    {
      title: "Aktywność",
      value: "+573",
      icon: Activity,
      description: "+201 od ostatniej godziny",
    },
  ];

  const recentDeals = [
    { user: "Jan Kowalski", deal: "Klawiatura mechaniczna", temp: "450°" },
    { user: "Anna Nowak", deal: "Monitor 4K", temp: "320°" },
    { user: "Piotr Wiśniewski", deal: "Słuchawki bezprzewodowe", temp: "280°" },
  ];

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Ostatnia aktywność</CardTitle>
            <CardDescription>
              Najnowsze dodane okazje przez użytkowników.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Użytkownik</TableHead>
                  <TableHead>Okazja</TableHead>
                  <TableHead className="text-right">Temperatura</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentDeals.map((deal) => (
                  <TableRow key={deal.deal}>
                    <TableCell>
                      <div className="font-medium">{deal.user}</div>
                    </TableCell>
                    <TableCell>{deal.deal}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="destructive">{deal.temp}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
