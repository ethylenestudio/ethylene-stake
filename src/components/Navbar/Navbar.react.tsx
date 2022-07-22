import React from "react";
import { Button, Container, Icon } from "ui";
import { ButtonColor } from "ui/Button/Button.react";
import { AiOutlineWallet } from "react-icons/ai";
import { useAccount, useConnection } from "ethylene/hooks";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import { useTheme } from "hooks";
import { formatAddress } from "utils/formatAddress";
import BlackLogo from "assets/logo/black.png";
import WhiteLogo from "assets/logo/white.png";

const Navbar = (): React.ReactElement => {
  const { theme } = useTheme();

  return (
    <header id="StakeDaoHeader" className="h-16">
      <Container className="flex items-center justify-between pt-3 pb-3">
        <div className="flex items-center">
          <img
            className="w-8 h-8"
            src={theme === "dark" ? WhiteLogo.src : BlackLogo.src}
            alt="Stake Dao Logo"
          />
          <h4 className="ml-2 text-base font-medium">STAKE DAO</h4>
        </div>
        <Buttons />
      </Container>
    </header>
  );
};

const Buttons = () => {
  const { connect } = useConnection();
  const { theme, toggleTheme } = useTheme();
  const { address } = useAccount();

  return (
    <div className="flex justify-end">
      <Button
        onClick={connect}
        leftEl={
          <Icon>
            <AiOutlineWallet />
          </Icon>
        }
        color={ButtonColor.purple}
      >
        {address ? formatAddress(address) : "Connect"}
      </Button>
      <Button className="ml-2" onClick={toggleTheme} color={ButtonColor.black}>
        <Icon>{theme === "dark" ? <BsMoonFill /> : <BsSunFill />}</Icon>
      </Button>
    </div>
  );
};

export { Navbar };
