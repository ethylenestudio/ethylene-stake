import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTheme } from "store/slicers/theme";

export const useInitialTheme = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const localStorageTheme = localStorage.getItem("StakeDaoWebsiteTheme");
    if (localStorageTheme === "dark") {
      dispatch(setTheme("dark"));
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    } else {
      dispatch(setTheme("light"));
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }

    document.body.classList.add("bg-white");
    document.body.classList.add("dark:bg-zinc-900");
  }, []);
};
