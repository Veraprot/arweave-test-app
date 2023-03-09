import Bundlr from "@bundlr-network/client";
import Arweave from 'arweave';
import { signers } from "arbundles";
// import { bundleAndSignData, createData, DataItem, Bundle } from "arbundles";

  export const uploadFiles = async(files: any) => {
    console.log(new Uint8Array(await files[0].arrayBuffer()))
    return
    // let itemsMap = await prepFilesForTransaction(signer)
    // let signedBundles = await bundleTransactionItems(itemsMap, signer, bundlr)
    // await bundlr.ready()
  
    // const tx = bundlr.createTransaction(signedBundles.getRaw(), {
    //   tags: [{ name: "Bundle-Format", value: "binary" }, { name: "Bundle-Version", value: "2.0.0" }]
    // })
  
    // await tx.sign()
    // await tx.upload()
    // let manifestId = signedBundles.items[signedBundles.items.length - 1].id
    // return manifestId;
  }
  
const upload = async (files: string[]): Promise<any> => {
  const bundlr = new Bundlr(
    "https://devnet.bundlr.network",
    "solana",
    "51SZY4VD77awGnMdKNUrSZnoPUYqwSzyf8CKcLe9RxSqJ5bsEMiBkRQr4y8nzX8AVbzY237puxTmRx24pmUv6G2j", 
    {
        providerUrl: "https://api.devnet.solana.com"
    }
  )

  const arweave = Arweave.init({
    host: 'arweave.dev',
    port: 443,
    protocol: 'https', 
  });

  const ephemeral = await arweave.wallets.generate();

  const signer = new signers.ArweaveSigner(ephemeral);
  
  uploadFiles(files)
  return 
}

export { upload };

