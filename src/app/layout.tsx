import "@/once-ui/styles/index.scss";
import "@/once-ui/tokens/index.scss";

import { Flex } from "@/once-ui/components";
import classNames from "classnames";
import { Raleway } from 'next/font/google';
import { Sora } from 'next/font/google';

import { Source_Code_Pro } from "next/font/google";

const primary = Raleway({
  variable: "--font-primary",
  subsets: ["latin"],
  display: "swap",
});

type FontConfig = {
  variable: string;
};

/*
	Replace with code for secondary and tertiary fonts
	from https://once-ui.com/customize
*/
const secondary = Sora({
    variable: '--font-secondary',
    subsets: ['latin'],
    display: 'swap'
});

const tertiary: FontConfig | undefined = undefined;
/*
 */

const code = Source_Code_Pro({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex
      as="html"
      lang="en"
      fillHeight
      background="page"
      data-theme="dark"
      data-brand="pink"
      data-accent="yellow"
      data-neutral="slate"
      data-border="playful"
      data-solid="contrast"
      data-solid-style="flat"
      data-surface="translucent"
      data-transition="all"
      className={classNames(
        primary.variable,
        secondary ? secondary.variable : "",
        tertiary ? tertiary.variable : "",
        code.variable,
        "root"
      )}
    >
      <Flex as="body" fillWidth fillHeight margin="0" padding="0">
        <Flex flex={1} direction="column">
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
}
