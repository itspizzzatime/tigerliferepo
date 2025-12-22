"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function PremiumCalculator() {
  const [age, setAge] = useState(30);
  const [coverage, setCoverage] = useState("standard");
  const [premium, setPremium] = useState<number | null>(null);

  const calculatePremium = () => {
    let basePremium = 50;
    if (coverage === "premium") {
      basePremium = 100;
    } else if (coverage === "basic") {
      basePremium = 30;
    }
    const calculated = basePremium + (age - 18) * 2.5;
    setPremium(calculated);
  };

  return (
    <section id="calculator" className="py-16 bg-background">
      <div className="max-w-2xl mx-auto px-6">
        <Card>
          <CardHeader>
            <CardTitle>Estimate Your Premium</CardTitle>
            <CardDescription>Get a quick estimate of your monthly premium.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">Your Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value, 10))}
                  placeholder="e.g. 30"
                />
              </div>
              <div>
                <Label htmlFor="coverage">Coverage Level</Label>
                <Select value={coverage} onValueChange={setCoverage}>
                  <SelectTrigger id="coverage">
                    <SelectValue placeholder="Select coverage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={calculatePremium} className="w-full">Calculate</Button>
          </CardContent>
          {premium !== null && (
            <CardFooter>
              <div className="w-full text-center">
                <p className="text-lg font-semibold">Estimated Monthly Premium:</p>
                <p className="text-3xl font-bold text-primary">${premium.toFixed(2)}</p>
              </div>
            </CardFooter>
          )}
        </Card>
      </div>
    </section>
  );
}
