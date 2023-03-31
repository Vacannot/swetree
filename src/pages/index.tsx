import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import SweTree from "./SweTree";

export default function Home() {
  return (
    <>
      <Head>
        <title>SweTree</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/static/images/medium.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Head>
      <main className={styles.main}>
        <SweTree />
      </main>
    </>
  );
}
