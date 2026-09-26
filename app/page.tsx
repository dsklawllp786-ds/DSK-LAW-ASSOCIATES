import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppFAB } from "@/components/layout/WhatsAppFAB";
import { About } from "@/components/sections/About";
import { ConsultationForm } from "@/components/sections/ConsultationForm";
import { Contact } from "@/components/sections/Contact";
import { FAQs } from "@/components/sections/FAQs";
import { Hero } from "@/components/sections/Hero";
import { PracticeAreas } from "@/components/sections/PracticeAreas";
import { Services } from "@/components/sections/Services";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <PracticeAreas />
        <Services />
        <Team />
        <Testimonials />
        <ConsultationForm />
        <Contact />
        <FAQs />
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
