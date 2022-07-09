import { AdMobRewarded } from "expo-ads-admob";

function RewardedAdd() {
  const production = "ca-app-pub-8095237298596091/3160597728";
  const test = "ca-app-pub-3940256099942544/5224354917";
  
  AdMobRewarded.setAdUnitID(production);
  AdMobRewarded.requestAdAsync().then(() => {
    AdMobRewarded.showAdAsync()
      .then(() => console.log("ok"))
      .catch((e) => console.log(e.message));
  });
}

export default RewardedAdd;
