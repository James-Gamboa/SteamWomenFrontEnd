import { HeroSection } from "@/components/molecules/hero-section";
import { MissionVisionSection } from "@/components/molecules/mission-vision-section";
import { ValuesSection } from "@/components/molecules/values-section";
import { InteractiveTimelineSection } from "@/components/molecules/interactive-timeline-section";
import { StatisticsSection } from "@/components/molecules/statistics-section";
import { TestimonialsSection } from "@/components/molecules/testimonials-section";
import { PartnersSection } from "@/components/molecules/partners-section";
import { ContactFormSection } from "@/components/molecules/contact-form-section";
import { JoinMissionSection } from "@/components/molecules/join-mission-section";
import { FaqAccordion } from "@/components/molecules/FaqAccordion";

export function NosotrasTemplate() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#FFFFFF", paddingTop: "80px" }}
    >
      <HeroSection />
      <MissionVisionSection />
      <ValuesSection />
      <InteractiveTimelineSection />
      <StatisticsSection />
      <TestimonialsSection />
      <section id="preguntas-frecuentes">
        <FaqAccordion />
      </section>
      <PartnersSection />
      <section id="contacto">
        <ContactFormSection />
      </section>
      <JoinMissionSection />
    </div>
  );
}
