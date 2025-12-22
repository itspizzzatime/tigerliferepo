"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const reviews = [
  {
    name: "Sarah L.",
    avatar: "SL",
    text: "Tiger Insurance made finding the right plan so easy. Their team was incredibly helpful and patient. I finally have peace of mind knowing my family is covered. Highly recommended!",
    location: "New York, NY",
  },
  {
    name: "Michael B.",
    avatar: "MB",
    text: "I was overwhelmed by all the options out there, but the premium calculator gave me a clear starting point. The application was quick, and I got a great rate. Fantastic service!",
    location: "Austin, TX",
  },
  {
    name: "Jessica P.",
    avatar: "JP",
    text: "The customer support is top-notch. They answered all my questions and helped me choose a plan that perfectly fits my needs. I feel secure with Tiger Insurance.",
    location: "Chicago, IL",
  },
];


export default function ClientReviews() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
        <p className="text-muted-foreground mb-12">
          We're proud to have protected thousands of families. Here's what some of them have to say.
        </p>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {reviews.map((review, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/1">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      <p className="text-muted-foreground mb-4">"{review.text}"</p>
                      <div className="flex items-center gap-4">
                        <Avatar>
                           <AvatarImage src={`https://avatar.vercel.sh/${review.name}.png`} alt={review.name} />
                          <AvatarFallback>{review.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{review.name}</p>
                          <p className="text-sm text-muted-foreground">{review.location}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
