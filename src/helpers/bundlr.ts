import Bundlr from "@bundlr-network/client";
import { signers } from "arbundles";
import { bundleAndSignData, createData, DataItem } from "arbundles";
import Arweave from 'arweave';

// Start point for initializing + creating signers that are later used for 
// creating and uploading arweave transactions 
const upload = async (ephemeral: any): Promise<any> => {
  const bundlr = new Bundlr(
    "https://devnet.bundlr.network",
    "solana",
    "51SZY4VD77awGnMdKNUrSZnoPUYqwSzyf8CKcLe9RxSqJ5bsEMiBkRQr4y8nzX8AVbzY237puxTmRx24pmUv6G2j", 
    {
        providerUrl: "https://api.devnet.solana.com"
    }
  )
  
  // const signer = new ArweaveSigner(ephemeral)
  
  // *********************************************************************************
  // Once we have signer, we can start testing functions for creating + uploading data w code below
  // Ignore commentd out code for now, leaving it here just for more context of why we need to 
  // use signer from arbundles 
  // *********************************************************************************

  // let itemsMap = await prepFilesForTransaction(signer, files)
  // let signedBundles = await bundleAndSignData([...itemMap.values(), manifestItem], signer);
  // await bundlr.ready()
  
  // const tx = bundlr.createTransaction(signedBundles.getRaw(), {
  //   tags: [{ name: "Bundle-Format", value: "binary" }, { name: "Bundle-Version", value: "2.0.0" }]
  // })

  // await tx.sign()
  // await tx.upload()
  return 
}

// **********************************************************************************
// Leaving this for context as well, but you can ignore this code. 
// **********************************************************************************

// const prepFilesForTransaction = async(signer: any, files: File[]): Promise<Map<string, DataItem>> => {
//   const items: [string, DataItem][] = await Promise.all(
//     files.map(async (file) => {
//       return [
//         file.name,
//         await prepFile(file, signer),
//       ];
//     })
//   );

//   return new Map(items);
// }
        
// const prepFile = async(file: File, signer: any): Promise<DataItem> => {
//   let item = createData(
//     new Uint8Array(await file.arrayBuffer()),
//     signer,
//     {
//       tags: [{ name: "Content-Type", value: "txt" }],
//     }
//   );

//   await item.sign(signer);
//   return item;
// }
                        
// export const uploadFiles = async(bundlr: any, signer: any, files: File[]): Promise<string> => {
//     let itemsMap = await prepFilesForTransaction(signer, files)
//     let signedBundles = await bundleAndSignData([...itemMap.values()], signer);
//     await bundlr.ready()

//   const tx = bundlr.createTransaction(signedBundles.getRaw(), {
//       tags: [{ name: "Bundle-Format", value: "binary" }, { name: "Bundle-Version", value: "2.0.0" }]
//     })

//   await tx.sign()
//   await tx.upload()
//   let manifestId = signedBundles.items[signedBundles.items.length - 1].id
//   return manifestId;
// }
                                                
export { upload };

