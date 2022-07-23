import "styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { stateStoreContext, store } from "store";
import { useInitialTheme } from "hooks/useInitialTheme";
import { EthyleneProvider } from "ethylene/utils";
import { ethyleneStoreConext } from "ethylene/store";
import { useOnAccountsChange, useOnNetworkChange } from "ethylene/hooks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "hooks";

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
  const { theme } = useTheme();

  useOnNetworkChange(() => window.location.reload());
  useOnAccountsChange(() => window.location.reload(), {
    interval: 1000,
  });

  return (
    <>
      <ToastContainer
        position="top-right"
        theme={theme === "light" ? "dark" : "light"}
        autoClose={3500}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Component {...pageProps} />
    </>
  );
}

export default StakeDao;
