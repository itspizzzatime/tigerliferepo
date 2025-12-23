"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Heart, Building2, Phone } from "lucide-react";
import type { ApplicationData } from "../ApplicationModal";

interface ReviewStepProps {
  data: ApplicationData;
  onNext: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export default function ReviewStep({ data, onNext, onBack, isSubmitting }: ReviewStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Review Your Application</h3>
        <p className="text-muted-foreground">
          Please review your information before submitting
        </p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-primary" />
              <h4 className="font-semibold text-primary">Personal Information</h4>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Full Name</p>
                <p className="font-medium" data-testid="review-fullname">{data.fullName || "Not provided"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Email</p>
                <p className="font-medium" data-testid="review-email">{data.email || "Not provided"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Phone</p>
                <p className="font-medium" data-testid="review-phone">{data.phone || "Not provided"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Date of Birth</p>
                <p className="font-medium" data-testid="review-dob">{data.dateOfBirth || "Not provided"}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-muted-foreground">Address</p>
                <p className="font-medium" data-testid="review-address">{data.address || "Not provided"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-5 h-5 text-primary" />
              <h4 className="font-semibold text-primary">Education & Family</h4>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">College/University</p>
                <p className="font-medium">{data.college || "Not provided"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Program</p>
                <p className="font-medium">{data.program || "Not provided"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Father's Name</p>
                <p className="font-medium">{data.fatherName || "Not provided"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Father's Occupation</p>
                <p className="font-medium">{data.fatherOccupation || "Not provided"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Mother's Name</p>
                <p className="font-medium">{data.motherName || "Not provided"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Mother's Occupation</p>
                <p className="font-medium">{data.motherOccupation || "Not provided"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Annual Gross Income</p>
                <p className="font-medium">{data.annualGrossIncome || "Not provided"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Phone className="w-5 h-5 text-primary" />
              <h4 className="font-semibold text-primary">Emergency Contact</h4>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Contact Name</p>
                <p className="font-medium">{data.emergencyName || "Not provided"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Contact Number</p>
                <p className="font-medium" data-testid="review-emergency">{data.emergencyContact || "Not provided"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-primary" />
              <h4 className="font-semibold text-primary">Health Information</h4>
            </div>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-muted-foreground">Pre-existing Conditions</p>
                <p className="font-medium" data-testid="review-conditions">
                  {data.preExistingConditions.length > 0 
                    ? data.preExistingConditions.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(", ")
                    : "None"}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Current Medications</p>
                <p className="font-medium" data-testid="review-medications">
                  {data.currentMedications || "None"}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Family Medical History</p>
                <p className="font-medium" data-testid="review-family">
                  {data.familyHistory || "None reported"}
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground">Smoking Habits</p>
                  <p className="font-medium" data-testid="review-smoker">
                    {data.smokingHabits && data.smokingHabits !== 'none' ? data.smokingHabits : "None"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Alcohol Consumption</p>
                  <p className="font-medium capitalize" data-testid="review-alcohol">
                    {data.alcoholConsumption || "None"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Substance Use</p>
                  <p className="font-medium capitalize" data-testid="review-substance">
                    {(data as any).substanceUse || "None"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h4 className="font-semibold mb-3 text-primary">Hospitalization History</h4>
            <div className="text-sm">
              <p className="text-muted-foreground mb-2">Previous Hospitalizations</p>
              <div className="bg-muted p-3 rounded-md font-mono text-xs whitespace-pre-wrap" data-testid="review-hospitalizations">
                {data.hospitalizations || "No previous hospitalizations reported"}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted p-4 rounded-md">
        <p className="text-sm text-muted-foreground">
          Please review your information carefully. You'll need to sign in or create an account in the next step before submitting.
        </p>
      </div>

      <div className="flex justify-between pt-4 gap-3">
        <Button type="button" variant="outline" onClick={onBack} disabled={isSubmitting} data-testid="button-back">
          Back
        </Button>
        <Button type="button" onClick={onNext} disabled={isSubmitting} data-testid="button-next">
          Next
        </Button>
      </div>
    </div>
  );
}
