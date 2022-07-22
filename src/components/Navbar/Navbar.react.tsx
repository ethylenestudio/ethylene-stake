import React from "react";
import { Button, Container, Icon } from "ui";
import { ButtonColor } from "ui/Button/Button.react";
import { AiOutlineWallet } from "react-icons/ai";
import { useAccount, useConnection } from "ethylene/hooks";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import { useTheme } from "hooks";
import { formatAddress } from "utils/formatAddress";

const Navbar = (): React.ReactElement => {
  return (
    <header>
      <Container className="flex align-center justify-between pt-3 pb-3">
        <span>Hello</span>
        <Buttons />
      </Container>
    </header>
  );
};

const Buttons = () => {
  const { connect } = useConnection();
  const { theme, toggleTheme } = useTheme();
  const { address } = useAccount();
  console.log(address);

  const handleClick = () => {
    return (
      <Button className="ml-2" onClick={connect} color={ButtonColor.black}>
        <Icon>{theme === "dark" ? <BsMoonFill /> : <BsSunFill />}</Icon>
      </Button>
    );
  };

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
