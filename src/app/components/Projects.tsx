"use client";

import React from 'react';
import { Flex, Heading, Grid, Text, Icon } from '@/once-ui/components';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const Projects = () => {
    const [projectsRef, projectsVisible] = useScrollAnimation({ threshold: 0.1 });

    const projects = [
        {
            title: "ERP System Integration",
            description: "Led the development of a comprehensive ERP system integration, improving operational efficiency by 70%",
            technologies: ["Python", "JavaScript", "SQL", "REST APIs"],
            link: "https://github.com/yourusername/erp-integration"
        },
        {
            title: "E-commerce Platform",
            description: "Built a scalable e-commerce platform handling 10,000+ daily transactions",
            technologies: ["Node.js", "React", "MongoDB", "AWS"],
            link: "https://github.com/yourusername/ecommerce-platform"
        },
        {
            title: "Automated Workflow System",
            description: "Developed an automated workflow system reducing manual processes by 85%",
            technologies: ["Python", "Docker", "Redis", "Microservices"],
            link: "https://github.com/yourusername/workflow-automation"
        }
    ];

    return (
        <Flex
            ref={projectsRef}
            as="section"
            id="projects"
            fillWidth
            minHeight="100vh"
            maxWidth={68}
            direction="column"
            alignItems="center"
            justifyContent="center"
            padding="xl"
            style={{
                transform: projectsVisible ? 'translateY(0)' : 'translateY(100px)',
                opacity: projectsVisible ? 1 : 0,
                transition: 'all 1s ease-out'
            }}
        >
            <Heading
                variant="display-strong-l"
                style={{ marginBottom: 'var(--static-space-32)', textAlign: 'center' }}
            >
                Featured Projects
            </Heading>
            <Grid
                fillWidth
                columns="repeat(3, 1fr)"
                tabletColumns="repeat(2, 1fr)"
                mobileColumns="1col"
                gap="32"
            >
                {projects.map((project, index) => (
                    <Flex
                        key={index}
                        direction="column"
                        gap="16"
                        padding="32"
                        radius="l"
                        border="neutral-medium"
                        borderStyle="solid-1"
                        style={{
                            transform: `translateY(${index * 10}px)`,
                            transition: 'transform 0.3s ease',
                            ':hover': {
                                transform: 'translateY(-5px)'
                            }
                        }}
                    >
                        <Heading variant="heading-strong-m">{project.title}</Heading>
                        <Text
                            variant="body-default-m"
                            onBackground="neutral-medium"
                            style={{ flex: 1 }}
                        >
                            {project.description}
                        </Text>
                        <Flex direction="column" gap="8">
                            <Text variant="body-strong-s">Technologies used:</Text>
                            <Flex gap="8" flexWrap="wrap">
                                {project.technologies.map((tech, i) => (
                                    <Text
                                        key={i}
                                        variant="body-default-s"
                                        onBackground="neutral-weak"
                                        style={{
                                            padding: '4px 8px',
                                            backgroundColor: 'var(--neutral-background-weak)',
                                            borderRadius: 'var(--border-radius-s)'
                                        }}
                                    >
                                        {tech}
                                    </Text>
                                ))}
                            </Flex>
                        </Flex>
                        <Flex
                            as="a"
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            alignItems="center"
                            gap="8"
                            style={{ textDecoration: 'none' }}
                        >
                            <Text
                                variant="body-strong-s"
                                onBackground="neutral-strong"
                            >
                                View Project
                            </Text>
                            <Icon name="arrowUpRight" size="s" />
                        </Flex>
                    </Flex>
                ))}
            </Grid>
        </Flex>
    );
};