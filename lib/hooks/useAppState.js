import { useState, useEffect } from "react";
import { AppState } from "react-native";

export const useAppStatus = () => {
  const [appStatus, setAppStatus] = useState(null);
  useEffect(() => {
    const appStateListener = AppState.addEventListener(
      "change",
      (nextAppState) => setAppStatus(nextAppState)
    );
    return () => {
      appStateListener?.remove();
    };
  }, []);

  return [appStatus];
};
