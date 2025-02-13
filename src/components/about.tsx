"use client"
import { BlurFade } from "@/components/magicui/blur-fade";
import { BorderBeam } from "@/components/magicui/border-beam";

export default function About() {
    return (
        <section className="relative flex w-screen min-h-screen flex-col items-center justify-center gap-6 overflow-hidden py-10">
            <BlurFade delay={0.25} inView>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none mb-8">
                    About Me
                </h2>
            </BlurFade>
            <div className="container mx-auto px-4 bg-black">

                <BlurFade delay={0.75} inView>
                    <div className="relative rounded-lg border border-gray-950/[.1] dark:border-gray-50/[.1]">
                        <BorderBeam duration={6}
                            delay={3}
                            size={400}
                            className="from-transparent via-red-500 to-transparent" />
                        <div className="relative p-6 space-y-4">
                            <h3 className="text-2xl font-semibold">Expertise</h3>
                            <p className="text-pretty">
                                Specialized in ERP implementations, workflow automation, and system integration. Proficient in designing scalable backend solutions using Node.js, Python, and Ruby on Rails. Experienced in both SQL and NoSQL databases, with a strong focus on security and performance optimization. Remote work experience with US-based companies, demonstrating excellent cross-functional collaboration skills.
                            </p>
                        </div>


                    </div>
                </BlurFade>
            </div>

        </section>
    );
}