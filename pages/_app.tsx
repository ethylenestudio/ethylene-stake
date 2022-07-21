import "styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "store";
import { useInitialTheme } from "hooks/useInitialTheme";
import { EthyleneProvider } from "ethylene/EthyleneProvider";

function StakeDao(props: AppProps) {
  return (
    <EthyleneProvider>
      <Provider store={store}>
        <Main {...props} />
      </Provider>
    </EthyleneProvider>
  );
}

function Main({ Component, pageProps }: AppProps) {
  useInitialTheme();
  return <Component {...pageProps} />;
}

export default StakeDao;
