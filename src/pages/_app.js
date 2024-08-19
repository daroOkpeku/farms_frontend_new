'use client';
import "../styles/globals.css"
import {Provider} from "./component/context";
export default function App({ Component, pageProps }) {
  return(
    <>
    <Provider>
    <Component {...pageProps} />
    </Provider>
    </>
  );
}
