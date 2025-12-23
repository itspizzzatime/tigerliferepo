"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import Image from 'next/image';

export default function PayModal({ open, onOpenChange, amount }: { open: boolean; onOpenChange: (v: boolean) => void, amount: number | null }) {
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=192x192&data=${encodeURIComponent(amount || 0)}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pay Premium</DialogTitle>
          <DialogDescription>
            Choose your preferred payment method. Amount to pay: {amount ? new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount) : 'N/A'}
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="card" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="card">Card</TabsTrigger>
            <TabsTrigger value="qr">QR Code</TabsTrigger>
          </TabsList>
          <TabsContent value="card">
            <div className="space-y-4 py-4">
                <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="0000 0000 0000 0000" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="expiry-date">Expiry Date</Label>
                        <Input id="expiry-date" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" />
                    </div>
                </div>
                <Button className="w-full">Pay with Card</Button>
            </div>
          </TabsContent>
          <TabsContent value="qr">
            <div className="flex flex-col items-center justify-center space-y-4 py-4">
                <p className="text-sm text-muted-foreground">Scan the QR code with your payment app.</p>
                <div className="w-48 h-48 bg-muted flex items-center justify-center">
                    <Image src={qrCodeUrl} alt="QR Code for payment" width={192} height={192} />
                </div>
                <Separator />
                <p className="text-xs text-center text-muted-foreground">
                    After scanning, your payment will be processed.
                </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
