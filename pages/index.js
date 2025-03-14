import React, { useState, useEffect, useRef } from 'react';
import Head from "next/head";

// Importing components
import { Portfolio } from '@/components/Portfolio';
import { Hero } from '@/components/Hero';
import Intro from "@/components/Intro";


export function Home() {

  return (
    <>
      <Head>
        <title>STUDIO HAQUIN © DESIGNER GRAPHIQUE & WEB / MOTION DESIGNER, BASÉ À ANGERS, FR.</title>
        <meta name="description" content="Studio de production graphique et audiovisuelle, basé à Angers. Spécialisé dans la création graphique, le web design et le motion design, j'accorde une attention particulière à comprendre vos besoins pour donner vie à vos projets, alliant esthétique et efficacité pour raconter votre histoire de manière authentique." />
        <meta name="application-name" content="Studio Haquin" />
        <meta name="keywords" content="graphiste, motion, design, graphiste, vidéaste, filmmaker, angers, 3D, designer, web, designer, ux, ui, dveloppeur" />

        {/* Open Graph (Facebook, LinkedIn, etc.) */}
        <meta property="og:url" content="https://studiohaquin.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="STUDIO HAQUIN © DESIGNER GRAPHIQUE & WEB / MOTION DESIGNER, BASÉ À ANGERS, FR." key="title" />
        <meta property="og:image" content="https://studiohaquin.com/studio-haquin-og-banner.jpg" />
        <meta property="og:description" content="Studio de production graphique et audiovisuelle, basé à Angers. Spécialisé dans la création graphique, le web design et le motion design, j'accorde une attention particulière à comprendre vos besoins pour donner vie à vos projets, alliant esthétique et efficacité pour raconter votre histoire de manière authentique." />
        
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