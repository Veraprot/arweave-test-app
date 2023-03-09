import React, {useState} from "react";
import { upload } from "../helpers/bundlr"

export default function Home(props: any) {
  const [uploadFiles, setUploadFiles] = useState<any>([])

  const changeUploadFile = (e: any) => {
    let file = e.target.files[0]
    setUploadFiles([...uploadFiles, file] )
  }

  const sendItemForm = (e: any) => {
    const formData = new FormData();

    uploadFiles.map((file: any) => {
      formData.append(`${file.name}`, file)
    })

    console.log(window.crypto.subtle)
    upload(uploadFiles)
  }

  return (
    <>
      <div className="upload-btn">
        <input type="file" accept="image/*, image/heic, image/heif" onChange={changeUploadFile}/>
      </div>
      <div onClick={sendItemForm}>Submit</div>
    </>
  )
}
