import { Button } from "@/components/ui/button";
import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import { features } from "@/data/features";
import {
  Card,
  CardContent,

} from "@/components/ui/card"
import { howItWorks } from "@/data/howItWorks";
import { testimonial } from "@/data/testimonial";
import { faqs } from "@/data/faqs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link";
import { ArrowBigRight, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div>
    <div className="grid-background"></div>

    <HeroSection></HeroSection>
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background ">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl tracking-tighter text-center font-bold mb-12">Powerful tool for your Career Growth</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
  {features.map((feature, index) => (
    <div key={index} className="flex"> {/* ✅ Ensures same height for all cards */}
      <Card className="border-2 hover:border-primary transition-colors duration-300 flex flex-col h-full w-full">
        <CardContent className="pt-6 text-center flex flex-col items-center flex-grow">
          <div className="flex flex-col items-center justify-center"> {/* ✅ Fix className typo */}
            {feature.icon}
            <h3 className="font-bold text-xl mb-2">{feature.title}</h3> {/* ✅ Better heading size */}
            <p className="text-muted-foreground">{feature.description}</p> {/* ✅ Better readability */}
          </div>
        </CardContent>
      </Card>
    </div>
  ))}
</div>

      </div>
    </section>

    <section className="w-full py-12 md:py-24  bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div className="flex flex-col  items-center justify-center space-y-2">
            <h3 className="text-4xl font-bold">50+ Industries</h3>
            <p className="text-muted-foreground">Industries Covered</p>
          </div>

          <div className="flex flex-col  items-center justify-center space-y-2">
            <h3 className="text-4xl font-bold">1000+ </h3>
            <p className="text-muted-foreground">Interview Questions</p>
          </div>

          <div className="flex flex-col  items-center justify-center space-y-2">
            <h3 className="text-4xl font-bold"> 95%  </h3>
            <p className="text-muted-foreground">success rate</p>
          </div>

          <div className="flex flex-col  items-center  justify-center space-y-2">
            <h3 className="text-4xl font-bold">24/7 </h3>
            <p className="text-muted-foreground">AI Support</p>
          </div>

        
        
    
    </div>
 
   </div>

      
    </section>

    <section className="w-full py-12 md:py-24 lg:py-32 bg-background ">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl  text-center font-bold mb-4">How It Works</h2>
        <p className="text-muted-foreground">For simple steps to accerlate your career growth</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
  {howItWorks.map((item, index) => (
    <div key={index} className=" flex flex-col items-center text-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
         {item.icon}
      </div>
      <h3 className="font-semibold text-xl">{item.title}</h3>
      <p className="text-muted-foreground">{item.description}</p>
    </div>
  ))}
</div>

      </div>
    </section>



    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl tracking-tighter text-center font-bold mb-12">What user's can say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3  gap-8 max-w-6xl mx-auto">
  {testimonial.map((testimonials, index) => (
    <div key={index} > {/* ✅ Ensures same height for all cards */}
      <Card   className="bg-background">
        <CardContent className="pt-6 ">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-4">
              <div className="relative h-12 w-12 flex-shrink-0">
              <Image
              width={40}
              height={40}
              src={testimonials.image}
              alt={"Author image"}
              className="rounded-full object-cover border-2 border-primary/20"
              />
              </div>
              <div>
                <p className="font-semibold">{testimonials.author}</p>
                <p className="text-sm text-muted-foreground">{testimonials.role}</p>
                <p className="text-sm text-primary">{testimonials.company}</p>
              </div>
            </div>
            <blockquote>
              <p className="text-muted-foreground  italic realtive">
                <span className="text-3xl text-primary absolute -top-4 -left-2">
               
                  </span>
                  {testimonials.quote}</p>
                  <span className="text-3xl text-primary absolute -bottom-4">
                
                  </span>
            </blockquote>
          </div>

        </CardContent>
       
      </Card>
    </div>
  ))}
</div>

      </div>
    </section>




    <section className="w-full py-12 md:py-24 lg:py-32 bg-background ">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl  text-center font-bold mb-4">Frequently Asked questions</h2>
        <p className="text-muted-foreground">Find answers to common questions about our platform </p>
        </div>
        <div className=" max-w-6xl mx-auto">
        <Accordion type="single" collapsible className='w-full'>
          {faqs.map((faq,index)=>{
           return(
          <AccordionItem key={index}  value={`item-${index}`}>
        <AccordionTrigger>{faq.question}</AccordionTrigger>
         <AccordionContent>
      {faq.answer}
       </AccordionContent>
    </AccordionItem>
      

           )
          })}
            </Accordion>
</div>

      </div>
    </section>
   

    <section className="w-full ">
  <div className="mx-auto py-24 gradient rounded-lg">
    <div className="flex flex-col items-center justify-center space-y-4 max-w-3xl mx-auto text-center">
      <h2 className="text-3xl font-bold  tracking-tighter text-primary-foreground sm:text-4xl md:text-5xl">
        Ready to Accelerate Your Career?
      </h2>
      <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl ">
        Join thousands of professionals who upskill their careers using AI-powered tools.
      </p>
   
    <Link href="/dashboard" passHref>
    <Button size="lg" variant="secondary" className="h-11 mt-5 animate-bounce">
        Start your journeyt today <ArrowRight className="ml-2 h-4 w-4"></ArrowRight>

    </Button>
    </Link>
    </div>
  </div>
</section>

  </div>   
    
   

  );
}
