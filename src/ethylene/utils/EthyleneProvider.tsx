import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../store";

export const EthyleneProvider = ({
  children,
  context,
}: {
  children: ReactNode;
  context: any;
}) => {
  return (
    <Provider context={context} store={store}>
      {children}
    </Provider>
  );
};
