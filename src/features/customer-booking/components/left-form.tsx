"use client";
import {
  ComboBoxOption,
  FormComboBox,
} from "@/components/form-components/form-combobox";
import { FormInput } from "@/components/form-components/form-input";
import { FormTextarea } from "@/components/form-components/form-textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, Crosshair, MapPin, User, Wrench } from "lucide-react";
import { useState } from "react";

export default function LeftForm() {
  const KOTA_OPTIONS: ComboBoxOption[] = [
    { label: "Jakarta", value: "jkt" },
    { label: "Bandung", value: "bdo" },
    { label: "Surabaya", value: "sub" },
    { label: "Yogyakarta", value: "jog" },
    { label: "Bali", value: "dps" },
  ];
  const [kotaPilihan, setKotaPilihan] = useState<string | number | null>(null);
  return (
    <div className="flex w-full flex-col gap-6 lg:w-2/3">
      {/* 1. Card Informasi Pelanggan */}
      <Card className="border-none shadow-sm sm:rounded-2xl">
        <CardContent className="p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3 text-primary">
            <User className="h-5 w-5" />
            <h3 className="text-lg font-bold text-foreground">
              Informasi Pelanggan
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormInput
              className="h-12"
              label="Nama Lengkap"
              name="name"
              type="text"
              placeholder="Masukan nama Teknisi"
              value={"Budi in Bali"}
              onChange={() => console.log("budi")}
              required
            />
            <FormInput
              className="h-12"
              label="Whatsapp"
              name="name"
              type="text"
              placeholder="Masukan nama Teknisi"
              value={"089821213121341"}
              onChange={() => console.log("budi")}
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* 2. Card Detail Layanan */}
      <Card className="border-none shadow-sm sm:rounded-2xl">
        <CardContent className="p-6 sm:p-8 grid grid-cols-1 gap-6">
          <div className="flex items-center gap-3 text-primary">
            <Wrench className="h-5 w-5" />
            <h3 className="text-lg font-bold text-foreground">
              Detail Layanan
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormComboBox
              label="Kategori"
              name="kota"
              placeholder="Cari dan pilih kota..."
              className="h-12"
              options={KOTA_OPTIONS}
              value={kotaPilihan}
              onChange={(val) => setKotaPilihan(val)}
              required
            />
            <FormComboBox
              label="Layanan Spesifik"
              name="kota"
              placeholder="Cari dan pilih kota..."
              className="h-12"
              options={KOTA_OPTIONS}
              value={kotaPilihan}
              onChange={(val) => setKotaPilihan(val)}
              required
            />
          </div>
          <FormTextarea
            label="Catatan Tambahan"
            name="catatan"
            placeholder="Tuliskan instruksi atau pesan khusus di sini..."
            value={"catatan"}
            onChange={(e) => console.log(e.target.value)}
            required={true}
            rows={5}
          />
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm sm:rounded-2xl">
        <CardContent className="p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3 text-primary">
            <MapPin className="h-5 w-5" />
            <h3 className="text-lg font-bold text-foreground">
              Lokasi Pengerjaan
            </h3>
          </div>
          <FormInput
            className="h-12"
            label="Alamat Lengkap"
            name="name"
            type="text"
            placeholder="Masukan nama Teknisi"
            value={"Bali jakarta selatan gianyar"}
            onChange={() => console.log("budi")}
            required
          />

          {/* Mockup Maps (Ganti src dengan image peta aslimu atau integrasi Google Maps) */}
          <div className="mt-4 aspect-[2/1] w-full overflow-hidden rounded-xl bg-slate-200 dark:bg-muted/30">
            <img
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg"
              alt="Map Location"
              className="h-full w-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
