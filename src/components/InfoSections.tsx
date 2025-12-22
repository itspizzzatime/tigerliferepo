"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldCheck, Users, HeartHandshake } from "lucide-react";

const info = [
    {
      icon: ShieldCheck,
      title: "Comprehensive Coverage",
      description: "From routine check-ups to unexpected emergencies, we have you covered. Our plans offer extensive benefits to ensure you get the best care without financial stress.",
    },
    {
      icon: Users,
      title: "Plans for Everyone",
      description: "Whether you are an individual, a family, or a business, we have a flexible plan tailored to your needs. Explore our options to find your perfect fit.",
    },
    {
      icon: HeartHandshake,
      title: "Dedicated Support",
      description: "Our team is here to help you navigate your insurance options. We're committed to providing personalized support to help you make informed decisions.",
    },
  ];

export default function InfoSections() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {info.map((item, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full mb-4 w-fit">
                    <item.icon className="h-8 w-8" />
                </div>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardDescription className="px-6 pb-6">
                {item.description}
              </CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
