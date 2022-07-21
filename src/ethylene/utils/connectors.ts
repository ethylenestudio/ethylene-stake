import { EthyleneConnector } from "../types/app";

declare let globalThis: Window & any;

export const EthyleneInjectedConnector: EthyleneConnector = {
  name: "injected",
  provider: globalThis?.window?.ethereum as any,
};
