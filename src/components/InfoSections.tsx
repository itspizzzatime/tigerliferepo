import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, FileText, Shield, Users, ScrollText, IdCard, ClipboardList } from "lucide-react";

export default function InfoSections() {
  return (
    <div className="pt-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-16 items-start">
          <Card data-testid="card-insurance-details" className="border-gray-200">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-11 h-11 rounded-lg bg-ust-gold/15 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-tiger-brown" />
                </div>
                <CardTitle className="text-2xl">Coverage Details</CardTitle>
              </div>
              <CardDescription>Comprehensive protection for your health</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-ust-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Hospitalization Coverage</p>
                    <p className="text-sm text-muted-foreground">Up to ₱30,000 per year</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-ust-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Outpatient Care</p>
                    <p className="text-sm text-muted-foreground">Doctor visits and consultations</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-ust-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Prescription Medications</p>
                    <p className="text-sm text-muted-foreground">Generic and brand-name drugs</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-ust-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Emergency Services</p>
                    <p className="text-sm text-muted-foreground">24/7 emergency room coverage</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* "How to Avail" is the action card — subtle gold-tinted treatment
              to signal it's the next-step card, distinct from the two
              reference cards on either side */}
          <Card
            data-testid="card-how-to-avail"
            className="border-ust-gold/30 bg-gradient-to-b from-ust-gold/[0.06] to-transparent shadow-md"
          >
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-11 h-11 rounded-lg bg-ust-gold/20 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-tiger-brown" />
                </div>
                <CardTitle className="text-2xl">How to Avail</CardTitle>
              </div>
              <CardDescription>Simple 4-step application process</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-tiger-brown text-white flex items-center justify-center font-semibold text-sm">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Fill Application</p>
                    <p className="text-sm text-muted-foreground">Complete the online form with your details</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-tiger-brown text-white flex items-center justify-center font-semibold text-sm">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Health Assessment</p>
                    <p className="text-sm text-muted-foreground">Answer health-related questions</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-tiger-brown text-white flex items-center justify-center font-semibold text-sm">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Instant Decision</p>
                    <p className="text-sm text-muted-foreground">Get approved within minutes</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-tiger-brown text-white flex items-center justify-center font-semibold text-sm">
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

          <Card data-testid="card-eligibility" className="border-gray-200">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-11 h-11 rounded-lg bg-ust-gold/15 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-tiger-brown" />
                </div>
                <CardTitle className="text-2xl">Eligibility</CardTitle>
              </div>
              <CardDescription>Who can apply for coverage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-ust-gold mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Certified Undergraduate Thomasian</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-ust-gold mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Ages 16-25 years old</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-ust-gold mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Currently enrolled</p>
                </div>

                <div className="p-4 bg-ust-gold/5 border border-ust-gold/20 rounded-md mt-4">
                  <p className="text-sm font-medium mb-3 text-tiger-brown">Required Documents</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-muted-foreground">
                      - Certificate of Registration
                    </li>
                    <li className="flex items-center gap-2 text-sm text-muted-foreground">
                      - School ID
                    </li>
                    <li className="flex items-center gap-2 text-sm text-muted-foreground">
                      - Medical history
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <h2 className="text-3xl font-bold text-tiger-brown">FAQs</h2>
          </div>

          <Accordion type="single" collapsible className="w-full" data-testid="accordion-terms">
            <AccordionItem value="privacy">
              <AccordionTrigger className="text-left">Privacy & Data Protection Terms</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p className="mb-3">
                  Your personal information is collected and used solely for{" "}
                  <strong className="text-foreground font-medium">verification, claims processing, and service enhancement</strong>.
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
                  <strong className="text-foreground font-medium">Pre-existing conditions may be subject to designated waiting periods.</strong>{" "}
                  Coverage remains valid only within the active policy period indicated in your policy documents.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="exclusions">
              <AccordionTrigger className="text-left">Exclusions & Limitations</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p className="mb-3">Your plan does not cover:</p>
                <ul className="list-disc pl-5 space-y-1 mb-3">
                  <li>Cosmetic treatments</li>
                  <li>Non-prescription services</li>
                  <li>Injuries resulting from intentional self-harm</li>
                  <li>Services obtained outside accredited providers, unless otherwise specified</li>
                </ul>
                <p>
                  Coverage for certain procedures may vary based on the plan tier selected.{" "}
                  <strong className="text-foreground font-medium">
                    Certain high-risk activities and injuries sustained during illegal activities are excluded from coverage.
                  </strong>
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="premium">
              <AccordionTrigger className="text-left">Premium Payment</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p className="mb-3">
                  Premium payments must be settled on or before their due dates to keep your policy active.{" "}
                  <strong className="text-foreground font-medium">
                    Late or missed payments may result in the temporary suspension or cancellation of benefits.
                  </strong>{" "}
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
                  You may cancel your policy at any time with{" "}
                  <strong className="text-foreground font-medium">30 days written notice</strong>.
                  Pro-rated refunds are available for annual premium payments.
                </p>
                <p>
                  The insurer reserves the right to cancel coverage for non-payment, fraud, or material misrepresentation.{" "}
                  <strong className="text-foreground font-medium">Written notice will be provided 60 days prior to cancellation.</strong>
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}