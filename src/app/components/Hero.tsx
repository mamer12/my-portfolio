import { Flex, Text } from '@/once-ui/components';

const Hero = () => {
    return (
        <Flex
            as="section"
            direction="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            padding={{ base: '2rem', md: '4rem' }}
            gap="2rem"
        >
            <Text
                as="h1"
                fontSize={{ base: '2.5rem', md: '3.5rem', lg: '4rem' }}
                fontWeight="bold"
                textAlign="center"
                lineHeight="1.2"
            >
                Building Digital Experiences That Matter
            </Text>
            <Text
                fontSize={{ base: 'lg', md: 'xl' }}
                textAlign="center"
                maxWidth="800px"
                color="var(--brand-on-background-medium)"
            >
                Full-stack developer crafting innovative solutions with modern technologies. 
                Turning complex problems into elegant, user-friendly applications.
            </Text>
        </Flex>
    );
};

export { Hero };