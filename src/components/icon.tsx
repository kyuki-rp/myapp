import React, { useRef } from "react";
import { useState, useEffect } from 'react';
import { ref, getStorage, list, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { useAuth } from "../hooks/useAuth"
import { StaticImage } from "gatsby-plugin-image"
import app from 'gatsby-plugin-firebase-v9.0'


const IconImage = () => {

  const auth = useAuth()
  const storage = getStorage(app)

  const [fileUrl, setFileUrl] = useState("");
  const fileRef = ref(storage, `/users/${auth.currentUser?.uid}/icon`)

  const inputRef = useRef<HTMLInputElement|null>(null);
  const fileInput = () => {
    inputRef.current?.click();
  };

  const setIconImag = () =>{
    getDownloadURL(fileRef)
    .then((downloadURL) => {
      setFileUrl(downloadURL);
    })
    .catch(e => {
      setFileUrl("../images/default-icon.png")
    })
  }
  
  useEffect(() => {
    setIconImag()
  }, []);

  const fileUpload = (event) => {
    const file = event.target.files[0]

    const fileType = file.type.split('/')[0]
    if (fileType=='image'||fileType=='video') {

        const uploadTask = uploadBytesResumable(fileRef, file);
        uploadTask.on(
        "state_changed",
        (snapshot) => {
            console.log("snapshot", snapshot);
            const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(percent + "% done");
            setIconImag()
        },
        (error) => {alert( '容量が大きすぎます。' )},
        );
    }
  }

  return (
    <>
      { fileUrl==="../images/default-icon.png" &&
        <StaticImage src="../images/default-icon.png" alt="default-icon" width={150} height={150}/>
      }
      { fileUrl!=="../images/default-icon.png" &&
       <img src={fileUrl} height={150}/>
      }
        <br />
        <input hidden ref={inputRef} type="file" onChange={(e) => {fileUpload(e)}} />
        <button onClick={() => {fileInput()}} style={{border:'none', background:'transparent'}}>
          <i className="fa fa-upload" /> 画像をアップロード
        </button>
    </>
  )

}

export default IconImage
