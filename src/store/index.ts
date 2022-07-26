import { configureStore } from "@reduxjs/toolkit";
import { createContext } from "react";
import {
  createDispatchHook,
  createSelectorHook,
  TypedUseSelectorHook,
  useSelector,
} from "react-redux";
import themeSlice from "store/slicers/theme";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
  },
  middleware: (getDefaultMiddleware) => {
    const customizedMiddleware = getDefaultMiddleware({
      serializableCheck: false,
    });
    return customizedMiddleware;
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const stateStoreContext = createContext(null);
export const useStateDispatch = createDispatchHook(stateStoreContext as any);
export const useStateSelector = createSelectorHook(stateStoreContext as any);
export const useTypedStateSelector: TypedUseSelectorHook<RootState> =
  useStateSelector;
