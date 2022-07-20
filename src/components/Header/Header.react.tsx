import Head from "next/head";

type Props = Readonly<{ title?: string }>;

export const Header = ({ title }: Props) => {
  return (
    <Head>
      <title>{formatPageTitle(title)}</title>
      <meta
        name="description"
        content="Stake DAO is a non-custodial platform where you can do more with your money. Easily grow, track, and control your assets right from your wallet."
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

// Helpers

const formatPageTitle = (title?: string): string =>
  title ? `StakeDao | ${title}` : "StakeDao";

export { Head };
