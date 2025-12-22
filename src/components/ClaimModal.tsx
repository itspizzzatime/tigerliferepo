"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function ClaimModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [incidentDate, setIncidentDate] = useState("");
  const [claimType, setClaimType] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const reset = () => {
    setIncidentDate("");
    setClaimType("");
    setDescription("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!incidentDate || !claimType || !description) {
      toast({ title: "Missing information", description: "Please complete all required fields.", duration: 3000 });
      return;
    }

    setSubmitting(true);
    try {
      // Mock submit: replace with API call when backend endpoint is available
      await new Promise((r) => setTimeout(r, 800));
      toast({ title: "Claim submitted", description: "Your claim has been submitted successfully.", duration: 4000 });
      onOpenChange(false);
      reset();
    } catch (err) {
      toast({ title: "Submission failed", description: "Unable to submit claim. Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>File a Claim</DialogTitle>
          <DialogDescription>Provide details of the incident to submit a claim.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <Label htmlFor="incidentDate" className="mb-1">Date of Incident</Label>
            <Input id="incidentDate" type="date" value={incidentDate} onChange={(e) => setIncidentDate(e.target.value)} required />
          </div>

          <div>
            <Label htmlFor="claimType" className="mb-1">Claim Type</Label>
            <Input id="claimType" placeholder="e.g. Hospitalization, Outpatient" value={claimType} onChange={(e) => setClaimType(e.target.value)} required />
          </div>

          <div>
            <Label htmlFor="description" className="mb-1">Description</Label>
            <Textarea id="description" placeholder="Describe what happened" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>

          <div className="flex items-center justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => { onOpenChange(false); reset(); }} disabled={submitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Submitting…" : "Submit Claim"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
