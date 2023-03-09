import React, {useState} from "react";
import { upload } from "../helpers/bundlr"
import Script from 'next/script'
import Arweave from 'arweave';
import { signers } from "arbundles";

export default function Home(props: any) {
  const [uploadFiles, setUploadFiles] = useState<any>([])
  const [arweave, setArweave] = useState<any>({})
  const [ephemeral, setEphemeral] = useState<any>({})

  return (
    <>
      <Script 
        src="https://unpkg.com/arweave/bundles/web.bundle.js" 
        strategy="worker"
        onReady={async () => {
          let arweave = Arweave.init({
            host: 'arweave.dev',
            port: 443,
            protocol: 'https',
          })

          const ephemeral = await arweave.wallets.generate();

          // this is the part that causes the SubtleCrypto error 
          // couldn't figure out different way to use arbundles library to create 
          // an arweave signer object
          // const signer = new signers.ArweaveSigner(ephemeral);
          setArweave(arweave)
          setEphemeral(ephemeral)
        }}
        onError={() => {
          console.log("error")
        }}>
      </Script>
      <div onClick={() => upload(ephemeral)}>Submit</div>
    </>
  )
}
