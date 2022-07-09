import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserDetailProfile from "../screens/UserDetailProfile";
import ImageDetail from "../screens/ImageDetail";
import EditProfile from "../screens/EditProfile";
import HomeScreen from "../screens/MainScreen/HomeScreen";
import UserProfile from "../screens/MainScreen/UserProfileScreen";
import ListChatScreen from "../screens/MainScreen/ListChatScreen";
import NotificationScreen from "../screens/MainScreen/NotificationScreen";
import MessageScreen from "../screens/Message";
import { useFonts } from "expo-font";

import React, { useState, useEffect, memo } from "react";
import { db } from "../lib/database/firebase";
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
import {
  getObjectFromLocalStorage,
  getValueFromLocalStorage,
  storeObjectToLocalStorage,
  storeValueToLocalStorage,
} from "../lib/functions/asyncStorage/localStorage";
import LoadingAnimation from "../components/animations/LoadingAnimation";
import { useContextApi } from "../lib/hooks/useContextApi";
import ReportScreen from "../screens/ReportScreen";

const Stack = createNativeStackNavigator();

const MainNavigations = () => {
  const [isDataAvaliable, setIsDataAvaliable] = useState(false);
  const {
    setShareDataCollection,
    setCurrentUserData,
    currentUserId,
  } = useContextApi();

  const [loaded] = useFonts({
    fontTitle: require("../assets/fonts/Lato-Black.ttf"),
  });

  const extractData = async (snapshoot) => {
    const collecectionData = [];
    snapshoot.forEach((doc) => {
      collecectionData.push({ ...doc.data(), id: doc.id });
    });

    console.log("recive data from server " + collecectionData.length);

    await storeObjectToLocalStorage("@dataCollection", collecectionData);
    const currentTime = Timestamp.now().seconds + 18000;
    await storeValueToLocalStorage("@previousTime", currentTime);

    collecectionData.sort((a, b) => 0.5 - Math.random());
    setShareDataCollection(collecectionData);
    setIsDataAvaliable(true);
  };

  const getDataFromServer = async (collectionName) => {
    console.log("^_^_server_#################");
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
    console.log("^_^_local_____________________");
    console.log("getData from local storage");
    const data = await getObjectFromLocalStorage("@dataCollection");
    data.sort((a, b) => 0.5 - Math.random());
    setShareDataCollection(data);
    setIsDataAvaliable(true);
  };

  const getData = async (docId) => {
    // get gender from Users collecection
    const docUserRef = doc(db, "Users", docId);
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
    const docUserRef = doc(db, "Users", currentUserId);
    const unsubscribe = onSnapshot(docUserRef, (doc) => {
      setCurrentUserData({ ...doc.data() });
    });
    getData(currentUserId);
    return () => unsubscribe();
  }, []);

  return isDataAvaliable ? (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleStyle: { fontFamily: "fontTitle", fontSize: 18 },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "" }}
        />
        <Stack.Screen name="Profile" component={UserProfile} />
        <Stack.Screen
          name="Notification"
          component={NotificationScreen}
          options={{ title: "Notifikasi" }}
        />
        <Stack.Screen
          name="ListChat"
          component={ListChatScreen}
          options={{ title: "Chat" }}
        />
        <Stack.Screen name="Message" component={MessageScreen} />
        <Stack.Screen
          name="ImageDetail"
          component={ImageDetail}
          options={{ title: "image" }}
        />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Report" component={ReportScreen} />
        <Stack.Screen
          name="UserDetails"
          component={UserDetailProfile}
          options={{ title: "Profile" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <LoadingAnimation />
  );
};

export default memo(MainNavigations);
