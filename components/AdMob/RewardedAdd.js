import { AdMobRewarded } from "expo-ads-admob";

function RewardedAdd() {
  const production = "ca-app-pub-8095237298596091/9584709385";
  const test = "";
  
  AdMobRewarded.setAdUnitID(test);
  AdMobRewarded.requestAdAsync().then(() => {
    AdMobRewarded.showAdAsync()
      .then(() => console.log("ok"))
      .catch((e) => console.log(e.message));
  });
}

export default RewardedAdd;
