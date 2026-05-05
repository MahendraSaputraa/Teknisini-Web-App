"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { LogOutIcon, Menu, User, Settings, CreditCard } from "lucide-react";
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
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useLogout } from "@/hooks/use-logout";
import { ModeToggle } from "./ui/mode-toggle";

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

  if (!isMounted) {
    return <nav className="sticky top-0 h-16 border-b bg-background" />;
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-primary"
          >
            TekniSini
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
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

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          {!token ? (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" className="rounded-full px-5">
                <Link href="/register">Register</Link>
              </Button>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full bg-muted"
                >
                  <div className="flex h-full w-full items-center justify-center font-semibold text-primary">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <hr className="my-1" />
                <DropdownMenuItem
                  onClick={() => logout()}
                  className="text-destructive cursor-pointer"
                >
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-transparent"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex flex-col w-[300px] sm:w-[350px] px-6"
            >
              <SheetHeader className=" px-0 text-left border-b">
                <SheetTitle className="text-primary font-bold">
                  TekniSini
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-1 ">
                {navLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="flex items-center py-3 text-base font-medium text-foreground/70 transition-colors hover:text-primary"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>

              <div className="mt-auto pb-8 flex flex-col gap-4">
                {token && user ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 border">
                      <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold truncate max-w-[150px]">
                          {user.name}
                        </span>
                        <span className="text-xs text-muted-foreground italic">
                          Member
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      className="w-full justify-start h-11"
                      onClick={() => logout()}
                    >
                      <LogOutIcon className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" asChild className="h-11">
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild className="h-11">
                      <Link href="/register">Register</Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}