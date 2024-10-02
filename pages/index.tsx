// Importing Dependencies //
import React from 'react';
import Head from "next/head";

// Importing main components
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

// Importing components
import GraphicDesign from "./components/GraphicDesign";

export function Home() {

  return (
    <>
        {/* LOADER */}
        <Loader/>

        <div className="main">
          <div className="main-container">
            <div className="main-container-block">
              <Head>
                  <title>Studio Haquin / Andy Haquin-Guyard — Designer Graphique & Vidéaste, cadreur, monteur basé à Angers</title>
                  <meta name="description" content="De la prise de vue au montage, en passant par la conception graphique, je m’occupe de tout pour raconter votre histoire de manière authentique et impactante. ✨"></meta>
                  <link rel="icon" href="/favicon.ico" />
                  <meta name="facebook-domain-verification" content="" />
              </Head>

              {/* HEADER */}
              <Hero/>

              {/* COMPONENTS */}
              <GraphicDesign/>

              {/* Footer */}
              <Footer/>
            </div>
          </div>
        </div>
      </>
  )
}

export default Home;