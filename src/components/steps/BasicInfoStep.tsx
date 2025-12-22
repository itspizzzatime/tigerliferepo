"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMemo } from "react";
import type { ApplicationData } from "../ApplicationModal";

interface BasicInfoStepProps {

  data: ApplicationData;
  updateData: (data: Partial<ApplicationData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const collegeProgramsMap = {
  '': [],
  'College of Science': [
    'BS Applied Mathematics, major in Actuarial Science',
    'BS Applied Physics, major in Instrumentation',
    'BS Biology - Environmental Biology',
    'BS Biology - Medical Biology',
    'BS Biology - Molecular Biology and Biotechnology',
    'BS Chemistry',
    'BS Data Science and Analytics',
    'BS Microbiology',
    'BS Psychology',
  ],
  'College of Architecture': [
    'BS Architecture',
  ],
  'Faculty of Engineering': [
    'BS Chemical Engineering',
    'BS Civil Engineering',
    'BS Electrical Engineering',
    'BS Electronics Engineering',
    'BS Industrial Engineering',
    'BS Mechanical Engineering'
  ],
  'College of Commerce and Business Administration': [
    'BS Business Administration - major in Business Economics',
    'BS Business Administration - major in Financial Management',
    'BS Business Administration - major in Human Resource Development Management',
    'BS Business Administration - major in Marketing Management',
    'BS Entrepreneurship'
  ],
  'College of Education': [
    'Bachelor of Secondary Education - major in English',
    'Bachelor of Secondary Education - major in Filipino',
    'Bachelor of Secondary Education - major in Mathematics',
    'Bachelor of Secondary Education - major in Religious & Values Education',
    'Bachelor of Secondary Education - major in Science',
    'Bachelor of Secondary Education - major in Social Studies',
    'Bachelor of Elementary Education',
    'Bachelor of Early Childhood Education',
    'Bachelor of Special Needs Education - major in Early Childhood Education',
    'Bachelor of Science in Food Technology',
    'Bachelor of Science in Nutrition and Dietetics',
    'Bachelor of Library and Information Science'
  ],
  'UST-Alfredo M. Velayo College of Accountancy': [
    'BS Accountancy',
    'BS Accounting Information System',
    'BS Management Accounting'
  ],
  'Faculty of Arts and Letters': [
    'BA Asian Studies',
    'BA Behavioral Science',
    'BA Communication',
    'BA Creative Writing',
    'BA Economics',
    'BA English Language Studies',
    'BA History',
    'BA Journalism',
    'BA Legal Management',
    'BA Literature',
    'BA Philosophy',
    'BA Political Science',
    'BA Sociology'
  ],
  'Faculty of Civil Law': [
    'Juris Doctor'
  ],
  'College of Fine Arts and Design': [
    'BFA Advertising Arts',
    'BFA Industrial Design',
    'BFA Painting',
    'BS Interior Design'
  ],
  'Conservatory of Music': [
    'Bachelor of Music in Composition',
    'Bachelor of Music in Music Education',
    'Bachelor of Music in Music Theatre',
    'Bachelor of Music in Music Technology',
    'Bachelor of Music in Jazz',
    'Bachelor of Music in Musicology',
    'Bachelor of Music in Performance — Bassoon',
    'Bachelor of Music in Performance — Clarinet',
    'Bachelor of Music in Performance — Double Bass',
    'Bachelor of Music in Performance — Flute',
    'Bachelor of Music in Performance — French Horn',
    'Bachelor of Music in Performance — Guitar',
    'Bachelor of Music in Performance — Oboe',
    'Bachelor of Music in Performance — Orchestral Conducting',
    'Bachelor of Music in Performance — Percussion',
    'Bachelor of Music in Performance — Piano',
    'Bachelor of Music in Performance — Saxophone',
    'Bachelor of Music in Performance — Trombone',
    'Bachelor of Music in Performance — Trumpet',
    'Bachelor of Music in Performance — Tuba',
    'Bachelor of Music in Performance — Viola',
    'Bachelor of Music in Performance — Violin',
    'Bachelor of Music in Performance — Violoncello',
    'Bachelor of Music in Performance — Voice'
  ],
  'Faculty of Medicine and Surgery': [
    'BS Basic Human Studies'
  ],
  'College of Information and Computing Sciences': [
    'BS Information Systems',
    'BS Computer Science',
    'BS Information Technology',
  ],
  'College of Nursing': [
    'BS Nursing'
  ],
  'Faculty of Pharmacy': [
    'BS Biochemistry',
    'BS Medical Technology',
    'BS Pharmacy',
    'BS Pharmacy, major in Clinical Pharmacy',
  ],
  'Institute of Physical Education and Athletics': [
    'Bachelor of Physical Education, major in Sports and Wellness Management'
  ],
  'College of Rehabilitation Sciences': [
    'BS Occupational Therapy',
    'BS Physical Therapy',
    'BS Speech-Language Pathology',
    'BS Sports Science'
  ],
  'College of Tourism and Hospitality Management': [
    'BS Hospitality Management, major in Culinary Entrepreneurship',
    'BS Hospitality Management, major in Hospitality Leadership',
    'BS Tourism Management, major in Recreation and Leisure Management',
    'BS Tourism Management, major in Travel Operation and Service Management'
  ],
  'Faculty of Canon Law': [
    'Bachelor of Canon Law',
    'Licentiate in Canon Law',
  ],
  'Faculty of Philosophy': [
    'Bachelor of Philosophy',
  ],
  'Faculty of Sacred Theology': [
    'Bachelor in Theology',
  ],
};


export default function BasicInfoStep({ data, updateData, onNext, onBack }: BasicInfoStepProps) {
  const handleCollegeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCollege = e.target.value;
    updateData({
      college: newCollege,
      program: '', // Reset program
    });
  };

  const availablePrograms = useMemo(() => {
    return collegeProgramsMap[data.college as keyof typeof collegeProgramsMap] || [];
  }, [data.college]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Basic Information</h3>
        <p className="text-muted-foreground">Please provide your personal details</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={data.fullName}
            onChange={(e) => updateData({ fullName: e.target.value })}
            placeholder="John Doe"
            required
            data-testid="input-fullname"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">UST Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => updateData({ email: e.target.value })}
              placeholder="john@example.com"
              required
              data-testid="input-email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              pattern="[0-9]*"
              maxLength={11}
              value={data.phone}
              onChange={(e) => {
                const rawValue = e.target.value;
                const numericValue = rawValue.replace(/[^0-9]/g, ''); 
                updateData({ phone: numericValue });
              }}
              placeholder="+63 932-123-4567"
              required
              data-testid="input-phone"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth *</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={data.dateOfBirth}
            onChange={(e) => updateData({ dateOfBirth: e.target.value })}
            required
            data-testid="input-dob"
          />
          </div>
        
          <div className="space-y-2">
            <Label htmlFor="college">College/Faculty *</Label>
            <select
              id="college"
              value={data.college || ''}
              onChange={handleCollegeChange}
              data-testid="select-college"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select a college</option>
              {Object.keys(collegeProgramsMap).filter(c => c !== '').map((college) => (
                <option key={college} value={college}>{college}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="program">Course/Program *</Label>
          <select
            id="program"
            value={data.program || ''}
            onChange={(e) => updateData({ program: e.target.value })}
            disabled={!data.college}
            data-testid="select-program"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
          >
            <option value="">Select a program</option>
            {availablePrograms.map((prog) => (
              <option key={prog} value={prog}>{prog}</option>
            ))}
          </select>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fatherName">Father's Name *</Label>
            <Input
              id="fatherName"
              value={data.fatherName}
              onChange={(e) => updateData({ fatherName: e.target.value })}
              placeholder="Juan Dela Cruz"
              required
              data-testid="input-address"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fatherOccupation">Father's Occupation *</Label>
            <Input
              id="fatherOccupation"
              value={data.fatherOccupation}
              onChange={(e) => updateData({ fatherOccupation: e.target.value })}
              placeholder="Job"
              required
              data-testid="input-father-occupation"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="motherName">Mother's Name *</Label>
            <Input
              id="motherName"
              value={data.motherName}
              onChange={(e) => updateData({ motherName: e.target.value })}
              placeholder="Maria Santos"
              required
              data-testid="input-mother-name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="motherOccupation">Mother's Occupation *</Label>
            <Input
              id="motherOccupation"
              value={data.motherOccupation}
              onChange={(e) => updateData({ motherOccupation: e.target.value })}
              placeholder="Job"
              required
              data-testid="input-mother-occupation"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="annualGrossIncome">Annual Family Gross Income *</Label>
          <select
            id="annualGrossIncome"
            value={data.annualGrossIncome || ''}
            onChange={(e) => updateData({ annualGrossIncome: e.target.value })}
            data-testid="select-annual-gross-income"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select income range</option>
            <option value="under_100k">Less than ₱100,000</option>
            <option value="100k_300k">₱100,000 - ₱300,000</option>
            <option value="300k_600k">₱300,000 - ₱600,000</option>
            <option value="600k_1m">₱600,000 - ₱1,000,000</option>
            <option value="over_1m">Over ₱1,000,000</option>
          </select>
        </div>

        
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="emergencyName">Emergency Contact *</Label>
            <Input
              id="emergencyName"
              value={data.emergencyName}
              onChange={(e) => updateData({ emergencyName: e.target.value })}
              placeholder="Name"
              required
              data-testid="input-emergency"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="emergencyContact">Contact Number *</Label>
            <Input
              type="tel"
              pattern="[0-9]*"
              id="emergencyContact"
              value={data.emergencyContact}
              maxLength={11}
              onChange={(e) => {
                const rawValue=e.target.value;
                const numericValue =rawValue.replace(/[^0-9]/g, '');
                updateData({ emergencyContact: numericValue });}}
              placeholder="Phone number"
              required
              data-testid="input-emergency-contact"
            />
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