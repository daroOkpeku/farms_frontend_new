'use client';
import "../styles/globals.css"
import Head from "next/head";
import img from "../pages/image/Logo.png"
import {Provider} from "./component/context";
export default function App({ Component, pageProps }) {
  return(
    <>
      <Head>
      <title>Ranchidpro</title>
        <link rel="icon" href="https://ik.imagekit.io/9nikkw38wtz/Logo_bH0DiEMPV.png?updatedAt=1724154495876" />
      </Head>
    <Provider>
    <Component {...pageProps} />
    </Provider>
    </>
  );
}
