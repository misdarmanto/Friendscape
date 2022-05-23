import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

export const compressImage = async (uri) => {
  const manipResult = await manipulateAsync(uri, [], {
    compress: 0.2,
    format: SaveFormat.JPEG,
  });
  return manipResult;
};
