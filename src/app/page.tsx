import { Hero } from "@/components/sections/hero";
import { Profile } from "@/components/sections/profile";
import { AiPractice } from "@/components/sections/ai-practice";
import { Impact } from "@/components/sections/impact";
import { Trajectory } from "@/components/sections/trajectory";
import { Work } from "@/components/sections/work";
import { Stack } from "@/components/sections/stack";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/layout/footer";

/**
 * The scrolling ticker that used to sit between Hero and Profile was removed.
 * It restated the hero metrics as twelve looping fragments and pulled the eye
 * sideways at exactly the point where the reader should be settling into the
 * first paragraph — the opposite of what this page is for.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Profile />
      <AiPractice />
      <Impact />
      <Trajectory />
      <Work />
      <Stack />
      <Contact />
      <Footer />
    </>
  );
}
