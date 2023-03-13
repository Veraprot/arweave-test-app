import React, {useState} from "react";
import Bundlr from "@bundlr-network/client";
import WebBundlr from "@bundlr-network/client/build/web"
// import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'
import fileReaderStream from "filereader-stream";
// const PhantomWalletAdapter =
//   require("@solana/wallet-adapter-phantom/lib/cjs/index").PhantomWalletAdapter;
  
// import * as adapter from "@solana/wallet-adapter-phantom/lib/cjs/index"


const upload = async (publicKey: any, file: File) => {
  const buffer = new ArrayBuffer(8);

  const bundlr2 = new Bundlr("https://devnet.bundlr.network", "solana", "51SZY4VD77awGnMdKNUrSZnoPUYqwSzyf8CKcLe9RxSqJ5bsEMiBkRQr4y8nzX8AVbzY237puxTmRx24pmUv6G2j")

  const pkey = bundlr2.getSigner()
  console.log(pkey)
  return 
  const provider = {
    publicKey,
    signMessage: () => {
        return buffer
    },
}

  const bundlr = new WebBundlr("https://devnet.bundlr.network", "solana", provider );

  await bundlr.ready()

  try {
    const dataStream = fileReaderStream(file);
    const tx = await bundlr.upload("dataStream");

    console.log(`File uploaded ==> https://arweave.net/${tx.id}`);

  } catch (e) {
      console.log("error on upload, ", e);
  }
}

export { upload };

// const initializeProvider = async() => {
//   const providerMap = {
//     Phantom: async (c: any) => {
//       if (window.solana.isPhantom) {
//         await window.solana.connect();
//         const p = new PhantomWalletAdapter();
//         await p.connect();
//         return p;
//       }
//     }
//   }
  
//   const currencyMap = {
//     solana: {
//       symbol: "SOL",
//       providers: ["Phantom"],
//       opts: {},
//     }
//   }
  
//   const p = providerMap["Phantom"]; // get provider entry
//   const c = currencyMap["solana"];
//   console.log(`loading: ${"Phantom"} for ${"solana"}`);
//   const providerInstance = await p(c.opts).catch((e: Error) => {
//     let err = {
//       status: "error",
//       title: `Failed to load provider ${"Phantom"}`,
//       duration: 10000,
//     };
//     console.log(err);
//     return;
//   });
  
//   setProvider(providerInstance);
// }