import React, { useState, useEffect, useRef } from 'react';
import Head from "next/head";

// Importing main components
import Hero from "@/components/Hero";

// Importing components
import GraphicDesign from "../components/GraphicDesign";

export function Home() {

  return (
    <>

      {/*<div className={scrolled ? "main-scrolled" : "main"}>
        <div className={scrolled ? "main-container-scrolled" : "main-container"}>
          <div className="main-container-block" ref={containerRef}>*/}
            <Head>
              <title>Studio Haquin / Andy Haquin-Guyard — Designer Graphique & Vidéaste, cadreur, monteur basé à Angers</title>
              <meta name="description" content="De la prise de vue au montage, en passant par la conception graphique, je m’occupe de tout pour raconter votre histoire de manière authentique et impactante. ✨" />
              <link rel="icon" href="/favicon.ico" />
              <meta name="facebook-domain-verification" content="" />
            </Head>

            {/* HEADER */}
            <Hero />

            {/* COMPONENTS */}
            <GraphicDesign />
    </>
  );
}

export default Home;