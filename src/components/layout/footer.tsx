import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {year} ForgeFinder. Wszelkie prawa zastrzeżone.
        </p>
        <nav className="flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-sm hover:underline underline-offset-4"
            prefetch={false}
          >
            O nas
          </Link>
          <Link
            href="#"
            className="text-sm hover:underline underline-offset-4"
            prefetch={false}
          >
            Kontakt
          </Link>
          <Link
            href="#"
            className="text-sm hover:underline underline-offset-4"
            prefetch={false}
          >
            Polityka Prywatności
          </Link>
        </nav>
      </div>
    </footer>
  );
}
