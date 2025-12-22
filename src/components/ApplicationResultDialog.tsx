"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import AcceptedPage from "./steps/AcceptedPage";
import DeclinePage from "./steps/DeclinePage";
import type { ApplicationData } from "./ApplicationModal";

interface ApplicationResultDialogProps {
  open: boolean;
  onClose: () => void;
  status: "approved" | "declined";
  applicationData: ApplicationData;
}

export default function ApplicationResultDialog({
  open,
  onClose,
  status,
  applicationData,
}: ApplicationResultDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <div className="sticky top-0 bg-background z-10 p-6 border-b flex items-center justify-between">
          <h2 className="text-2xl font-bold">Application Decision</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            data-testid="button-close-result-modal"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div className="p-6">
          {status === "approved" ? (
            // When showing the result dialog, use AcceptedPage's `onContinue` prop
            // to close the dialog (or advance to login if you change behavior later).
            <AcceptedPage onContinue={() => onClose()} onFail={() => onClose()} applicationData={applicationData} />
          ) : (
            <DeclinePage onClose={onClose} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
