import { Header, Layout, Lock, Navbar, Rewards } from "components";
import type { NextPage } from "next";
import React, { useMemo, useState } from "react";
import { Container } from "ui";

export const GFetcherContext = React.createContext<{
  gFetcher: number;
  setGFetcher: (to: number) => void;
}>({
  gFetcher: 0,
  setGFetcher: () => undefined,
});

const Home: NextPage = () => {
  const [gFetcher, setGFetcher] = useState(0);

  const contextValue = useMemo(() => {
    return {
      gFetcher,
      setGFetcher,
    };
  }, [gFetcher, setGFetcher]);

  return (
    <GFetcherContext.Provider value={contextValue}>
      <Header title="Home" />
      <Navbar />
      <Layout>
        <Container className="pt-10 flex w-full items-start flex-1 flex-col md:flex-row justify-start md:justify-between">
          <div className="flex w-full md:w-7/12  flex-col mb-12 md:mb-0 h-full order-3 md:order-1 mt-5 md:mt-0">
            <Rewards />
          </div>
          <div className="ml-4 hidden md:block mr-4 order-2"></div>
          <div className="flex flex-col w-full md:w-5/12 order-1 md:order-3">
            <p className="text-base leading-8 mb-8">
              Convert CRV with the Liquid Locker and receive sdCRV in return.
              The initial CRV is then locked on the native protocol, for the
              maximum duration, and perpetually relocked. This locking allows
              for maximum rewards to be generated which will be the fuel to
              boost v2 strategies.
            </p>
            <Lock />
          </div>
        </Container>
      </Layout>
    </GFetcherContext.Provider>
  );
};

export default Home;
