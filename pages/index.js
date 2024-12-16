import React, { useState, useEffect, useRef } from 'react';
import Head from "next/head";

// Importing components
import { Portfolio } from '../components/Portfolio';
import { Hero } from '../components/Hero';
import GraphicDesign from "../components/GraphicDesign";
import Clients from "../components/Clients";
import Intro from "../components/Intro";
import Menu from "../components/Menu";

export function Home() {

  return (
    <>
      <Head>
        <title>STUDIO HAQUIN © FILMMAKER & SOUND DESIGNER, BASED IN ANGERS, FR.</title>
        <meta property="og:title" content="Studio Haquin — Filmmaker & Sound Designer basé à Angers" key="title" />
        <meta property="og:image" content="studio-haquin-og-banner.jpg" />
        
        <meta name="description" content="Studio de création graphique et de production audiovisuelle basé à Angers. De la prise de vue au montage, en passant par la conception graphique, je m’occupe de tout pour raconter votre histoire de manière authentique et impactante." />
        <meta property="og:description" content="Studio de création graphique et de production audiovisuelle basé à Angers. De la prise de vue au montage, en passant par la conception graphique, je m’occupe de tout pour raconter votre histoire de manière authentique et impactante." />
        
        <link rel="icon" href="/favicon.ico" />
        <meta name="facebook-domain-verification" content="" />
      </Head>

      {/* COMPONENTS */}
      <Hero />
      {/*<Menu />*/}
      {/*<GraphicDesign />*/}
      <Portfolio />
      {/*<GraphicDesign />*/}
      <Intro />
      {/*<GraphicDesign />*/}
      
    </>
  );
}

export default Home;