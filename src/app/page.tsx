"use client";
import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import PremiumCalculator from "@/components/PremiumCalculator";
import AboutUsSection from "@/components/AboutUsSection";
import ClientReviews from "@/components/ClientReviews";
import InfoSections from "@/components/InfoSections";
import ApplicationModal from "@/components/ApplicationModal";
import NavBar from "@/components/NavBar";
import ScrollAnimate from "@/components/ScrollAnimate";

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main>
        <HeroSection onStartApplication={() => setModalOpen(true)} />
        <ScrollAnimate>
          <PremiumCalculator />
        </ScrollAnimate>
        <ScrollAnimate>
          <AboutUsSection />
        </ScrollAnimate>
        <ScrollAnimate>
          <InfoSections />
        </ScrollAnimate>
        <ScrollAnimate>
          <ClientReviews />
        </ScrollAnimate>
      </main>

      <footer className="bg-card border-t py-12">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollAnimate>
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4 text-tiger-brown">TigerCare</h3>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Products</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Health Insurance</li>
                  <li>Life Insurance</li>
                  <li>Dental Coverage</li>
                  <li>Vision Coverage</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>About Us</li>
                  <li>Careers</li>
                  <li>Press</li>
                  <li>Partners</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Help Center</li>
                  <li>Contact Us</li>
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                </ul>
              </div>
            </div>
          </ScrollAnimate>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 TigerCare Insurance. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <ApplicationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
