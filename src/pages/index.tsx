import React, {useState} from "react";
import { upload } from "../helpers/webbundlr"
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';


export default function Home(props: any) {
  const [uploadFiles, setUploadFiles] = useState<any>([])

  const changeUploadFile = (e: any) => {
    let file = e.target.files[0]
    setUploadFiles([...uploadFiles, file] )
  }

  const sendItemForm = (publicKey: any) => {
    upload(publicKey, uploadFiles[0])
  }
  
  const { connection } = useConnection();
  const { publicKey, sendTransaction, connecting, connected } = useWallet();

  console.log(connecting)
  console.log(connected)

  // if (connected == true) {
  //   console.log(publicKey)
  // }

  return (
    <>
      <WalletMultiButton />
      <div className="upload-btn">
        <input type="file" accept="image/*, image/heic, image/heif" onChange={changeUploadFile}/>
      </div>
      <div onClick={() => sendItemForm(publicKey)}>Submit</div>
    </>
  )
}
