import { Flex, Text } from '@/once-ui/components';

const Contact = () => {
    return (
        <Flex
            as="section"
            direction="column"
            padding={{ base: '2rem', md: '4rem' }}
            gap="2rem"
            alignItems="center"
        >
            <Text
                as="h2"
                fontSize={{ base: '2rem', md: '2.5rem' }}
                fontWeight="bold"
                textAlign="center"
            >
                Let's Work Together
            </Text>
            <Text
                fontSize={{ base: 'md', md: 'lg' }}
                textAlign="center"
                maxWidth="600px"
                color="var(--brand-on-background-medium)"
            >
                Have a project in mind? I'm always open to discussing new opportunities 
                and innovative ideas.
            </Text>
            {/* Add contact form or links here */}
        </Flex>
    );
};

export { Contact };