"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { computePremiumFromCoeffs } from "@/lib/premium_coeffs";

export default function PremiumCalculator() {
  const [age, setAge] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [annualGrossIncome, setAnnualGrossIncome] = useState<string>("300k_600k");
  const [smokingHabits, setSmokingHabits] = useState<string>("none");
  const [alcoholConsumption, setAlcoholConsumption] = useState<string>("none");
  const [substanceUse, setSubstanceUse] = useState<string>("none");
  const [personalPremium, setPersonalPremium] = useState<number | null>(null);
  const [personalLoading, setPersonalLoading] = useState(false);
  const [personalError, setPersonalError] = useState<string | null>(null);
  const [declineReason, setDeclineReason] = useState<string | null>(null);

  const handleCalculate = async () => {
    setPersonalError(null);
    setPersonalLoading(true);
    setPersonalPremium(null);
    setDeclineReason(null);

    try {
      // Validate required fields
      if (!age || !height || !weight) {
        setPersonalError("Please fill in all required fields: Age, Height, and Weight");
        setPersonalLoading(false);
        return;
      }

      // Check age eligibility
      const ageNum = Number(age);
      if (ageNum < 16 || ageNum > 25) {
        setDeclineReason(
          `We're sorry, but we can only insure applicants between 16 and 25 years old. You are ${ageNum} years old.`
        );
        setPersonalLoading(false);
        return;
      }

      // Check substance use eligibility
      if (substanceUse !== "none") {
        setDeclineReason(
          "We're unable to provide coverage for applicants who report substance use. Please contact our support team for alternative options."
        );
        setPersonalLoading(false);
        return;
      }

      const input: Record<string, any> = {
        age: ageNum,
        height: Number(height),
        weight: Number(weight),
        annualGrossIncome: annualGrossIncome,
        smokingHabits: smokingHabits,
        alcoholConsumption: alcoholConsumption,
        substanceUse: substanceUse,
      };
      const val = computePremiumFromCoeffs(input as any);
      setPersonalPremium(val);
    } catch (err: any) {
      setPersonalError(err?.message || String(err));
    } finally {
      setPersonalLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Calculate Your Premium
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get a personalized estimate of your monthly insurance premium based on your health profile and lifestyle. Our calculator uses industry-standard factors to provide an accurate quote in seconds.
          </p>
        </div>

        <Card className="border-2 border-primary/20 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">₱</span>
              </div>
              <div>
                <CardTitle>Your Premium Estimate</CardTitle>
                <CardDescription>Fill in your details to get an instant quote</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Age</label>
                <input
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g. 20"
                  type="number"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Height (cm)</label>
                <input
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g. 170"
                  type="number"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Weight (kg)</label>
                <input
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g. 65"
                  type="number"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Annual Income</label>
                <select
                  value={annualGrossIncome}
                  onChange={(e) => setAnnualGrossIncome(e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="under_100k">&lt;100k</option>
                  <option value="100k_300k">100k-300k</option>
                  <option value="300k_600k">300k-600k</option>
                  <option value="600k_1m">600k-1m</option>
                  <option value="over_1m">&gt;1m</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Smoking Habits</label>
                <select
                  value={smokingHabits}
                  onChange={(e) => setSmokingHabits(e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="none">None</option>
                  <option value="light">Light</option>
                  <option value="moderate">Moderate</option>
                  <option value="heavy">Heavy</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Alcohol Consumption</label>
                <select
                  value={alcoholConsumption}
                  onChange={(e) => setAlcoholConsumption(e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="none">None</option>
                  <option value="occasional">Occasional</option>
                  <option value="heavy">Heavy</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Substance Use</label>
                <select
                  value={substanceUse}
                  onChange={(e) => setSubstanceUse(e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="none">None</option>
                  <option value="occasional">Occasional</option>
                  <option value="heavy">Heavy</option>
                </select>
              </div>
            </div>

            <Button
              onClick={handleCalculate}
              disabled={personalLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg font-semibold"
            >
              {personalLoading ? "Calculating..." : "Calculate My Premium"}
            </Button>

            {personalError && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{personalError}</p>
              </div>
            )}

            {declineReason && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{declineReason}</p>
              </div>
            )}

            {personalPremium !== null && (
              <div className="mt-6 p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/20 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Your Estimated Monthly Premium</p>
                <p className="text-4xl font-bold text-primary">
                  ₱{personalPremium.toLocaleString("en-PH", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  *This is an estimate. Actual premium may vary based on additional factors and underwriting.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
