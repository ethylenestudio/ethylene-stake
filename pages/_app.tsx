import "styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "store";
import { useInitialTheme } from "hooks/useInitialTheme";

function StakeDao(props: AppProps) {
  return (
    <Provider store={store}>
      <Main {...props} />
    </Provider>
  );
}

function Main({ Component, pageProps }: AppProps) {
  useInitialTheme();
  return <Component {...pageProps} />;
}

export default StakeDao;
