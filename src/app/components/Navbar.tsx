// ... other imports ...
import { Button, Flex, Logo } from '@/once-ui/components';
import { BackgroundMusic } from './BackgroundMusic';
import Link from 'next/link';

export const Navbar = () => {


    const navLinks = [
        { href: "#about", title: "About" },
        { href: "#experience", title: "Experience" },
        { href: "#skills", title: "Skills" },
        { href: "#contact", title: "Contact" },
    ];

    return (
        <nav>
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
                        <BackgroundMusic />
                    </Flex>
                </Flex>
            </Flex>
            <BackgroundMusic />

        </nav>
    );
};