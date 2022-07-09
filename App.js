import React, { useState, useEffect } from "react";
import { LogBox } from "react-native";
import _ from "lodash";
import { useInternetConnection } from "./lib/hooks/useInternetConnection";
import OfflineScreen from "./screens/OfflineScreen";
import MainNavigations from "./navigations/MainNavigation";
import AuthNavigations from "./navigations/AuthNavigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ContextApi } from "./lib/helper/ContextApi";
import LoadingAnimation from "./components/animations/LoadingAnimation";
import Layout from "./layouts";

LogBox.ignoreLogs(["Warning:..."]); // ignore specific log
LogBox.ignoreAllLogs(); // ignore all logs
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
  
};

export default function App() {
  const { isOffline } = useInternetConnection();
  const [isAuth, setIsAuth] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");
  const [shareDataCollection, setShareDataCollection] = useState([]);
  const [currentUserData, setCurrentUserData] = useState([]);
  const [isDataAvaliable, setIsDataAvaliable] = useState(false);
  const [
    dataForCurrentUserProfileScreen,
    setDataForCurrentUserProfileScreen,
  ] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserId(user.email); //1
        setIsAuth(true); //2
        setIsDataAvaliable(true);
        return;
      }
      setIsDataAvaliable(true);
    });
  }, []);

  if (!isDataAvaliable) {
    return <Layout />;
  }

  return isOffline ? (
    <OfflineScreen />
  ) : isAuth ? (
    <ContextApi.Provider
      value={{
        shareDataCollection,
        setShareDataCollection,
        currentUserData,
        setCurrentUserData,
        setIsAuth,
        isAuth,
        currentUserId,
        setCurrentUserId,
        setIsDataAvaliable,
        dataForCurrentUserProfileScreen,
        setDataForCurrentUserProfileScreen,
      }}
    >
      <MainNavigations />
    </ContextApi.Provider>
  ) : (
    <AuthNavigations />
  );
}
