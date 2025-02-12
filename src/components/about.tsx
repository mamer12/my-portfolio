"use client"

import { BlurFade } from "@/components/magicui/blur-fade";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";

export default function About() {
  return (
    <section className="relative flex w-screen min-h-screen flex-col items-center justify-center gap-6 overflow-hidden bg-background py-10">
      <BlurFade delay={0.25} inView>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none mb-8">
          About Me
        </h2>
      </BlurFade>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <BlurFade delay={0.5} inView>
            <NeonGradientCard className="h-full">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Professional Experience</h3>
                <p className="text-pretty">
                  Currently working as a Software Engineer at First Finance Company (FFC), where I designed and implemented a customer onboarding system with OTP, AML, and identity verification integrations. Previously, I contributed to digital transformations at Earthlink Telecommunications and Creative Advanced Technology, focusing on process automation and system optimization.
                </p>
              </div>
            </NeonGradientCard>
          </BlurFade>

          <BlurFade delay={0.75} inView>
            <NeonGradientCard className="h-full">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Expertise</h3>
                <p className="text-pretty">
                  Specialized in ERP implementations, workflow automation, and system integration. Proficient in designing scalable backend solutions using Node.js, Python, and Ruby on Rails. Experienced in both SQL and NoSQL databases, with a strong focus on security and performance optimization. Remote work experience with US-based companies, demonstrating excellent cross-functional collaboration skills.
                </p>
              </div>
            </NeonGradientCard>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}