import Layout from "./layout";
import Head from "next/head";

import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>STUDIO HAQUIN © FILMMAKER & SOUND DESIGNER, BASED IN ANGERS, FR.</title>
        <meta name="description" content="Studio de production graphique et audiovisuelle, basé à Angers. Spécialisé dans la création graphique, le web design et la production vidéo, j'accorde une attention particulière à comprendre vos besoins pour donner vie à vos projets, alliant esthétique et efficacité pour raconter votre histoire de manière authentique." />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}