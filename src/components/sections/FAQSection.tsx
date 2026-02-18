import { HelpCircle } from "lucide-react"
import AnimatedSection from "@/components/shared/AnimatedSection"
import GlassCard from "@/components/shared/GlassCard"
import { faqItems } from "@/data/faq"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQSection() {
  return (
    <section className="relative py-20 sm:py-24">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <AnimatedSection className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
            <HelpCircle className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300 font-medium">FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-violet-200 bg-clip-text text-transparent">
              H&auml;ufig gestellte Fragen
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Die wichtigsten Fragen rund um Casino Boni, Umsatzbedingungen und
            sichere Online Casinos &ndash; verst&auml;ndlich erkl&auml;rt.
          </p>
        </AnimatedSection>

        {/* FAQ Accordion */}
        <AnimatedSection delay={0.2}>
          <GlassCard className="p-6 sm:p-8">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border-white/10 last:border-b-0"
                >
                  <AccordionTrigger className="text-left text-white hover:text-purple-300 hover:no-underline text-base py-5 [&[data-state=open]]:text-purple-400">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400 leading-relaxed text-sm sm:text-base pb-5">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </GlassCard>
        </AnimatedSection>

        {/* Bottom note */}
        <AnimatedSection delay={0.3}>
          <p className="mt-8 text-center text-sm text-gray-500">
            Weitere Fragen? Schreib uns im{" "}
            <a
              href="#"
              className="text-purple-400 hover:text-purple-300 underline underline-offset-2 transition-colors"
            >
              Community-Chat
            </a>{" "}
            oder auf{" "}
            <a
              href="https://www.twitch.tv/robertovstheworld"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 underline underline-offset-2 transition-colors"
            >
              Twitch
            </a>
            .
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
