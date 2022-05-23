import React, { useState, useEffect } from "react";
import { LogBox } from "react-native";
import _ from "lodash";
import { ContextApi } from "./lib/helper/ContextApi";
import AppNavigations from "./navigations/AppNavigations";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { db } from "./lib/helper/firebase";
import {
  onSnapshot,
  doc,
  collection,
  query,
  getDocs,
  getDoc,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import LoadingAnimation from "./components/animations/LoadingAnimation";
import {
  getObjectFromLocalStorage,
  getValueFromLocalStorage,
  storeObjectToLocalStorage,
  storeValueToLocalStorage,
} from "./lib/functions/asyncStorage/localStorage";
import { useInternetConnection } from "./lib/hooks/useInternetConnection";
import OfflineScreen from "./screens/OfflineScreen";

LogBox.ignoreLogs(["Warning:..."]); // ignore specific log
LogBox.ignoreAllLogs(); // ignore all logs
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isDataAvaliable, setIsDataAvaliable] = useState(false);
  const [shareDataCollection, setShareDataCollection] = useState([]);
  const [currentUserData, setCurrentUserData] = useState([]);
  const { isOffline } = useInternetConnection();

  const extractData = async (snapshoot) => {
    const collecectionData = [];
    snapshoot.forEach((doc) => {
      collecectionData.push({ ...doc.data(), id: doc.id });
    });

    console.log("recive data from server " + collecectionData.length);

    await storeObjectToLocalStorage("@dataCollection", collecectionData)
    const currentTime = Timestamp.now().seconds + 60;
    await storeValueToLocalStorage("@previousTime", currentTime);

    collecectionData.sort((a, b) => 0.5 - Math.random());
    setShareDataCollection(collecectionData);
    setIsAuth(true);
    setIsDataAvaliable(true);
  };

  const getDataFromServer = async (collectionName) => {
    console.log("^_^_server_###############################################");
    console.log("getData from server");
    const dbCollections = collection(db, collectionName);
    try {
      const q = query(dbCollections, orderBy("createAt", "desc"));
      await getDocs(q).then((data) => extractData(data));
    } catch (err) {
      console.log(err);
    }
  };

  const getDataFromLocalStorage = async () => {
    console.log(
      "^_^_local_____________________________________________________________"
    );
    console.log("getData from local storage");
    const data = await getObjectFromLocalStorage("@dataCollection")
    data.sort((a, b) => 0.5 - Math.random());
    setShareDataCollection(data);
    setIsDataAvaliable(true);
    setIsAuth(true);
  };

  const getData = async (userId) => {
    // get gender from Users collecection
    const docUserRef = doc(db, "Users", userId);
    const resultUser = await getDoc(docUserRef);
    const gender = resultUser.data().gender;

    const collectionName = gender === "male" ? "FemaleContent" : "MaleContent";

    const previousTime = await getValueFromLocalStorage(
      "@previousTime"
    ).then((time) => (time === undefined ? 0 : parseInt(time)));

    const currentTime = Timestamp.now().seconds;
    const isCurrentTimeGreaterThanPreviousTime = currentTime > previousTime;

    if (isCurrentTimeGreaterThanPreviousTime) {
      getDataFromServer(collectionName);
    } else {
      getDataFromLocalStorage();
    }
  };

  useEffect(() => {
    const auth = getAuth();
    let unsubscribe = () => null;
    onAuthStateChanged(auth, (user) => {
      setIsDataAvaliable(false);
      if (!user) {
        setIsAuth(false);
        setIsDataAvaliable(true);
        return;
      }
      const docUserRef = doc(db, "Users", user.email);
      unsubscribe = onSnapshot(docUserRef, (doc) => {
        setCurrentUserData({ ...doc.data() });
      });
      getData(user.email);
    });
    return () => unsubscribe();
  }, []);

  return isDataAvaliable ? (
    <ContextApi.Provider
      value={{
        isAuth,
        setIsAuth,
        shareDataCollection,
        setShareDataCollection,
        currentUserData,
        setCurrentUserData
      }}
    >
      {isOffline ? <OfflineScreen /> : <AppNavigations />}
    </ContextApi.Provider>
  ) : (
    <LoadingAnimation />
  );
}
