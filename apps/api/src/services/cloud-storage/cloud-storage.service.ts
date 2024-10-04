import type { File } from '@koa/multer';

import { getDownloadURL, ref, storage, uploadBytes } from 'services/firebase/firebaseConfig';

import * as helpers from './cloud-storage.helper';

const upload = async (fileName: string, file: File): Promise<string> => {
  try {
    // const storageRef = ref(storage);
    const fileRef = ref(storage, `photos/${fileName}`);
    await uploadBytes(fileRef, file.buffer);
    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading photo to Firebase:', error);
    throw new Error('Failed to upload photo to Firebase');
  }
};

export default Object.assign(helpers, {
  upload,
});
