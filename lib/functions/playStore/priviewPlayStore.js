import * as StoreReview from "expo-store-review";
import { Linking } from "react-native";
import { packageName } from "./packageName";

export const riviewPlayStore = async () => {
    if (await StoreReview.hasAction()) {
      Linking.openURL(
        `market://details?id=${packageName}&showAllReviews=true`
      );
      StoreReview.requestReview();
    }
  };