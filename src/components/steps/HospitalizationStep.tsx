"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type {
  ApplicationData,
  HospitalizationRecord,
} from "../ApplicationModal";

interface HospitalizationStepProps {
  data: ApplicationData;
  updateData: (data: Partial<ApplicationData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const emptyRecord = (): HospitalizationRecord => ({
  date: "",
  reason: "",
  documents: "",
});

export default function HospitalizationStep({
  data,
  updateData,
  onNext,
  onBack,
}: HospitalizationStepProps) {
  const [rows, setRows] = useState<HospitalizationRecord[]>(
    data.hospitalizationHistory?.length
      ? data.hospitalizationHistory
      : [emptyRecord()],
  );

  const updateRows = (nextRows: HospitalizationRecord[]) => {
    setRows(nextRows);
    updateData({
      hospitalizationHistory: nextRows,
      hospitalizations: nextRows
        .filter((row) => row.date || row.reason || row.documents)
        .map((row) => [row.date, row.reason, row.documents].filter(Boolean).join(" - "))
        .join("\n"),
    });
  };

  const updateRow = (
    index: number,
    field: keyof HospitalizationRecord,
    value: string,
  ) => {
    const nextRows = rows.map((row, rowIndex) =>
      rowIndex === index ? { ...row, [field]: value } : row,
    );
    updateRows(nextRows);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Hospitalization History</h3>
      </div>

      <div className="space-y-3">
        <Label>Previous Hospitalizations</Label>
        <p className="text-sm text-muted-foreground">
          Add a row for each hospitalization. Leave the table blank if you have never been hospitalized.
        </p>

        <div className="overflow-x-auto rounded-md border border-border">
          <table className="w-full min-w-[680px] text-sm">
            <thead className="bg-muted/60 text-left">
              <tr>
                <th className="px-3 py-2 font-medium">Date</th>
                <th className="px-3 py-2 font-medium">Reason</th>
                <th className="px-3 py-2 font-medium">Documents</th>
                <th className="w-10 px-2 py-2" aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className="border-t border-border align-top">
                  <td className="p-2">
                    <Input
                      type="date"
                      value={row.date}
                      onChange={(event) => updateRow(index, "date", event.target.value)}
                      placeholder="YYYY-MM-DD"
                      aria-label={`Hospitalization ${index + 1} date`}
                    />
                  </td>
                  <td className="p-2">
                    <Input
                      value={row.reason}
                      onChange={(event) => updateRow(index, "reason", event.target.value)}
                      placeholder="e.g. Appendectomy"
                      aria-label={`Hospitalization ${index + 1} reason`}
                    />
                  </td>
                  <td className="p-2">
                    <Input
                      value={row.documents}
                      onChange={(event) => updateRow(index, "documents", event.target.value)}
                      placeholder="e.g. Discharge summary"
                      aria-label={`Hospitalization ${index + 1} documents`}
                    />
                  </td>
                  <td className="p-2">
                    {rows.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => updateRows(rows.filter((_, rowIndex) => rowIndex !== index))}
                        aria-label={`Remove hospitalization ${index + 1}`}
                      >
                        ×
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Button type="button" variant="outline" onClick={() => updateRows([...rows, emptyRecord()])}>
          Add hospitalization
        </Button>
      </div>

      <div className="p-4 bg-muted rounded-md">
        <h4 className="font-semibold mb-2 text-sm">Important Notes:</h4>
        <ul className="space-y-1 text-xs text-muted-foreground">
          <li>Include all hospitalizations from the past 10 years.</li>
          <li>Provide accurate dates and reasons for admission.</li>
          <li>Include both emergency and planned procedures.</li>
        </ul>
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
