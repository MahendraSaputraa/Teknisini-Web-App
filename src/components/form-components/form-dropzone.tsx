"use client";

import * as React from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import { CloudUpload, AlertCircle, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DropzoneProps extends Omit<DropzoneOptions, "onDrop"> {
  onFileSelect: (file: File | null) => void;
  title?: string;
  className?: string;
}

const Dropzone = React.forwardRef<HTMLDivElement, DropzoneProps>(
  ({ onFileSelect, title = "Payment Proof", className, ...props }, ref) => {
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const [preview, setPreview] = React.useState<string | null>(null);

    const onDrop = React.useCallback(
      (acceptedFiles: File[]) => {
        const file = acceptedFiles[0] || null;
        setSelectedFile(file);
        onFileSelect(file);

        if (file && file.type.startsWith("image/")) {
          const previewUrl = URL.createObjectURL(file);
          setPreview(previewUrl);
        } else {
          setPreview(null);
        }
      },
      [onFileSelect],
    );

    const {
      getRootProps,
      getInputProps,
      isDragActive,
      isDragReject,
      fileRejections,
    } = useDropzone({
      onDrop,
      maxFiles: 1,
      ...props,
    });

    const removeFile = () => {
      setSelectedFile(null);
      onFileSelect(null);
      setPreview(null);
    };

    // cleanup object URL
    React.useEffect(() => {
      return () => {
        if (preview) URL.revokeObjectURL(preview);
      };
    }, [preview]);

    return (
      <div className={cn("p-6", className)} ref={ref}>
        <h2 className="text-xl font-semibold mb-6 text-foreground">{title}</h2>

        <div
          {...getRootProps()}
          className={cn(
            "w-full h-80 rounded-xl border-2 bg-slate-50 border-dashed border-input transition-colors duration-150 cursor-pointer",
            "flex flex-col items-center justify-center text-center p-4 overflow-hidden",
            "hover:bg-slate-100",
            {
              "border-primary bg-primary/5": isDragActive,
              "border-destructive bg-destructive/10": isDragReject,
            },
          )}
        >
          <input {...getInputProps()} />

          {!selectedFile && (
            <>
              <div className="bg-primary/5 rounded-full p-4 mb-4">
                <CloudUpload className="h-10 w-10 text-primary" />
              </div>
              <p className="font-semibold text-foreground">
                {isDragActive
                  ? "Lepas file untuk mengunggah"
                  : "Click to upload your receipt"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Supports JPG, PNG, or PDF up to 5MB
              </p>
            </>
          )}

          {selectedFile && (
            <>
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-full max-w-full object-contain rounded-lg"
                />
              ) : (
                <>
                  <p className="font-semibold text-foreground line-clamp-1">
                    {selectedFile.name}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    File siap untuk diunggah
                  </p>
                </>
              )}
            </>
          )}

          {fileRejections.length > 0 && (
            <div className="flex items-center gap-2 mt-4 text-destructive text-sm bg-destructive/10 rounded-md p-2">
              <AlertCircle className="h-4 w-4" />
              <span>Cukup satu file yang didukung</span>
            </div>
          )}
        </div>

        {selectedFile && (
          <div className="flex justify-center mt-4">
            <Button
              variant="destructive"
              onClick={removeFile}
              className="gap-2 "
            >
              <Trash2 className="h-4 w-4" />
              Remove File
            </Button>
          </div>
        )}
      </div>
    );
  },
);
Dropzone.displayName = "Dropzone";

export { Dropzone };
