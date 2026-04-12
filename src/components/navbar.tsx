"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { LogOutIcon, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { useLogout } from "@/hooks/use-logout";

const navLinks = [
  { title: "Services", href: "#" },
  { title: "Pricing", href: "#" },
  { title: "How it Works", href: "#" },
];

export default function Navbar({ user }: any) {
  const { mutate: logout } = useLogout();
  const token = Cookies.get("access_token");

   const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Render minimal saat SSR
  if (!isMounted) {
    return <nav className="sticky top-0">Loading...</nav>;
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex lg:w-2/12 items-center gap-2">
          <Link href="/" className="text-xl font-bold text-primary">
            TekniSini
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.title}
            </Link>
          ))}
        </div>

        {/* Action Buttons (Desktop) */}
        {!token && (
          <div className="hidden  lg:w-2/12 md:flex justify-end items-center gap-4">
            <Button variant="ghost" className="rounded-full" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button className="rounded-full px-6 bg-primary hover:bg-primary/90">
              <Link href="/register">Register</Link>
            </Button>
          </div>
        )}

        {token && user && (
          <div className="hidden md:flex lg:w-2/12 justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 px-3 py-2 rounded-full hover:bg-muted transition">
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>

                  {/* Name */}
                  <span className="text-sm font-medium text-foreground">
                    {user.name}
                  </span>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={() => logout()}
                  className="active:bg-slate-200 !hover:bg-slate-200 text-destructive cursor-pointer"
                >
                  <LogOutIcon />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* Mobile Navigation (Hamburger) */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle className="text-left text-primary mb-4">
                TekniSini
              </SheetTitle>
              <div className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="text-lg font-medium hover:text-primary"
                  >
                    {link.title}
                  </Link>
                ))}
                <hr className="my-2" />
                <Button variant="outline" asChild className="w-full">
                  <Link href="/login">Login</Link>
                </Button>
                <Button className="w-full rounded-full" asChild>
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
