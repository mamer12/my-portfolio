"use client";

import React, { useEffect, useState } from "react";
import { Flex, Heading, Grid, Button, Background, RevealFx, Text, Logo, Icon } from "@/once-ui/components";
import Loader from "./components/loader";
import Link from "next/link";
import { useScrollAnimation } from './hooks/useScrollAnimation';
import { BackgroundMusic } from "./components/BackgroundMusic";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  // Update the useScrollAnimation hook configuration
  const [experienceRef, experienceVisible] = useScrollAnimation({ threshold: 0.1 });
  const [aboutRef, aboutVisible] = useScrollAnimation({ threshold: 0.1 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const navLinks = [
    { href: "#about", title: "About" },
    { href: "#experience", title: "Experience" },
    { href: "#skills", title: "Skills" },
    { href: "#contact", title: "Contact" },
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Flex
      fillWidth
      direction="column"
      alignItems="center"
      flex={1}
    >
      <BackgroundMusic />
      <Background dots={false} />
      <Flex
        as="header"
        fillWidth
        padding="m"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          zIndex: 100
        }}
      >
        <Flex
          fillWidth
          maxWidth={68}
          justifyContent="space-between"
          alignItems="center"
          style={{ margin: 'auto' }}
        >
          <Logo size="m" />
          <Flex gap="32" alignItems="center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  color: 'var(--neutral-on-background-strong)',
                  textDecoration: 'none',
                  fontSize: 'var(--font-size-m)'
                }}
              >
                {link.title}
              </Link>
            ))}
            <Button variant="primary">Download CV</Button>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        position="relative"
        as="section"
        overflow="hidden"
        fillWidth
        style={{ height: '100vh' }}
        maxWidth={68}
        direction="column"
        alignItems="center"
        paddingTop="104"
      >
        <Flex
          as="main"
          direction="column"
          justifyContent="center"
          fillWidth
          fillHeight
          padding="l"
          gap="l"
        >
          <Flex
            fillWidth
            fillHeight
            direction="column"
            alignItems="center"
            justifyContent="center"
            gap="32"
            padding="xl"
          >
            <RevealFx speed="medium" delay={0.2} translateY={20}>
              <Heading
                variant="display-strong-xl"
                style={{ textAlign: 'center' }}
              >
                Hi, Mustafa AMER
              </Heading>
            </RevealFx>
            <RevealFx speed="medium" delay={0.4} translateY={20}>
              <Text
                variant="heading-default-l"
                onBackground="neutral-medium"
                style={{ textAlign: 'center' }}
              >
                Backend Developer | Automation Specialist
              </Text>
            </RevealFx>
            <RevealFx speed="medium" delay={0.6} translateY={20}>
              <Flex gap="16">
                <Button
                  variant="primary"
                  href="#contact"
                  suffixIcon="arrowRight"
                >
                  Contact Me
                </Button>
                <Button
                  variant="secondary"
                  href="/cv.pdf"
                  suffixIcon="download"
                >
                  Download CV
                </Button>
              </Flex>
            </RevealFx>
          </Flex>
          <Grid
            radius="l"
            border="neutral-medium"
            borderStyle="solid-1"
            columns="repeat(3, 1fr)"
            tabletColumns="1col"
            mobileColumns="1col"
            fillWidth
          >
            {[
              {
                href: "https://github.com/mamer12",
                title: "GitHub",
                description: "Check out my open source projects and contributions",
                icon: "github"
              },
              {
                href: "https://www.linkedin.com/in/mamerma1234",
                title: "LinkedIn",
                description: "Connect with me professionally",
                icon: "linkedin"
              },
              {
                href: "mailto:mamer.ma1234@gmail.com",
                title: "Email",
                description: "Get in touch: mamer.ma1234@gmail.com",
                icon: "mail"
              }
            ].map((link) => (
              <Link
                target="_blank"
                style={{ padding: "var(--responsive-space-l)" }}
                key={link.href}
                href={link.href}
              >
                <Flex fillWidth paddingY="8" gap="8" direction="column">
                  <Flex fillWidth gap="12" alignItems="center">
                    <Icon size="m" name={link.icon} />
                    <Text variant="body-strong-m" onBackground="neutral-strong">
                      {link.title}
                    </Text>
                    <Icon size="s" name="arrowUpRight" />
                  </Flex>
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    {link.description}
                  </Text>
                </Flex>
              </Link>
            ))}
          </Grid>
        </Flex>
      </Flex>
      <Flex
        ref={experienceRef}
        as="section"
        id="experience"
        fillWidth

        maxWidth={68}
        direction="column"
        alignItems="center"
        justifyContent="center"
        padding="xl"
        style={{
          transform: `translateY(${experienceVisible ? '0' : '100px'}) translateZ(${experienceVisible ? '0' : '-100px'})`,
          opacity: experienceVisible ? 1 : 0,
          transition: 'all 1s ease-out',
          perspective: '1000px',
          willChange: 'transform',
          height: '100vh'
        }}
      >
        <RevealFx speed="medium" delay={0.2} translateY={20}>
          <Heading
            variant="display-strong-l"
            style={{ textAlign: 'center', marginBottom: 'var(--static-space-32)' }}
          >
            Experience
          </Heading>
        </RevealFx>
        <Grid
          fillWidth
          gap="32"
          columns="1col"
        >
          {[
            {
              company: "First Finance Company",
              role: "Software Engineer",
              period: "2023 - Present",
              achievements: [
                "Developed and maintained ERP systems using Python and JavaScript",
                "Implemented automated workflows increasing efficiency by 70%",
                "Led integration of multiple third-party financial services"
              ]
            },
            {
              company: "Creative Advanced Technology",
              role: "Backend Developer",
              period: "2022 - 2023",
              achievements: [
                "Built scalable APIs using Node.js and Express",
                "Managed MySQL and MongoDB databases",
                "Implemented secure payment gateway integrations"
              ]
            },
            {
              company: "Earthlink Telecommunications",
              role: "Software Developer",
              period: "2021 - 2022",
              achievements: [
                "Developed customer management systems",
                "Optimized database performance and queries",
                "Created automated reporting solutions"
              ]
            },
            {
              company: "Pure Platform",
              role: "Junior Developer",
              period: "2020 - 2021",
              achievements: [
                "Developed web applications using React and Node.js",
                "Implemented responsive UI designs",
                "Collaborated on API development and integration"
              ]
            }
          ].map((exp, index) => (
            <RevealFx key={index} speed="medium" delay={0.2 * (index + 1)} translateY={20}>
              <Flex
                fillWidth
                direction="column"
                gap="16"
                padding="32"
                radius="l"
                border="neutral-medium"
                borderStyle="solid-1"
                style={{
                  transform: `translateY(${index * 10}px) translateZ(${experienceVisible ? '0' : '-50px'})`,
                  transition: 'all 0.5s ease-out',
                  position: 'relative',
                  // '::before': {
                  //   content: `"${index + 1}"`,
                  //   position: 'absolute',
                  //   top: '-20px',
                  //   left: '-20px',
                  //   width: '40px',
                  //   height: '40px',
                  //   background: 'var(--primary-solid-medium)',
                  //   borderRadius: '50%',
                  //   display: 'flex',
                  //   alignItems: 'center',
                  //   justifyContent: 'center',
                  //   color: 'var(--neutral-on-solid-strong)',
                  //   fontSize: 'var(--font-size-l)',
                  //   fontWeight: 'bold'
                  // }
                }}
              >
                <Flex fillWidth justifyContent="space-between" alignItems="center">
                  <Heading variant="heading-strong-m">{exp.company}</Heading>
                  <Text variant="body-default-m" onBackground="neutral-medium">{exp.period}</Text>
                </Flex>
                <Text variant="body-strong-m" onBackground="neutral-strong">{exp.role}</Text>
                <Flex direction="column" gap="8">
                  {exp.achievements.map((achievement, i) => (
                    <Flex key={i} gap="8" alignItems="center">
                      <Icon name="check" size="s" />
                      <Text variant="body-default-m">{achievement}</Text>
                    </Flex>
                  ))}
                </Flex>
              </Flex>
            </RevealFx>
          ))}
        </Grid>
      </Flex>
      <Flex
        ref={aboutRef}
        as="section"
        id="about"
        fillWidth

        maxWidth={68}
        direction="column"
        alignItems="center"
        justifyContent="center"
        padding="xl"
        style={{
          transform: aboutVisible ? 'translateY(0)' : 'translateY(100px)',
          opacity: aboutVisible ? 1 : 0,
          transition: 'all 1s ease-out',
          perspective: '1000px',
          willChange: 'transform',
          minHeight: '100vh'
        }}
      >
        <RevealFx speed="medium" delay={0.2} translateY={20}>
          <Heading
            variant="display-strong-l"
            style={{ textAlign: 'center', marginBottom: 'var(--static-space-32)' }}
          >
            About Me
          </Heading>
        </RevealFx>
        <Grid
          columns="repeat(2, 1fr)"
          tabletColumns="1col"
          mobileColumns="1col"
          gap="xl"
          fillWidth
        >
          <Flex
            fillWidth
            fillHeight
            justifyContent="center"
            alignItems="center"
          >
            <RevealFx speed="medium" delay={0.4} translateY={20}>
              <Flex
                radius="full"
                style={{
                  width: 'var(--static-space-160)',
                  height: 'var(--static-space-160)',
                  background: 'var(--neutral-solid-medium)',
                }}
              />
            </RevealFx>
          </Flex>
          <Flex
            direction="column"
            gap="24"
          >
            <RevealFx speed="medium" delay={0.6} translateY={20}>
              <Text
                variant="body-default-l"
                onBackground="neutral-strong"
                style={{ lineHeight: '1.6' }}
              >
                I'm a Software Engineer specializing in backend development, with expertise in SQL and NoSQL databases, process automation, and system integration. I have a proven track record of leading digital transformations and ERP implementations, increasing operational efficiency by up to 70%.
              </Text>
            </RevealFx>
            <RevealFx speed="medium" delay={0.8} translateY={20}>
              <Text
                variant="body-default-l"
                onBackground="neutral-strong"
                style={{ lineHeight: '1.6' }}
              >
                My technical skills include JavaScript, Python, Ruby on Rails, NodeJS, Flutter, and ReactJS. I'm experienced in database management with MySQL, PostgreSQL, MongoDB, and Firebase. I excel in workflow automation, DevOps practices with Docker and AWS, and have successfully implemented various ERP solutions.
              </Text>
            </RevealFx>
            <RevealFx speed="medium" delay={1} translateY={20}>
              <Button
                variant="secondary"
                href="/detailed-bio.pdf"
                suffixIcon="arrowRight"
              >
                Learn More
              </Button>
            </RevealFx>
          </Flex>
        </Grid>
      </Flex>
      <Flex
        as="section"
        id="skills"
        fillWidth
        style={{ minHeight: '100vh' }}
        maxWidth={68}
        direction="column"
        alignItems="center"
        justifyContent="center"
        padding="xl"
      >
        <RevealFx speed="medium" delay={0.2} translateY={20}>
          <Heading
            variant="display-strong-l"
            style={{ textAlign: 'center', marginBottom: 'var(--static-space-32)' }}
          >
            Skills & Technologies
          </Heading>
        </RevealFx>
        <Grid
          fillWidth
          columns="repeat(4, 1fr)"
          tabletColumns="2col"
          mobileColumns="1col"
          gap="32"
        >
          {[
            {
              category: "Languages",
              skills: ["Python", "JavaScript", "TypeScript", "Ruby"],
              icon: "code"
            },
            {
              category: "Frameworks",
              skills: ["Node.js", "Express", "React", "Rails"],
              icon: "layout"
            },
            {
              category: "Databases",
              skills: ["MySQL", "MongoDB", "PostgreSQL", "Firebase"],
              icon: "database"
            },
            {
              category: "DevOps",
              skills: ["Docker", "AWS", "CI/CD", "Git"],
              icon: "settings"
            }
          ].map((category, index) => (
            <RevealFx key={index} speed="medium" delay={0.2 * (index + 1)} translateY={20}>
              <Flex
                fillWidth
                direction="column"
                gap="16"
                padding="32"
                radius="l"
                border="neutral-medium"
                borderStyle="solid-1"
                style={{
                  transition: 'transform 0.3s ease',
                  // ':hover': {
                  //   transform: 'translateY(-5px)'
                  // }
                }}
              >
                <Flex gap="12" alignItems="center">
                  <Icon name={category.icon} size="m" />
                  <Heading variant="heading-strong-m">{category.category}</Heading>
                </Flex>
                <Flex direction="column" gap="8">
                  {category.skills.map((skill, i) => (
                    <Flex key={i} gap="8" alignItems="center">
                      <Icon name="check" size="s" />
                      <Text variant="body-default-m">{skill}</Text>
                    </Flex>
                  ))}
                </Flex>
              </Flex>
            </RevealFx>
          ))}
        </Grid>
      </Flex>
      <Flex
        as="section"
        id="contact"
        fillWidth
        style={{ minHeight: '100vh' }}
        maxWidth={68}
        direction="column"
        alignItems="center"
        justifyContent="center"
        padding="xl"
      >
        <RevealFx speed="medium" delay={0.2} translateY={20}>
          <Heading
            variant="display-strong-l"
            style={{ textAlign: 'center', marginBottom: 'var(--static-space-32)' }}
          >
            Hello
          </Heading>
        </RevealFx>
        <Grid
          fillWidth
          columns="repeat(2, 1fr)"
          tabletColumns="1col"
          mobileColumns="1col"
          gap="32"
        >
          <RevealFx speed="medium" delay={0.4} translateY={20}>
            <Flex
              fillWidth
              direction="column"
              gap="24"
              padding="32"
              radius="l"
              border="neutral-medium"
              borderStyle="solid-1"
              style={{
                transition: 'transform 0.3s ease',
                // ':hover': {
                //   transform: 'translateY(-5px)'
                // }
              }}
            >
              <Heading variant="heading-strong-m">Get in Touch</Heading>
              <Text variant="body-default-m" onBackground="neutral-medium">
                Feel free to reach out for collaborations, opportunities, or just to say hello!
              </Text>
              <Flex direction="column" gap="16">
                <Link href="mailto:mamer.ma1234@gmail.com" style={{ textDecoration: 'none' }}>
                  <Flex gap="12" alignItems="center">
                    <Icon name="mail" size="m" />
                    <Text variant="body-strong-m">mamer.ma1234@gmail.com</Text>
                  </Flex>
                </Link>
                <Link href="https://www.linkedin.com/in/mamerma1234" target="_blank" style={{ textDecoration: 'none' }}>
                  <Flex gap="12" alignItems="center">
                    <Icon name="linkedin" size="m" />
                    <Text variant="body-strong-m">LinkedIn</Text>
                  </Flex>
                </Link>
              </Flex>
            </Flex>
          </RevealFx>
          <RevealFx speed="medium" delay={0.6} translateY={20}>
            <Flex
              fillWidth
              direction="column"
              gap="24"
              padding="32"
              radius="l"
              border="neutral-medium"
              borderStyle="solid-1"
              style={{
                transition: 'transform 0.3s ease',
                // ':hover': {
                //   transform: 'translateY(-5px)'
                // }
              }}
            >
              <Heading variant="heading-strong-m">Quick Links</Heading>
              <Flex direction="column" gap="16">
                {navLinks.map((link, index) => (
                  <Link key={index} href={link.href} style={{ textDecoration: 'none' }}>
                    <Flex gap="12" alignItems="center">
                      <Icon name="arrowRight" size="m" />
                      <Text variant="body-strong-m">{link.title}</Text>
                    </Flex>
                  </Link>
                ))}
              </Flex>
            </Flex>
          </RevealFx>
        </Grid>
      </Flex>
      <Flex
        as="footer"
        position="relative"
        fillWidth
        paddingX="l"
        paddingY="m"
        justifyContent="space-between"
      >
        <Text variant="body-default-s" onBackground="neutral-weak">
          © 2024 Mustafa Amer
        </Text>
        <Flex gap="12">
          <Button
            href="https://github.com/mamer12"
            prefixIcon="github"
            size="s"
            variant="tertiary"
          >
            GitHub
          </Button>
          <Button
            href="https://www.linkedin.com/in/mamerma1234"
            prefixIcon="linkedin"
            size="s"
            variant="tertiary"
          >
            LinkedIn
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
