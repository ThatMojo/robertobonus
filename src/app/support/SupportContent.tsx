"use client"

import {
  HelpCircle,
  MessageCircle,
  Send,
  Youtube,
  Instagram,
} from "lucide-react"
import AnimatedSection from "@/components/shared/AnimatedSection"
import GlassCard from "@/components/shared/GlassCard"
import { SOCIAL_LINKS, STREAMER_NAME } from "@/lib/constants"
import { faqItems } from "@/data/faq"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

const contactChannels = [
  {
    name: "Kick",
    description: `Live chat on the ${STREAMER_NAME} channel`,
    href: SOCIAL_LINKS.kick,
    icon: Send,
    color: "text-emerald-400 hover:text-emerald-300",
    bgHover: "hover:border-emerald-500/30",
  },
  {
    name: "YouTube",
    description: "Comments and community posts",
    href: SOCIAL_LINKS.youtube,
    icon: Youtube,
    color: "text-red-400 hover:text-red-300",
    bgHover: "hover:border-red-500/30",
  },
  {
    name: "Instagram",
    description: "Direct message via Instagram",
    href: SOCIAL_LINKS.instagram,
    icon: Instagram,
    color: "text-pink-400 hover:text-pink-300",
    bgHover: "hover:border-pink-500/30",
  },
]

export default function SupportContent() {
  return (
    <section className="relative py-20 sm:py-24">
      {/* Ambient glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <AnimatedSection className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
            <HelpCircle className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300 font-medium">
              Help &amp; Support
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-violet-200 bg-clip-text text-transparent">
              Support &amp; Help
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Find answers to common questions or get in touch with us directly.
            We are happy to help.
          </p>
        </AnimatedSection>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left: FAQ */}
          <AnimatedSection delay={0.15}>
            <GlassCard className="p-6 sm:p-8 h-full">
              <div className="flex items-center gap-2 mb-6">
                <MessageCircle className="w-5 h-5 text-purple-400" />
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Frequently Asked Questions
                </h2>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item) => (
                  <AccordionItem
                    key={item.id}
                    value={item.id}
                    className="border-white/10 last:border-b-0"
                  >
                    <AccordionTrigger className="text-left text-white hover:text-purple-300 hover:no-underline text-sm sm:text-base py-4 [&[data-state=open]]:text-purple-400">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-400 leading-relaxed text-sm pb-4">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </GlassCard>
          </AnimatedSection>

          {/* Right: Contact */}
          <div className="flex flex-col gap-6">
            {/* Social links */}
            <AnimatedSection delay={0.25}>
              <GlassCard className="p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-2">
                  <Send className="w-5 h-5 text-purple-400" />
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    Contact
                  </h2>
                </div>
                <p className="text-gray-400 text-sm mb-6">
                  Have a question or need help? Write to us!
                </p>

                <div className="space-y-3">
                  {contactChannels.map((channel) => (
                    <a
                      key={channel.name}
                      href={channel.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 ${channel.bgHover} hover:bg-white/10`}
                    >
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 ${channel.color} transition-colors`}
                      >
                        <channel.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block text-white font-medium text-sm">
                          {channel.name}
                        </span>
                        <span className="block text-gray-500 text-xs">
                          {channel.description}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </GlassCard>
            </AnimatedSection>

            {/* Contact form */}
            <AnimatedSection delay={0.35}>
              <GlassCard className="p-6 sm:p-8">
                <h3 className="text-base sm:text-lg font-bold text-white mb-4">
                  Send a Message
                </h3>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-gray-300 text-sm"
                    >
                      Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus-visible:border-purple-500 focus-visible:ring-purple-500/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-gray-300 text-sm"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus-visible:border-purple-500 focus-visible:ring-purple-500/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-gray-300 text-sm"
                    >
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="How can we help you?"
                      rows={4}
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus-visible:border-purple-500 focus-visible:ring-purple-500/20 min-h-[100px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </Button>
                </form>
              </GlassCard>
            </AnimatedSection>
          </div>
        </div>

        {/* Bottom note */}
        <AnimatedSection delay={0.45}>
          <p className="mt-10 text-center text-sm text-gray-500">
            We typically respond within 24 hours. For quick help, we recommend
            the{" "}
            <a
              href={SOCIAL_LINKS.kick}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 transition-colors"
            >
              Kick Live Chat
            </a>
            .
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
