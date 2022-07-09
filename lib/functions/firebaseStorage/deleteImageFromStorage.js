import { getStorage, ref, deleteObject } from "firebase/storage";

export const deleteImageFromStorage = (path) => {
  if(path === "") return
  const storage = getStorage();
  const imageRef = ref(storage, path);
  deleteObject(imageRef)
    .then(() => {
      console.log("delete image success");
    })
    .catch((error) => {
      console.log(error);
    });
};
