import React from 'react';
import Head from "next/head";

// Importing components
import { Portfolio } from '@/components/Portfolio';
import { Hero } from '@/components/Hero';
import Intro from "@/components/Intro";


export function Home() {

  return (
    <>
      <Head>
        <title>STUDIO HAQUIN © FILMMAKER & SOUND DESIGNER, BASED IN ANGERS, FR.</title>
        <meta name="description" content="Studio de production audiovisuelle basé à Angers. De la prise de vue au montage, en passant par la conception graphique et sonore, je m’occupe de tout pour raconter votre histoire de manière authentique et impactante." />
        <meta name="application-name" content="Studio Haquin" />

        {/* Open Graph (Facebook, LinkedIn, etc.) */}
        <meta property="og:url" content="https://studiohaquin.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Studio Haquin — Filmmaker & Sound Designer basé à Angers" key="title" />
        <meta property="og:image" content="https://studiohaquin.com/studio-haquin-og-banner.jpg" />
        <meta property="og:description" content="Studio de production audiovisuelle basé à Angers. De la prise de vue au montage, en passant par la conception graphique et sonore, je m’occupe de tout pour raconter votre histoire de manière authentique et impactante." />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        
        {/* SEO supplémentaire */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Studio Haquin" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* COMPONENTS */}
      <Hero />
      <Portfolio />
      <Intro />
    </>
  );
}

export default Home;