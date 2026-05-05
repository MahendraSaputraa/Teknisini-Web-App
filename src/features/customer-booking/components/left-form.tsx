"use client";

import {
  ComboBoxOption,
  FormComboBox,
} from "@/components/form-components/form-combobox";
import { FormInput } from "@/components/form-components/form-input";
import { FormTextarea } from "@/components/form-components/form-textarea";
import { Card, CardContent } from "@/components/ui/card";
import { User, Wrench, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const MapPicker = dynamic(() => import("./map-picker"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-200 dark:bg-muted/30 animate-pulse flex items-center justify-center text-slate-400">
      Memuat Peta...
    </div>
  ),
});

export default function LeftForm() {
  const [name, setName] = useState("Budi in Bali");
  const [whatsapp, setWhatsapp] = useState("089821213121341");

  const DUMMY_OPTIONS: ComboBoxOption[] = [
    { label: "Opsi 1", value: "opt1" },
    { label: "Opsi 2", value: "opt2" },
  ];
  const [kategori, setKategori] = useState<string | number | null>(null);
  const [layananSpesifik, setLayananSpesifik] = useState<
    string | number | null
  >(null);
  const [catatan, setCatatan] = useState("");

  const [location, setLocation] = useState({ lat: -8.65, lng: 115.216667 });
  const [alamatText, setAlamatText] = useState(
    "Geser pin pada peta untuk menentukan lokasi...",
  );

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        setAlamatText("Mencari alamat...");
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lng}`,
        );
        const data = await res.json();
        if (data && data.display_name) {
          setAlamatText(data.display_name);
        } else {
          setAlamatText(
            "Alamat tidak ditemukan. Pastikan pin berada di lokasi yang valid.",
          );
        }
      } catch (error) {
        console.error("Gagal mendapatkan alamat:", error);
        setAlamatText("Gagal mengambil alamat otomatis.");
      }
    };

    const timeoutId = setTimeout(() => fetchAddress(), 800); // debounce 800ms biar nggak spam API
    return () => clearTimeout(timeoutId);
  }, [location.lat, location.lng]);

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
              placeholder="Masukan nama pelanggan"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <FormInput
              className="h-12"
              label="Whatsapp"
              name="whatsapp"
              type="text"
              placeholder="Masukan nomor Whatsapp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
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
              name="kategori"
              placeholder="Pilih kategori layanan..."
              className="h-12"
              options={DUMMY_OPTIONS}
              value={kategori}
              onChange={(val) => setKategori(val)}
              required
            />
            <FormComboBox
              label="Layanan Spesifik"
              name="layananSpesifik"
              placeholder="Pilih layanan spesifik..."
              className="h-12"
              options={DUMMY_OPTIONS}
              value={layananSpesifik}
              onChange={(val) => setLayananSpesifik(val)}
              required
            />
          </div>
          <FormTextarea
            label="Catatan Tambahan"
            name="catatan"
            placeholder="Tuliskan instruksi atau pesan khusus di sini..."
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
            required={true}
            rows={5}
          />
        </CardContent>
      </Card>

      {/* 3. Card Lokasi Pengerjaan */}
      <Card className="border-none shadow-sm sm:rounded-2xl">
        <CardContent className="p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3 text-primary">
            <MapPin className="h-5 w-5" />
            <h3 className="text-lg font-bold text-foreground">
              Lokasi Pengerjaan
            </h3>
          </div>

          <FormInput
            className="h-12 bg-slate-50 dark:bg-slate-900 text-slate-500"
            label={`Alamat Lengkap (Lat: ${location.lat.toFixed(5)}, Lng: ${location.lng.toFixed(5)})`}
            name="alamat"
            type="text"
            placeholder="Mencari alamat..."
            value={alamatText}
            onChange={() => {}} // Sengaja dikosongkan karena readonly
            readOnly={true}
            required
          />

          <div className="mt-4 w-full overflow-hidden rounded-xl   relative z-0">
            <MapPicker position={location} onPositionChange={setLocation} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}