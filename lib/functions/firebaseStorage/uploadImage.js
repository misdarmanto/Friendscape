import * as ImagePicker from "expo-image-picker";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { deleteImageFromStorage } from "./deleteImageFromStorage";
import { compressImage } from "./compressImage";

const pickImage = async (ratio = [1, 1]) => {
  let pickerResult = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: "Images",
    allowsEditing: true,
    aspect: ratio,
    base64: true,
    quality: 1,
  });
  return pickerResult;
};

const uploadImage = async (setImageUrl, uri, imagePath) => {
  try {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const storage = getStorage();
    const imageRef = ref(storage, imagePath);

    uploadBytesResumable(imageRef, blob)
      .then((snapshot) => {
        getDownloadURL(imageRef).then((url) => {
          setImageUrl(url);
        });
      })
      .catch((error) => {
        console.error("Upload failed", error);
      });
  } catch (e) {
    console.log(e);
    alert("Upload failed, sorry :(");
  }
};

export const uploadImageProfile = async (imageProfile, setImageProfile) => {
  const imagePath = "userImages/" + "Profile" + Date.now() + ".jpg";
  const pickerResult = await pickImage([1, 1]);
  const compressImageUri = await compressImage(pickerResult.uri).then(
    (result) => result.uri
  );

  if (!pickerResult.cancelled) {
    if (pickerResult.type !== "image") {
      alert("file not support");
      return;
    }
    if (pickerResult.base64.length > 4371340) {
      alert("maximum size 2MB");
      return;
    }
    if (imageProfile !== null) {
      deleteImageFromStorage(imageProfile.path);
    }
    await uploadImage(
      (uri) => setImageProfile({ imageUri: uri, path: imagePath }),
      compressImageUri,
      imagePath
    );
  }
};

export const uploadUserImages = async (userImages, setUserImages) => {
  if (userImages.length >= 2) return;
  const pickerResult = await pickImage([7, 10]);
  const compressImageUri = await compressImage(pickerResult.uri).then(
    (result) => result.uri
  );
  const imagePath = "userImages/" + Date.now() + ".jpg";

  if (!pickerResult.cancelled) {
    if (pickerResult.type !== "image") {
      alert("file not support");
      return;
    }
    if (pickerResult.base64.length > 4371340) {
      alert("maximum size 2MB");
      return;
    }
    uploadImage(
      (uri) =>
        setUserImages([...userImages, { imageUri: uri, path: imagePath }]),
      compressImageUri,
      imagePath
    );
  }
};
