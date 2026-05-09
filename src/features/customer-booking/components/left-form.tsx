"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { User, Wrench, MapPin } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { FormInput } from "@/components/form-components/form-input";
import { FormTextarea } from "@/components/form-components/form-textarea";
import {
  FormComboBox,
  ComboBoxOption,
} from "@/components/form-components/form-combobox";

const MapPicker = dynamic(() => import("./map-picker"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-200 dark:bg-muted/30 animate-pulse flex items-center justify-center text-slate-400">
      Memuat Peta...
    </div>
  ),
});

const DUMMY_OPTIONS: ComboBoxOption[] = [
  { label: "Opsi 1", value: "opt1" },
  { label: "Opsi 2", value: "opt2" },
];

export default function LeftForm({
  setFormData,
  formData,
  optionsCategory,
  optionsService,
}: any) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const fetchAddress = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${formData.location.lat}&lon=${formData.location.lng}`,
        );
        const data = await res.json();
        if (data?.display_name) {
          setFormData((prev: any) => ({ ...prev, address: data.display_name }));
        }
      } catch (e) {
        console.error("Gagal mengambil alamat:", e);
      }
    };

    const timeout = setTimeout(fetchAddress, 800);
    return () => clearTimeout(timeout);
  }, [formData.location.lat, formData.location.lng, isMounted]);

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
              name="name" // WAJIB DIISI
              className="h-12"
              label="Nama Lengkap"
              placeholder="Masukan nama pelanggan"
              value={formData.name}
              onChange={(e) =>
                setFormData((p: any) => ({ ...p, name: e.target.value }))
              }
              required
            />
            <FormInput
              name="user_phone" // WAJIB DIISI
              className="h-12"
              label="Nomor Telepon"
              placeholder="Masukan nomor Telepon"
              value={formData.user_phone}
              onChange={(e) =>
                setFormData((p: any) => ({ ...p, user_phone: e.target.value }))
              }
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
              name="category_id" // WAJIB DIISI
              label="Kategori"
              placeholder="Pilih kategori..."
              options={optionsCategory}
              value={formData.category_id}
              onChange={(opt) =>
                setFormData((p: any) => ({
                  ...p,
                  category_id: opt ? String(opt.value) : "",
                  service_name: "",
                }))
              }
              required
            />
            <FormComboBox
              name="service_id" // WAJIB DIISI
              label="Layanan Spesifik"
              placeholder="Pilih layanan..."
              options={optionsService}
              value={formData.service_id}
              onChange={(opt) =>
                setFormData((p: any) => ({
                  ...p,
                  service_name: opt ? String(opt.label) : "",
                  service_id: opt ? String(opt.value) : "",
                  price_service: opt
                    ? (optionsService?.find(
                        (item: any) => item.value === opt.value,
                      )?.price ?? 0)
                    : 0,
                }))
              }
              required
              disabled={!formData?.category_id}
            />
          </div>
          <FormTextarea
            name="notes" // WAJIB DIISI
            label="Catatan Tambahan"
            placeholder="Tuliskan instruksi khusus di sini..."
            value={formData.notes}
            onChange={(e) =>
              setFormData((p: any) => ({ ...p, notes: e.target.value }))
            }
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
            name="address" // WAJIB DIISI
            className="h-12 bg-slate-50 dark:bg-slate-900 text-slate-500"
            label={`Alamat (Lat: ${formData.location.lat.toFixed(5)}, Lng: ${formData.location.lng.toFixed(5)})`}
            value={formData.address}
            readOnly
            required
          />

          <div className="mt-4 h-[350px] w-full overflow-hidden rounded-xl relative z-0 border border-slate-200">
            {isMounted && (
              <MapPicker
                position={formData.location}
                onPositionChange={(pos) =>
                  setFormData((p: any) => ({ ...p, location: pos }))
                }
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
