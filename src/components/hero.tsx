
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Marquee } from "@/components/magicui/marquee";
import { WordRotate } from "@/components/magicui/word-rotate";
import { FaReact, FaNodeJs, FaDocker, FaGithub, FaPython, FaAws } from "react-icons/fa";
import {
    SiTypescript, SiJavascript, SiNextdotjs, SiRubyonrails, SiFlutter,
    SiGraphql, SiMysql, SiPostgresql, SiMongodb, SiFirebase,
    SiGit
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { BsDatabaseCheck } from "react-icons/bs";

const skillCategories = {
    development: [
        { name: "JavaScript", icon: SiJavascript },
        { name: "TypeScript", icon: SiTypescript },
        { name: "Python", icon: FaPython },
        { name: "Ruby on Rails", icon: SiRubyonrails },
        { name: "Node.js", icon: FaNodeJs },
        { name: "Flutter", icon: SiFlutter },
        { name: "React", icon: FaReact },
        { name: "Next.js", icon: SiNextdotjs },
        { name: "GraphQL", icon: SiGraphql },
        { name: "REST API", icon: TbApi },
    ],
    database: [
        { name: "MySQL", icon: SiMysql },
        { name: "PostgreSQL", icon: SiPostgresql },
        { name: "MongoDB", icon: SiMongodb },
        { name: "Firebase", icon: SiFirebase },
        { name: "Database", icon: BsDatabaseCheck },
    ],
    devops: [
        { name: "Docker", icon: FaDocker },
        { name: "AWS", icon: FaAws },
        { name: "Git", icon: SiGit },
        { name: "GitHub", icon: FaGithub },
    ],
};

const IconCard = ({ icon: Icon }: { icon: React.ElementType; }) => {
    return (
        <div
            className={cn(
                "relative h-20 w-20 cursor-pointer overflow-hidden rounded-xl border p-3 mx-2",
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
            )}
        >
            <Icon className="w-full h-full" />
        </div>
    );
};

export default function Hero() {
    return (
        <div className="relative flex w-screen min-h-screen flex-col items-center justify-center gap-6 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_50%,#1a1a1a,transparent)]" />
            
            <div className="relative z-10 flex flex-col items-center justify-center gap-4">
                <BlurFade delay={0.25} inView>
                    <h2 className="text-4xl md:text-6xl xl:text-7xl font-mono font-bold tracking-tight text-center">
                        Hello There <span className="inline-block animate-wave">👋</span>
                    </h2>
                </BlurFade>
                
                <BlurFade delay={0.5} inView>
                    <span className="text-2xl md:text-4xl xl:text-5xl font-mono tracking-tight text-center">
                        It&apos;s Mustafa !
                    </span>
                </BlurFade>

                <BlurFade delay={0.75} inView>
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-xl sm:text-2xl md:text-4xl xl:text-5xl font-mono tracking-tight text-center mt-8">
                        <span>Experienced</span>
                        <WordRotate words={["Full Stack", "Backend", "Automation", "ERP"]} />
                        <span>Developer</span>
                    </div>
                </BlurFade>

                <BlurFade delay={1} inView>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 sm:mt-12">
                        <a
                            href="https://github.com/mamer12"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 sm:px-8 py-2 sm:py-3 rounded-xl bg-gray-900/50 hover:bg-gray-900/80 backdrop-blur-sm transition-all flex items-center justify-center gap-2 border border-gray-800 w-full sm:w-auto"
                        >
                            <FaGithub className="w-5 h-5 sm:w-6 sm:h-6" />
                            <span className="font-mono text-sm sm:text-base">GitHub</span>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/mustafa-amer-b0b1b1b1/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 sm:px-8 py-2 sm:py-3 rounded-xl bg-gray-900/50 hover:bg-gray-900/80 backdrop-blur-sm transition-all flex items-center justify-center gap-2 border border-gray-800 w-full sm:w-auto"
                        >
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                            <span className="font-mono text-sm sm:text-base">LinkedIn</span>
                        </a>
                        <a
                            href="/assets/files/cv.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 sm:px-8 py-2 sm:py-3 rounded-xl bg-gray-900/50 hover:bg-gray-900/80 backdrop-blur-sm transition-all flex items-center justify-center gap-2 border border-gray-800 w-full sm:w-auto"
                        >
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" /></svg>
                            <span className="font-mono text-sm sm:text-base">Resume</span>
                        </a>
                    </div>
                </BlurFade>
            </div>

            <div className="relative z-10 w-full flex flex-col items-center justify-center gap-8 overflow-hidden mt-12">
                <Marquee pauseOnHover className="[--duration:40s]">
                    {skillCategories.development.map((item) => (
                        <IconCard key={item.name} {...item} />
                    ))}
                </Marquee>
            

                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
            </div>

            <style jsx>{`
                @keyframes wave {
                    0%, 100% { transform: rotate(0deg); }
                    25% { transform: rotate(-10deg); }
                    75% { transform: rotate(10deg); }
                }
                .animate-wave {
                    animation: wave 1.5s infinite;
                    transform-origin: 70% 70%;
                }
            `}</style>
        </div>
    );
}
