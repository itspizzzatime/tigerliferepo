"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { ApplicationData } from "../ApplicationModal";
import { commonConditions, type Condition } from "./data/healthConditions";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface HealthInfoStepProps {
  data: ApplicationData;
  updateData: (data: Partial<ApplicationData>) => void;
  onNext: () => void;
  onBack: () => void;
}

interface CollapsibleCategoryProps {
  parentCondition: Condition;
  data: ApplicationData;
  toggleCondition: (condition: string, parentName?: string) => void;
  otherConditionTexts: Record<string, string>;
  handleOtherTextChange: (parentName: string, text: string) => void;
}

const CollapsibleCategory: React.FC<CollapsibleCategoryProps> = ({
  parentCondition,
  data,
  toggleCondition,
  otherConditionTexts,
  handleOtherTextChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const conditions = data?.preExistingConditions || []; 
  
  const isAnySubConditionSelected = parentCondition.subConditions?.some(sub => {
    const key = sub.isCustomInput ? `other:${parentCondition.name}` : sub.name;
    return conditions.includes(key);
  });

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <button
        type="button"
        className={`flex justify-between items-center w-full px-4 py-3 text-base font-semibold transition-colors focus:outline-none capitalize 
          ${isAnySubConditionSelected ? 'bg-primary/10 text-primary' : 'bg-gray-50 text-gray-800 hover:bg-gray-100'}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{parentCondition.name}</span>
        <ChevronDown 
          className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="p-4 space-y-2 border-t border-gray-200">
          <div className="space-y-3">
            {parentCondition.subConditions?.map((subCondition) => {
              const otherCheckboxName = `other:${parentCondition.name}`;
              const isOtherChecked = conditions.includes(otherCheckboxName);

              return subCondition.isCustomInput ? (
                <div key={subCondition.name} className="flex flex-col space-y-2 pt-1">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id={otherCheckboxName}
                      checked={isOtherChecked}
                      onCheckedChange={() => toggleCondition('other', parentCondition.name)}
                    />
                    <Label htmlFor={otherCheckboxName} className="text-sm font-medium leading-none capitalize cursor-pointer">
                      Other (Please specify)
                    </Label>
                  </div>
                  {isOtherChecked && (
                    <Input
                      placeholder={`Specify ${parentCondition.name} condition here...`}
                      value={otherConditionTexts[parentCondition.name] || ''}
                      onChange={(e) => handleOtherTextChange(parentCondition.name, e.target.value)}
                      className="w-full text-sm"
                    />
                  )}
                </div>
              ) : (
                <div key={subCondition.name} className="flex items-center space-x-3">
                  <Checkbox
                    id={subCondition.name}
                    checked={conditions.includes(subCondition.name)}
                    onCheckedChange={() => toggleCondition(subCondition.name)}
                  />
                  <Label htmlFor={subCondition.name} className="text-sm font-medium leading-none capitalize cursor-pointer">
                    {subCondition.name}
                  </Label>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default function HealthInfoStep({ data, updateData, onNext, onBack }: HealthInfoStepProps) {
  const GENERAL_OTHER_KEY = "Other (Please specify)";
  const [otherConditionTexts, setOtherConditionTexts] = useState<Record<string, string>>({});
  
  const handleOtherTextChange = (parentName: string, text: string) => {
    setOtherConditionTexts((prev) => ({ ...prev, [parentName]: text }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const isGeneralOtherChecked = (data?.preExistingConditions || []).includes(GENERAL_OTHER_KEY);

  const toggleCondition = (condition: string, parentName?: string) => {
    const uniqueConditionKey = parentName && condition === "other" ? `other:${parentName}` : condition;
    const current = data?.preExistingConditions || [];
    const isSelected = current.includes(uniqueConditionKey)
    let updated: string[];
    if (isSelected) {
      updated = current.filter((c) => c !== uniqueConditionKey);
      if (condition === "other" && parentName) {
        setOtherConditionTexts((prev) => ({ ...prev, [parentName]: "" }));
      } else if (condition === GENERAL_OTHER_KEY) {
        setOtherConditionTexts((prev) => ({...prev, [GENERAL_OTHER_KEY]: "" }));
      } 
    } else {
      updated = [...current, uniqueConditionKey];
    }
    updateData({ preExistingConditions: updated });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Health Information</h3>
        <p className="text-muted-foreground">Help us understand your health status</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label>Pre-existing Conditions</Label>
          <p className="text-sm text-muted-foreground">Select all that apply</p>
          <div className="grid grid-cols-1 gap-3" data-testid="checkbox-conditions">
            {commonConditions.map((condition) => {
              if (condition.isParent || (condition.subConditions && condition.subConditions.length > 0)) {
                  return (
                      <CollapsibleCategory 
                          key={condition.name} 
                          parentCondition={condition}
                          data={data}
                          toggleCondition={toggleCondition}
                          otherConditionTexts={otherConditionTexts}
                          handleOtherTextChange={handleOtherTextChange}
                      />
                  );
              } 
              
              if (condition.name === GENERAL_OTHER_KEY) {
                  return (
                      <div 
                          key={condition.name} 
                          className={`flex flex-col space-y-2 p-3 rounded-lg border transition-colors 
                              ${isGeneralOtherChecked ? 'bg-primary/10 border-primary/20 shadow-inner' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                      >
                          <div className="flex items-center space-x-3">
                              <Checkbox
                                  id={GENERAL_OTHER_KEY}
                                  checked={isGeneralOtherChecked}
                                  onCheckedChange={() => toggleCondition(GENERAL_OTHER_KEY)}
                                  data-testid={`checkbox-general-other`}
                              />
                              <Label
                                  htmlFor={GENERAL_OTHER_KEY}
                                  className="font-medium capitalize text-gray-800 cursor-pointer"
                              >
                                  {condition.name}
                              </Label>
                          </div>
                          {isGeneralOtherChecked && (
                              <Input
                                  placeholder={`Specify condition here...`}
                                  value={otherConditionTexts[GENERAL_OTHER_KEY] || ''}
                                  onChange={(e) => handleOtherTextChange(GENERAL_OTHER_KEY, e.target.value)}
                                  className="w-full text-sm"
                              />
                          )}
                      </div>
                  );
              }

              const isSelected = (data?.preExistingConditions || []).includes(condition.name);
              return (
                  <div 
                      key={condition.name} 
                      className={`flex items-center space-x-3 p-3 rounded-lg border border-gray-200 transition-colors 
                                  hover:bg-gray-50
                                  ${isSelected ? 'bg-primary/10 text-primary border-primary/20' : 'bg-white'}`}
                  >
                      <Checkbox
                          id={condition.name}
                          checked={isSelected}
                          onCheckedChange={() => toggleCondition(condition.name)}
                          data-testid={`checkbox-${condition.name.replace(/\s/g, '-')}`}
                      />
                      <Label 
                          htmlFor={condition.name} 
                          className="font-medium capitalize text-gray-800 cursor-pointer"
                      >
                          {condition.name}
                      </Label>
                  </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="currentMedications">Current Medications</Label>
          <Textarea
            id="currentMedications"
            value={data.currentMedications}
            onChange={(e) => updateData({ currentMedications: e.target.value })}
            placeholder="List any medications you are currently taking..."
            rows={3}
            data-testid="textarea-medications"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="height">Height (cm) *</Label>
            <Input
              id="height"
              value={data.height || ''}
              onChange={(e) => updateData({ height: e.target.value })}
              placeholder="e.g. 170"
              data-testid="input-height"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg) *</Label>
            <Input
              id="weight"
              value={data.weight || ''}
              onChange={(e) => updateData({ weight: e.target.value })}
              placeholder="e.g. 65"
              data-testid="input-weight"
              required
            />
          </div>
        </div>


        <div className="space-y-3">
          <Label>Smoking Habits *</Label>
          <div className="max-w-sm">
            <Select value={data.smokingHabits || ''} onValueChange={(v) => updateData({ smokingHabits: v })}>
              <SelectTrigger>
                <SelectValue placeholder="Select smoking habit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="light">Light (1-10 cigarettes/week)</SelectItem>
                <SelectItem value="moderate">Moderate (10-20 cigarettes/week)</SelectItem>
                <SelectItem value="heavy">Heavy (20+ cigarettes/week)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3">
          <Label>Alcohol Consumption *</Label>
          <div className="max-w-sm">
            <Select value={data.alcoholConsumption || ''} onValueChange={(v) => updateData({ alcoholConsumption: v as any })}>
              <SelectTrigger>
                <SelectValue placeholder="Select alcohol consumption" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="occasional">Occasional (1-4 drinks/week)</SelectItem>
                <SelectItem value="heavy">Heavy (5+ drinks/week)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3">
          <Label>Substance Use</Label>
          <div className="max-w-sm">
            <Select value={data.substanceUse || 'none'} onValueChange={(v) => updateData({ substanceUse: v as any })}>
              <SelectTrigger>
                <SelectValue placeholder="Select substance use" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="occasional">Occasional</SelectItem>
                <SelectItem value="heavy">Heavy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3">
          <Label>Lifestyle Habits</Label>
          <div className="max-w-md">
            <Select value={data.lifestyle || ''} onValueChange={(v) => updateData({ lifestyle: v })}>
              <SelectTrigger>
                <SelectValue placeholder="Select lifestyle activity" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "None",
                  "Skateboarding",
                  "Mountain Hiking",
                  "Surfing",
                  "Waterskiing",
                  "Bungee Jumping",
                  "Paragliding",
                  "BMX",
                  "Parkour",
                  "Rappelling",
                  "Rock Climbing",
                  "Other",
                ].map((opt) => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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