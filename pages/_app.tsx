import Layout from "./layout";
import Head from "next/head";

import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>STUDIO HAQUIN © FILMMAKER & SOUND DESIGNER, BASED IN ANGERS, FR.</title>
        <meta name="description" content="Studio de production audiovisuelle basé à Angers. De la prise de vue au montage, en passant par la conception graphique et sonore, je m’occupe de tout pour raconter votre histoire de manière authentique et impactante." />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}