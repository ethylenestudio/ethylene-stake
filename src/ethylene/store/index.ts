import { configureStore } from "@reduxjs/toolkit";
import { createContext } from "react";
import {
  createDispatchHook,
  createSelectorHook,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import accountReducer from "./reducers/accountReducer";
import walletConnectionSlice from "./reducers/walletConnectionReducer";

export const store = configureStore({
  reducer: {
    walletConnection: walletConnectionSlice,
    account: accountReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const customizedMiddleware = getDefaultMiddleware({
      serializableCheck: false,
    });
    return customizedMiddleware;
  },
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const ethyleneStoreConext = createContext(null);
export const useEthyleneDispatch = createDispatchHook(
  ethyleneStoreConext as any
);
export const useStateSelector = createSelectorHook(ethyleneStoreConext as any);
export const useTypedSelector: TypedUseSelectorHook<RootState> =
  useStateSelector;
