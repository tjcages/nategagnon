import "@/styles/globals.css";
import styles from "@/styles/_main.module.scss";
import type { AppProps } from "next/app";

import { Inter } from "@next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${styles.main} ${inter.className}`}>
      <Component {...pageProps} />
    </main>
  );
}
