import { useEffect } from "react";
import { useStateDispatch } from "store";
import { setTheme } from "store/slicers/theme";

export const useInitialTheme = () => {
  const dispatch = useStateDispatch();

  useEffect(() => {
    const localStorageTheme = localStorage.getItem("StakeDaoWebsiteTheme");
    if (localStorageTheme === "light") {
      dispatch(setTheme("light"));
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      dispatch(setTheme("dark"));
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }

    document.body.classList.add("bg-white");
    document.body.classList.add("dark:bg-neutral-900");
  }, []);
};
