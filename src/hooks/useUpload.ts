/**
 * src/hooks/useUpload.ts
 * Custom hook untuk mengelola state upload gambar di komponen React
 */
"use client"

import { useState, useCallback } from "react"
import { uploadImage, UploadFolder } from "@/services/upload"

interface UseUploadOptions {
  folder: UploadFolder
  onSuccess?: (url: string) => void
  onError?: (error: string) => void
}

interface UseUploadReturn {
  upload: (file: File, name?: string) => Promise<string | null>
  uploading: boolean
  uploadedUrl: string | null
  error: string | null
  reset: () => void
}

export function useUpload({
  folder,
  onSuccess,
  onError,
}: UseUploadOptions): UseUploadReturn {
  const [uploading, setUploading] = useState(false)
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const upload = useCallback(
    async (file: File, name?: string): Promise<string | null> => {
      setUploading(true)
      setError(null)

      try {
        const result = await uploadImage(file, folder, name)
        setUploadedUrl(result.url)
        onSuccess?.(result.url)
        return result.url
      } catch (err) {
        const message = err instanceof Error ? err.message : "Upload gagal"
        setError(message)
        onError?.(message)
        return null
      } finally {
        setUploading(false)
      }
    },
    [folder, onSuccess, onError]
  )

  const reset = useCallback(() => {
    setUploadedUrl(null)
    setError(null)
    setUploading(false)
  }, [])

  return { upload, uploading, uploadedUrl, error, reset }
}
