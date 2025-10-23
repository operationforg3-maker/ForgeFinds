import { PageHeader } from "@/components/page-header";
import { DealCard } from "@/components/deal-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DealsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <PageHeader
          title="Okazje"
          subtitle="Najgorętsze okazje znalezione przez naszą społeczność."
          className="mb-0"
        />
        <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Sortuj po:</span>
            <Select defaultValue="temperature">
                <SelectTrigger className="w-[180px]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="temperature">Temperaturze</SelectItem>
                    <SelectItem value="newest">Najnowsze</SelectItem>
                    <SelectItem value="ending-soon">Kończące się</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </div>

      <main className="mt-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <DealCard key={i} id={(i + 1).toString()} seed={i + 40} />
          ))}
        </div>
      </main>
    </div>
  );
}
