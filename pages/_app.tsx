import "styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { stateStoreContext, store } from "store";
import { useInitialTheme } from "hooks/useInitialTheme";
import { EthyleneProvider } from "ethylene/utils";
import { ethyleneStoreConext } from "ethylene/store";

function StakeDao(props: AppProps) {
  return (
    <EthyleneProvider context={ethyleneStoreConext}>
      <Provider context={stateStoreContext as any} store={store}>
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
