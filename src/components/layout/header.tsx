"use client";

import Link from "next/link";
import { Search, User, Hammer, Menu } from "lucide-react";
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
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-4">
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
            <SheetContent side="left">
              {mobileNavLinks}
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2">
            <Hammer className="h-6 w-6 text-primary" />
            <span className="hidden font-bold font-headline sm:inline-block">ForgeFinder</span>
          </Link>
        </div>

        <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
                <NavigationMenuItem>
                <NavigationMenuTrigger>Produkty</NavigationMenuTrigger>
                <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {components.map((component) => (
                        <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                        >
                        {component.description}
                        </ListItem>
                    ))}
                    </div>
                </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/deals" passHref>
                        <NavigationMenuLink asChild>
                            <a className={navigationMenuTriggerStyle()}>Okazje</a>
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>


        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/search">
              <Search className="h-5 w-5" />
              <span className="sr-only">Szukaj</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/profile/1">
              <User className="h-5 w-5" />
              <span className="sr-only">Profil</span>
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
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
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
