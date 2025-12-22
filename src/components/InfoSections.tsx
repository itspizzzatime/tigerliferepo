import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, FileText, Shield, Users } from "lucide-react";

export default function InfoSections() {
  return (
    <div className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card data-testid="card-insurance-details">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-8 h-8 text-primary" />
                <CardTitle className="text-2xl">Coverage Details</CardTitle>
              </div>
              <CardDescription>Comprehensive protection for your health</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Hospitalization Coverage</p>
                    <p className="text-sm text-muted-foreground">Up to 30,000 per year</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Outpatient Care</p>
                    <p className="text-sm text-muted-foreground">Doctor visits and consultations</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Prescription Medications</p>
                    <p className="text-sm text-muted-foreground">Generic and brand-name drugs</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Emergency Services</p>
                    <p className="text-sm text-muted-foreground">24/7 emergency room coverage</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-how-to-avail">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-8 h-8 text-primary" />
                <CardTitle className="text-2xl">How to Avail</CardTitle>
              </div>
              <CardDescription>Simple 4-step application process</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Fill Application</p>
                    <p className="text-sm text-muted-foreground">Complete the online form with your details</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Health Assessment</p>
                    <p className="text-sm text-muted-foreground">Answer health-related questions</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Instant Decision</p>
                    <p className="text-sm text-muted-foreground">Get approved within minutes</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                    4
                  </div>
                  <div>
                    <p className="font-medium">Start Coverage</p>
                    <p className="text-sm text-muted-foreground">Activate your policy immediately</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-eligibility">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-8 h-8 text-primary" />
                <CardTitle className="text-2xl">Eligibility</CardTitle>
              </div>
              <CardDescription>Who can apply for coverage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Certified Undergraduate Thomasian</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Ages 16-25 years old</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Currently enrolled</p>
                </div>
                <div className="p-4 bg-muted rounded-md mt-4">
                  <p className="text-sm font-medium mb-2">Required Documents:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Certificate of Registration</li>
                    <li>• School ID</li>
                    <li>• Medical history</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Terms & Conditions</h2>
          <Accordion type="single" collapsible className="w-full" data-testid="accordion-terms">
            <AccordionItem value="privacy">
              <AccordionTrigger className="text-left">Privacy & Data Protection Terms</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p className="mb-3">
                  Your personal information is collected and used solely for verification, claims processing, and service enhancement. 
                  We comply with applicable privacy regulations to ensure the security of your data. 
                  Information will not be disclosed to third parties except when necessary for insurance operations or with your consent.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="coverage">
              <AccordionTrigger className="text-left">Coverage Terms</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p className="mb-3">
                  Your plan provides benefits strictly as outlined in the selected policy. 
                  Only services, treatments, and medications specified within your coverage are eligible for reimbursement. 
                </p>
                <p>
                  Pre-existing conditions may be subject to designated waiting periods. 
                  Coverage remains valid only within the active policy period indicated in your policy documents.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="exclusions">
              <AccordionTrigger className="text-left">Exclusions & Limitations</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p className="mb-3">
                  Your plan does not cover cosmetic treatments, non-prescription services, injuries resulting from intentional self-harm, or services obtained outside accredited providers unless otherwise specified. 
                  Coverage for certain procedures may vary based on the plan tier selected.
                </p>
                <p>
                  Certain high-risk activities and injuries sustained during illegal activities are excluded from coverage. 
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="premium">
              <AccordionTrigger className="text-left">Premium Payment</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p className="mb-3">
                  Premium payments must be settled on or before their due dates to keep your policy active. Late or missed payments may result in the temporary suspension or cancellation of benefits. 
                  Any adjustments to premium rates will be communicated prior to implementation.
                </p>
                <p>
                  Premium amounts are based on age, health status, and coverage level selected. 
                  Premiums are subject to annual review and adjustment.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="cancellation">
              <AccordionTrigger className="text-left">Cancellation Policy</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p className="mb-3">
                  You may cancel your policy at any time with 30 days written notice. 
                  Pro-rated refunds are available for annual premium payments.
                </p>
                <p>
                  The insurer reserves the right to cancel coverage for non-payment, fraud, or material misrepresentation. 
                  Written notice will be provided 60 days prior to cancellation.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
