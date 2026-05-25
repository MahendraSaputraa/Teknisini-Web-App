"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitReview } from "@/services/order";
import { toast } from "sonner";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  serviceName: string;
}

export function ReviewModal({
  isOpen,
  onClose,
  orderId,
  serviceName,
}: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => submitReview(orderId, rating, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Terima kasih!", {
        description: "Ulasan Anda telah berhasil dikirim.",
      });
      onClose();
      // Reset form
      setRating(0);
      setComment("");
    },
    onError: (error: any) => {
      const message = error?.response?.data?.error || "Gagal mengirim ulasan";
      toast.error("Terjadi Kesalahan", {
        description: message,
      });
    },
  });

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error("Peringatan", {
        description: "Harap berikan rating sebelum mengirim.",
      });
      return;
    }
    mutate();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Beri Penilaian</DialogTitle>
          <DialogDescription>
            Bagaimana pengalaman Anda menggunakan layanan {serviceName}?
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-6 py-6">
          {/* Stars */}
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="transition-transform hover:scale-110 active:scale-95"
              >
                <Star
                  className={`h-10 w-10 ${
                    star <= rating
                      ? "fill-yellow-400 text-yellow-500"
                      : "text-slate-300"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="w-full space-y-2">
            <label className="text-sm font-medium">Komentar (Opsional)</label>
            <Textarea
              placeholder="Tuliskan masukan Anda di sini..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px] rounded-xl"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="rounded-full"
            disabled={isPending}
          >
            Batal
          </Button>
          <Button
            onClick={handleSubmit}
            className="rounded-full px-8"
            disabled={isPending}
          >
            {isPending && <Spinner className="mr-2 h-4 w-4" />}
            Kirim Ulasan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
