import { apollo } from "apollo";
import { GET_ME } from "apollo/queries/auth.query";
import { IUser } from "interface/user.interface";
import Cookies from "js-cookie";
import React, { createContext, useContext, useEffect } from "react";
import { TOKEN_NAME, USER_ID } from "utils/constants";

interface AppContextProp {
  user: IUser;
  logout: () => void;
}

const AppContext = createContext<AppContextProp>({} as AppContextProp);
export const useAppContext = () => useContext(AppContext);

const AppContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<IUser>({} as IUser);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apollo.query({
          query: GET_ME,
          fetchPolicy: "cache-first",
        });

        setUser(data.me);
      } catch (error) {
        Cookies.remove(TOKEN_NAME);
        Cookies.remove(USER_ID);
      }
    })();
  }, []);

  const logout = () => {
    Cookies.remove(TOKEN_NAME);
    Cookies.remove(USER_ID);
    window.location.href = "/login";
  };

  return (
    <AppContext.Provider value={{ user, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
