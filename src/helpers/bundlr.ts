import Bundlr from "@bundlr-network/client";
import { ArweaveSigner } from "arbundles/src/signing";
import { bundleAndSignData, createData, DataItem} from "arbundles";

// Ai3QcZMuv4qsVbgmzdjpCPSpTD5EsbB9WbHoBByqFLCX
// 51SZY4VD77awGnMdKNUrSZnoPUYqwSzyf8CKcLe9RxSqJ5bsEMiBkRQr4y8nzX8AVbzY237puxTmRx24pmUv6G2j
const upload = async (ephemeral: any, files: File[]): Promise<any> => {
  console.log(process.env)

  // const bundlr = new Bundlr(
  //   "https://devnet.bundlr.network",
  //   "solana",
  //   process.env.KEY, 
  //   {
  //       providerUrl: "https://api.devnet.solana.com"
  //   }
  // )
  
  // const signer = new ArweaveSigner(ephemeral)
  // uploadFiles(bundlr, signer, files)

  return 
}

const prepFiles = async(signer: any, files: File[]): Promise<Map<string, DataItem>> => {
  const items: [string, DataItem][] = await Promise.all(
    files.map(async (file) => {
      return [
        file.name,
        await prepFile(file, signer),
      ];
    })
  );

  return new Map(items);
}

const prepFile = async(file: File, signer: any): Promise<DataItem> => {
  let item = createData(
    new Uint8Array(await file.arrayBuffer()),
    signer,
    {
      tags: [{ name: "Content-Type", value: "txt" }],
    }
  );

  await item.sign(signer);
  return item;
}

const bundleTransactionItems = async(itemMap: Map<string, DataItem>, signer: any, bundlr: any): Promise<Bundle> => {
  const pathMap: Map<string, string> = new Map([...itemMap].map(([path, item]) => ([path, item.id])))

  let manifestItem:any = await createData(
    (await bundlr.uploader.generateManifest({ items: pathMap })).manifest,
    signer,
    {
      tags: [{ 
        name: "Type",
        value: "manifest"
      }, 
      { 
        name: "Content-Type", 
        value: "application/x.arweave-manifest+json" 
      }]
    }, 
  ); 
  
  let bundle = await bundleAndSignData([...itemMap.values(), manifestItem], signer);
  return bundle
}

export const uploadFiles = async(bundlr: any, signer: any, files: File[]) => {
  let itemsMap = await prepFiles(signer, files)
  let signedBundles = await bundleTransactionItems(itemsMap, signer, bundlr)
  console.log(signedBundles)
  await bundlr.ready()

  return 
  const tx = bundlr.createTransaction(signedBundles.getRaw(), {
    tags: [{ name: "Bundle-Format", value: "binary" }, { name: "Bundle-Version", value: "2.0.0" }]
  })

  await tx.sign()
  await tx.upload()
  let manifestId = signedBundles.items[signedBundles.items.length - 1].id
  console.log(manifestId)
  return manifestId;
}                                              
export { upload };

