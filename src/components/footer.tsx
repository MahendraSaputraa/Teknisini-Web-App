import Link from "next/link";
import { Globe, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background pt-12 pb-8">
      {/* Menggunakan container agar sejajar dengan Navbar */}
      <div className="container mx-auto px-4">
        
        {/* Grid layout: 1 kolom di mobile, 4 kolom di layar besar */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:gap-12">
          
          {/* Kolom 1: Brand & Deskripsi */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-foreground">TekniSini</h2>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Digital Concierge for Technical Excellence. Menghubungkan Anda dengan keahlian teknis terbaik.
            </p>
          </div>

          {/* Kolom 2: Navigasi */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-foreground">Navigasi</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Technical Briefs
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Dukungan */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-foreground">Dukungan</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Temukan Kami & Copyright */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-foreground">Temukan Kami</h3>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <Link 
                href="#" 
                className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Globe className="h-5 w-5" />
              </Link>
              <Link 
                href="#" 
                className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
            
            {/* Copyright */}
            <p className="mt-4 text-xs text-muted-foreground md:mt-8">
              © 2024 TekniSini. The Digital Concierge for Technical Excellence.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}