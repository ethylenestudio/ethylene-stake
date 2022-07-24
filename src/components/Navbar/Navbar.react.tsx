import React from "react";
import { Button, Container, Icon, Modal } from "ui";
import { ButtonColor } from "ui/Button/Button.react";
import {
  AiFillExclamationCircle,
  AiOutlineUser,
  AiOutlineWallet,
} from "react-icons/ai";
import { useAccount, useConnection, useRightNetwork } from "ethylene/hooks";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import { useModal, useTheme } from "hooks";
import { formatAddress } from "utils/formatAddress";
import BlackLogo from "assets/logo/black.png";
import WhiteLogo from "assets/logo/white.png";
import { ETHEREUM_MAINNET_MOCK } from "const/networks";
import MetamaskImage from "assets/metamask.png";

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
  const { connect, disconnect } = useConnection();
  const { theme, toggleTheme } = useTheme();
  const { address, auth } = useAccount();
  const { isRightNetwork, switchTo } = useRightNetwork(ETHEREUM_MAINNET_MOCK);

  const modal = useModal();

  return (
    <>
      <Modal isOpen={modal.isOpen} close={modal.close}>
        <div className="w-80 flex flex-col">
          <div className="flex items-center">
            <span className="text-2xl">Connected</span>
            <img src={MetamaskImage.src} className="w-6 ml-2" />
          </div>

          <span className="mt-2">
            {address ? formatAddress(address) : null}
          </span>
          <Button
            onClick={() => {
              disconnect();
              modal.close();
            }}
            className="w-max mt-4"
            color={ButtonColor.purple}
          >
            Disconnect
          </Button>
        </div>
      </Modal>
      <div className="flex justify-end">
        {!isRightNetwork && auth && (
          <Button
            leftEl={
              <Icon>
                <AiFillExclamationCircle />
              </Icon>
            }
            textClassName="text-sm"
            className="mr-2"
            onClick={() => switchTo()}
            color={ButtonColor.black}
          >
            Switch to Ethereum
          </Button>
        )}
        <Button
          textClassName="text-sm"
          onClick={auth ? modal.open : connect}
          leftEl={<Icon>{auth ? <AiOutlineUser /> : <AiOutlineWallet />}</Icon>}
          color={ButtonColor.purple}
        >
          {address ? formatAddress(address) : "Connect"}
        </Button>
        <Button
          textClassName="text-sm"
          className="ml-2"
          onClick={toggleTheme}
          color={ButtonColor.black}
        >
          <Icon>{theme === "dark" ? <BsMoonFill /> : <BsSunFill />}</Icon>
        </Button>
      </div>
    </>
  );
};

export { Navbar };
