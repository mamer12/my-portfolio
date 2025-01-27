import { Flex, Text } from '@/once-ui/components';

const About = () => {
    return (
        <Flex
            as="section"
            direction="column"
            css={{
                '@media (min-width: 768px)': {
                    flexDirection: 'row'
                }
            }}
            paddingX={{ base: '2rem', md: '4rem' }}
            gap="3rem"
            alignItems="center"
        >
            <Flex
                direction="column"
                gap="1.5rem"
                flex="1"
            >
                <Text
                    as="h2"
                    fontSize={{ base: '2rem', md: '2.5rem' }}
                    fontWeight="bold"
                >
                    About Me
                </Text>
                <Text
                    fontSize={{ base: 'md', md: 'lg' }}
                    color="var(--brand-on-background-medium)"
                >
                    With over [X] years of experience in software development, I specialize in 
                    creating scalable web applications that solve real-world problems. My expertise 
                    spans across frontend and backend development, with a particular focus on 
                    React, TypeScript, and modern cloud technologies.
                </Text>
            </Flex>
            {/* Add an image or illustration here */}
        </Flex>
    );
};

export { About };