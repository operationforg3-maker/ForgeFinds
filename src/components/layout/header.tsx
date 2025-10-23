"use client";

import Link from "next/link";
import { Search, User, Hammer, Menu, LogOut, Settings, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Elektronika",
    href: "/products/electronics",
    description:
      "Najnowsze smartfony, laptopy, komponenty PC i wiele więcej.",
  },
  {
    title: "Gaming",
    href: "/products/gaming",
    description: "Sprzęt i akcesoria dla prawdziwych graczy.",
  },
  {
    title: "Dom i Ogród",
    href: "/products/home-garden",
    description: "Narzędzia i akcesoria, które ułatwią Ci życie.",
  },
  {
    title: "Moda",
    href: "/products/fashion",
    description: "Stylowa odzież i obuwie w najlepszych cenach.",
  },
  {
    title: "Sport i Turystyka",
    href: "/products/sports",
    description: "Sprzęt do ćwiczeń, odzież sportowa i akcesoria podróżne.",
  },
  {
    title: "Zdrowie i Uroda",
    href: "/products/health",
    description: "Kosmetyki, suplementy i urządzenia do pielęgnacji.",
  }
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const mobileNavLinks = (
      <nav className="grid gap-4 text-lg font-medium">
        <Link
          href="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <Hammer className="h-6 w-6" />
          <span>Strona główna</span>
        </Link>
        <Link
          href="/products"
          className="text-muted-foreground hover:text-foreground"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Produkty
        </Link>
        <Link
          href="/deals"
          className="text-muted-foreground hover:text-foreground"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Okazje
        </Link>
      </nav>
  );


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Otwórz menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-4">
              {mobileNavLinks}
            </SheetContent>
          </Sheet>
          <Link href="/" className="ml-2 flex items-center gap-2">
            <Hammer className="h-6 w-6 text-primary" />
            <span className="hidden font-bold font-headline sm:inline-block">ForgeFinder</span>
          </Link>
        </div>

        <div className="hidden flex-1 justify-center md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Produkty</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Wszystkie Produkty
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Przeglądaj pełen katalog zweryfikowanych produktów.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    {components.slice(0, 3).map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/deals" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Okazje
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/search">
              <Search className="h-5 w-5" />
              <span className="sr-only">Szukaj</span>
            </Link>
          </Button>
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                   <AvatarImage src="https://picsum.photos/seed/main-avatar/100/100" alt="@shadcn" />
                   <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">SuperUser</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    user@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile/1"><User className="mr-2" />Profil</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/admin"><LayoutGrid className="mr-2" />Panel Admina</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2" />
                <span>Ustawienia</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2" />
                <span>Wyloguj</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href!}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
