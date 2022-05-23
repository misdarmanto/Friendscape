import { useState, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";

export const useInternetConnection = () => {
  const [isOffline, setIsOfflineStatus] = useState(false);
  useEffect(() => {
    const getNetInfo = NetInfo.addEventListener((state) => {
      setIsOfflineStatus(!state.isConnected || !state.isInternetReachable);
    });
    return () => getNetInfo();
  }, [isOffline]);
  return { isOffline };
};
