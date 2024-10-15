import React, { useState, useEffect, useRef } from 'react';
import Head from "next/head";

// Importing main components
import Hero from "@/components/Hero";

// Importing components
import { Portfolio } from '../components/Portfolio';
import GraphicDesign from "../components/GraphicDesign";
import Clients from "../components/Clients";
import Intro from "../components/Intro";

export function Home() {

  return (
    <>
      <Head>
        <title>Studio Haquin — Designer Graphique & Vidéaste, Cadreur, Monteur basé à Angers</title>
        <meta property="og:title" content="Studio Haquin — Designer Graphique & Vidéaste, Cadreur, Monteur basé à Angers" key="title" />
        <meta property="og:image" content="studio-haquin-og-banner.jpg" />
        
        <meta name="description" content="Studio de création graphique et de production audiovisuelle basé à Angers. De la prise de vue au montage, en passant par la conception graphique, je m’occupe de tout pour raconter votre histoire de manière authentique et impactante." />
        <meta property="og:description" content="Studio de création graphique et de production audiovisuelle basé à Angers. De la prise de vue au montage, en passant par la conception graphique, je m’occupe de tout pour raconter votre histoire de manière authentique et impactante." />
        
        <link rel="icon" href="/favicon.ico" />
        <meta name="facebook-domain-verification" content="" />
      </Head>

      {/* COMPONENTS */}
      <Hero />
      <GraphicDesign />
      <Portfolio />
      <GraphicDesign />
      <Intro />
      <GraphicDesign />
      {/*<Clients />*/}
    </>
  );
}

export default Home;