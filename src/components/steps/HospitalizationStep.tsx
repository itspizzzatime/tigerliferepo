"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ApplicationData } from "../ApplicationModal";

interface HospitalizationStepProps {
  data: ApplicationData;
  updateData: (data: Partial<ApplicationData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function HospitalizationStep({ data, updateData, onNext, onBack }: HospitalizationStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Hospitalization History</h3>
        <p className="text-muted-foreground">
          Please provide details of any past hospitalizations or major medical procedures
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="hospitalizations">Previous Hospitalizations</Label>
          <p className="text-sm text-muted-foreground mb-2">
            List each hospitalization on a new line with date, reason, and duration
          </p>
          <Textarea
            id="hospitalizations"
            value={data.hospitalizations}
            onChange={(e) => updateData({ hospitalizations: e.target.value })}
            placeholder="Example:&#10;2022-05 - Appendectomy - 3 days&#10;2021-11 - Pneumonia treatment - 5 days"
            rows={8}
            className="font-mono text-sm"
            data-testid="textarea-hospitalizations"
          />
          <p className="text-xs text-muted-foreground">
            Leave blank if you have never been hospitalized
          </p>
        </div>

        <div className="p-4 bg-muted rounded-md">
          <h4 className="font-semibold mb-2 text-sm">Important Notes:</h4>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li>• Include all hospitalizations from the past 10 years</li>
            <li>• Provide accurate dates and reasons for admission</li>
            <li>• Include both emergency and planned procedures</li>
            <li>• This information helps us provide accurate coverage</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-between pt-4 gap-3">
        <Button type="button" variant="outline" onClick={onBack} data-testid="button-back">
          Back
        </Button>
        <Button type="submit" data-testid="button-next">
          Next
        </Button>
      </div>
    </form>
  );
}