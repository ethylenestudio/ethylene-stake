import { Header, Layout, Lock, Navbar } from "components";
import type { NextPage } from "next";
import { Container } from "ui";

const Home: NextPage = () => {
  return (
    <>
      <Header title="Home" />
      <Navbar />
      <Layout>
        <Container className="pt-10 flex w-full items-start flex-1 flex-col md:flex-row justify-start md:justify-between">
          <div className="flex sm:w-full md:w-7/12 flex-col mb-12 md:mb-0">
            <h2 className="text-2xl mb-4">My rewards</h2>
            <span>You have no reward</span>
          </div>
          <div className="ml-4 hidden md:block mr-4"></div>
          <div className="flex flex-col w-full md:w-5/12">
            <p className="text-base leading-8 mb-8">
              Convert CRV with the Liquid Locker and receive sdCRV in return.
              The initial CRV is then locked on the native protocol, for the
              maximum duration, and perpetually relocked. This locking allows
              for maximum rewards to be generated which will be the fuel to
              boost v2 strategies
            </p>
            <Lock />
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default Home;
