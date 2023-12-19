import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

/**
 * 画像のURI（file://から始まるパス）をBase64に変換する関数
 */
export const convertImageToBase64FromUri = async (uri: string) => {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return `data:image/png;base64,${base64}`;
  } catch (error) {
    console.error(error);
  }
};

/**
 * モジュールから画像をBase64に変換する関数
 */
export const convertToBase64FromModule = async (image: string) => {
  try {
    const asset = Asset.fromModule(image);
    // ローカルのURIがあることを確認する
    await asset.downloadAsync();
    if (asset.localUri) {
      // ファイルの内容をBase64として読み込む
      const base64 = await convertImageToBase64FromUri(asset.localUri);
      return base64;
    }
    return null;
  } catch (e) {
    console.error(e);
    return null;
  }
};
