import React, { useState, useEffect, useRef } from 'react';
import Head from "next/head";

// Importing main components
import Hero from "@/components/Hero";
//import StickyCursor from '../components/stickyCursor';

// Importing components
import GraphicDesign from "../components/GraphicDesign";

export function Home() {

  //const stickyElement = useRef(null);

  return (
    <>

      {/*<div className={scrolled ? "main-scrolled" : "main"}>
        <div className={scrolled ? "main-container-scrolled" : "main-container"}>
          <div className="main-container-block" ref={containerRef}>*/}
            <Head>
              <title>Studio Haquin — Designer Graphique & Vidéaste, Cadreur, Monteur basé à Angers</title>
              <meta property="og:title" content="Studio Haquin — Designer Graphique & Vidéaste, Cadreur, Monteur basé à Angers" key="title" />
              <meta property="og:image" content="studio-haquin-og-banner.jpg" />
              
              <meta name="description" content="Studio de création graphique et de production audiovisuelle basé à Angers. De la prise de vue au montage, en passant par la conception graphique, je m’occupe de tout pour raconter votre histoire de manière authentique et impactante." />
              <meta property="og:description" content="Studio de création graphique et de production audiovisuelle basé à Angers. De la prise de vue au montage, en passant par la conception graphique, je m’occupe de tout pour raconter votre histoire de manière authentique et impactante." />
              
              <link rel="icon" href="/favicon.ico" />
              <meta name="facebook-domain-verification" content="" />
            </Head>

            {/*<StickyCursor stickyElement={stickyElement}/>/*}

            {/* COMPONENTS */}
            <Hero />
            <GraphicDesign />
    </>
  );
}

export default Home;