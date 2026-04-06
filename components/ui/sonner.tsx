"use client";

import { Toaster, toast } from "sonner";

type ToastPayload = {
  title: string;
  description?: string;
};

export function AppToaster() {
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast:
            "border border-border bg-background text-foreground shadow-lg shadow-black/10",
          description: "text-muted-foreground",
          actionButton: "bg-primary text-primary-foreground",
          cancelButton: "bg-muted text-muted-foreground",
        },
      }}
    />
  );
}

export function toastSuccess({ title, description }: ToastPayload) {
  return toast.success(title, { description });
}

export function toastError({ title, description }: ToastPayload) {
  return toast.error(title, { description });
}

export { toast };