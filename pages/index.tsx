// Importing Dependencies //
import React from 'react';
import Head from "next/head";

// Importing main components
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

// Importing components
import Music from "./components/Music";

export function Home() {

  return (
        <div className="main">
            <Head>
                <title>Studio Haquin / Andy Haquin-Guyard — Designer Graphique & Vidéaste, cadreur, monteur basé à Angers</title>
                <meta name="description" content="De la prise de vue au montage, en passant par la conception graphique, je m’occupe de tout pour raconter votre histoire de manière authentique et impactante. ✨"></meta>
                <link rel="icon" href="/favicon.ico" />
                <meta name="facebook-domain-verification" content="" />
            </Head>

            {/* LOADER */}
            <Loader/>

            {/* HEADER */}
            <Hero/>

            {/* COMPONENTS */}
            <Music/>

            {/* Footer */}
            <Footer/>

        </div>
  )
}

export default Home;