import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog.tsx";
import { memo, ReactNode, useEffect, useState } from "react";

interface IModalProps {
  defaultOpen: boolean;
  title: string | ReactNode;
  description?: string | ReactNode;
  confirmButtonLabel: string;
  resetButtonLabel?: string;
  onConfirm: () => void;
}

export const Modal = memo(({ defaultOpen, title, description, confirmButtonLabel, resetButtonLabel, onConfirm }: IModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(() => defaultOpen);

  useEffect(() => {
    setIsOpen(defaultOpen);
  }, [defaultOpen]);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
        </AlertDialogHeader>
        <AlertDialogFooter>
          {resetButtonLabel && <AlertDialogCancel>{resetButtonLabel}</AlertDialogCancel>}
          <AlertDialogAction
            onClick={() => {
              setIsOpen(!isOpen);
              onConfirm();
            }}
          >
            {confirmButtonLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});
