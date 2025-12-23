"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Heart, Stethoscope, Ambulance } from "lucide-react";

interface InsuranceInfoStepProps {
  onNext: () => void;
}

export default function InsuranceInfoStep({ onNext }: InsuranceInfoStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Welcome to Tiger Insurance</h3>
        <p className="text-muted-foreground">
          Learn about our comprehensive coverage before starting your application
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <Shield className="w-10 h-10 text-primary mb-3" />
            <h4 className="font-semibold mb-2">Comprehensive Protection</h4>
            <p className="text-sm text-muted-foreground">
              Coverage up to ₱500,000 annually for hospitalization, medications, and outpatient care
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <Heart className="w-10 h-10 text-primary mb-3" />
            <h4 className="font-semibold mb-2">Family Coverage</h4>
            <p className="text-sm text-muted-foreground">
              Extend protection to your loved ones with family plan options
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <Stethoscope className="w-10 h-10 text-primary mb-3" />
            <h4 className="font-semibold mb-2">Wide Network</h4>
            <p className="text-sm text-muted-foreground">
              Access to over 5,000 healthcare providers nationwide
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <Ambulance className="w-10 h-10 text-primary mb-3" />
            <h4 className="font-semibold mb-2">Emergency Care</h4>
            <p className="text-sm text-muted-foreground">
              24/7 emergency services with immediate coverage activation
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted p-6 rounded-md">
        <h4 className="font-semibold mb-3">What You'll Need:</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Personal information (name, contact details, date of birth)</li>
          <li>• Medical history and current health status</li>
          <li>• Information about previous hospitalizations (if any)</li>
          <li>• Emergency contact details</li>
        </ul>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={onNext} size="lg" data-testid="button-next">
          Begin Application
        </Button>
      </div>
    </div>
  );
}
