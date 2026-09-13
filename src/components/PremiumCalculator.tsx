"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Calculator, ChevronDown, ShieldCheck, Sparkles, X } from "lucide-react";
import { computePremiumFromCoeffs } from "@/lib/premium_coeffs";

const inputClasses =
  "w-full mt-1 p-2 border border-gray-300 rounded-md bg-white text-tiger-brown placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ust-gold/60 focus:border-ust-gold transition-colors";

const selectClasses =
  "w-full mt-1 p-2 pr-9 border border-gray-300 rounded-md bg-gray-50 text-tiger-brown appearance-none focus:outline-none focus:ring-2 focus:ring-ust-gold/60 focus:border-ust-gold transition-colors";

function Select({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={selectClasses}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
    </div>
  );
}

function ResultModal({
  onClose,
  premium,
  error,
  decline,
}: {
  onClose: () => void;
  premium: number | null;
  error: string | null;
  decline: string | null;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm bg-white rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 text-center">
          {premium !== null && (
            <>
              <div className="flex items-center justify-center gap-1.5 mb-2">                <p className="text-sm text-tiger-brown">Your Estimated Monthly Premium</p>
              </div>
              <p className="text-4xl font-bold text-tiger-brown">
                ₱{premium.toLocaleString("en-PH", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <p className="text-xs text-gray-500 mt-3">
                *This is an estimate. Actual premium may vary based on additional factors and underwriting.
              </p>
              <Button
                onClick={onClose}
                className="w-full mt-5 bg-tiger-brown hover:bg-tiger-brown/90 text-white font-bold"
              >
                Got it
              </Button>
            </>
          )}

          {(error || decline) && (
            <>
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{error || decline}</p>
              </div>
              <Button
                onClick={onClose}
                variant="outline"
                className="w-full mt-4"
              >
                Close
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

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
  const [showModal, setShowModal] = useState(false);

  const handleCalculate = async () => {
    setPersonalError(null);
    setPersonalLoading(true);
    setPersonalPremium(null);
    setDeclineReason(null);

    try {
      if (!age || !height || !weight) {
        setPersonalError("Please fill in all required fields: Age, Height, and Weight");
        setPersonalLoading(false);
        setShowModal(true);
        return;
      }

      const ageNum = Number(age);
      if (ageNum < 16 || ageNum > 25) {
        setDeclineReason(
          `We're sorry, but we can only insure applicants between 16 and 25 years old. You are ${ageNum} years old.`
        );
        setPersonalLoading(false);
        setShowModal(true);
        return;
      }

      if (substanceUse !== "none") {
        setDeclineReason(
          "We're unable to provide coverage for applicants who report substance use. Please contact our support team for alternative options."
        );
        setPersonalLoading(false);
        setShowModal(true);
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
      setShowModal(true);
    } catch (err: any) {
      setPersonalError(err?.message || String(err));
      setShowModal(true);
    } finally {
      setPersonalLoading(false);
    }
  };

  return (
    <section className="py-10 bg-background">
      <div className="max-w-2xl mx-auto px-6">
        <div className="mb-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-tiger-brown mb-2">
            Calculate Your Premium
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-md mx-auto">
            Get a personalized estimate of your monthly insurance premium in seconds.
          </p>
        </div>

        <Card className="shadow-lg overflow-hidden py-0">
          <CardContent className="space-y-5 py-5">
            <div>
              <h3 className="text-xs font-semibold text-tiger-brown uppercase tracking-wide mb-2">
                About You
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Age</label>
                  <input
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className={inputClasses}
                    placeholder="e.g. 20"
                    type="number"
                    inputMode="numeric"
                    min={16}
                    max={25}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Height (cm)</label>
                  <input
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className={inputClasses}
                    placeholder="e.g. 170"
                    type="number"
                    inputMode="numeric"
                    min={0}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Weight (kg)</label>
                  <input
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className={inputClasses}
                    placeholder="e.g. 65"
                    type="number"
                    inputMode="numeric"
                    min={0}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Annual Income</label>
                  <Select value={annualGrossIncome} onChange={setAnnualGrossIncome}>
                    <option value="under_100k">Under ₱100k</option>
                    <option value="100k_300k">₱100k – ₱300k</option>
                    <option value="300k_600k">₱300k – ₱600k</option>
                    <option value="600k_1m">₱600k – ₱1M</option>
                    <option value="over_1m">Over ₱1M</option>
                  </Select>
                </div>
              </div>
            </div>

            <div className="pt-1 border-t border-gray-100">
              <div className="mb-2 mt-4">
                <h3 className="text-xs font-semibold text-tiger-brown uppercase tracking-wide">
                  Lifestyle &amp; Risk Factors
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Smoking Habits</label>
                  <Select value={smokingHabits} onChange={setSmokingHabits}>
                    <option value="none">None</option>
                    <option value="light">Light</option>
                    <option value="moderate">Moderate</option>
                    <option value="heavy">Heavy</option>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Alcohol Consumption</label>
                  <Select value={alcoholConsumption} onChange={setAlcoholConsumption}>
                    <option value="none">None</option>
                    <option value="occasional">Occasional</option>
                    <option value="heavy">Heavy</option>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Substance Use</label>
                  <Select value={substanceUse} onChange={setSubstanceUse}>
                    <option value="none">None</option>
                    <option value="occasional">Occasional</option>
                    <option value="heavy">Heavy</option>
                  </Select>
                </div>
              </div>
            </div>

            <Button
              onClick={handleCalculate}
              disabled={personalLoading || !age || !height || !weight}
              className="w-full bg-tiger-brown hover:bg-tiger-brown/90 text-white font-bold py-5 text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {personalLoading ? "Calculating..." : "Calculate My Premium"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {showModal && (
        <ResultModal
          onClose={() => setShowModal(false)}
          premium={personalPremium}
          error={personalError}
          decline={declineReason}
        />
      )}
    </section>
  );
}