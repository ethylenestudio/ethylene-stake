import { useStateDispatch, useTypedStateSelector } from "store";
import { setTheme } from "store/slicers/theme";

export const useTheme = () => {
  const { theme } = useTypedStateSelector((state) => state.theme);
  const dispatch = useStateDispatch();

  const toggleTheme = () => {
    if (Array.from(document.documentElement.classList).includes("dark")) {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      dispatch(setTheme("light"));
      localStorage.setItem("StakeDaoWebsiteTheme", "light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      dispatch(setTheme("dark"));
      localStorage.setItem("StakeDaoWebsiteTheme", "dark");
    }
  };

  return { toggleTheme, theme };
};
