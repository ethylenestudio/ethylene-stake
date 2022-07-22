import { useDispatch } from "react-redux";
import { useTypedStateSelector } from "store";
import { setTheme } from "store/slicers/theme";

export const useTheme = () => {
  const { theme } = useTypedStateSelector((state: any) => state.theme);
  const dispatch = useDispatch();

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
