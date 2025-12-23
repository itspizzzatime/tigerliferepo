"use client";
import { Button } from "@/components/ui/button";
import { XCircle, Phone, Mail } from "lucide-react";

interface DeclinePageProps {
  onClose: () => void;
}

export default function DeclinePage({ onClose }: DeclinePageProps) {
  return (
    <div className="text-center py-8 space-y-6">
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
          <XCircle className="w-12 h-12 text-destructive" />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-2xl font-bold">Application Not Approved</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          We're sorry, but we're unable to approve your application at this time based on the information provided.
        </p>
      </div>

      <div className="bg-muted p-6 rounded-md max-w-lg mx-auto text-left">
        <h4 className="font-semibold mb-3">What's Next?</h4>
        <div className="space-y-3 text-sm">
          <p className="text-muted-foreground">
            You may be eligible for alternative coverage options. Our team is here to help find the right solution for you.
          </p>
          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium">Call us:</p>
                <p className="text-muted-foreground">1-800-SECURE-1</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium">Email us:</p>
                <p className="text-muted-foreground">support@tigercare.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-3 pt-4">
        <Button variant="outline" onClick={onClose} data-testid="button-close">
          Return to Home
        </Button>
      </div>
    </div>
  );
}
