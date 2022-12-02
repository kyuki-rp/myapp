import React, { useRef } from "react";
import { updateDoc } from './updateFirestore'
import { ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { getStorage } from "firebase/storage";
import app from 'gatsby-plugin-firebase-v9.0'
import { serverTimestamp } from "firebase/firestore";
import { useState, useEffect } from 'react';

export const getFile = (storageColname, element) => {
  const storage = getStorage(app)
  const [fileUrl, setFileUrl] = useState("");

  if (element?.type=='image'||element?.type=='video') {
    useEffect(() => {
      const fileRef = ref(storage, storageColname)
      getDownloadURL(fileRef).then((downloadURL) => {
        setFileUrl(downloadURL);
      });
    }, [element]);
  }
  return fileUrl
}


export const uploadFile = (colname ,element, storageColname, file) => {
    const storage = getStorage()

    const fileType = file.type.split('/')[0]
    const edit = {content:file.name, type:file.type.split('/')[0], x:element.x, y:element.y, createAt:serverTimestamp()};

    if (fileType=='image'||fileType=='video') {

      const fileRef = ref(storage, `/${storageColname}/${file?.name}`)
      const uploadTask = uploadBytesResumable(fileRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log("snapshot", snapshot);
          const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(percent + "% done");
        },
        (error) => {
          alert( '容量が大きすぎます。' );
        },
        () => {
          updateDoc(colname, edit)
        }
      );
    }
}
