import React from 'react';
import clsx from 'clsx';

// Importing Custom Fonts
import Alinsa from 'next/font/local'

// Importing Local Fonts
const alinsa = Alinsa({
  variable: '--font-alinsa',
  src: [
    {
      path: '../content/fonts/alinsa.woff2',  // Ajouter .woff2
      weight: '300',
      style: 'normal',
    },
    {
      path: '../content/fonts/alinsa.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../content/fonts/alinsa.ttf',  // Ajouter .ttf si nécessaire
      weight: '300',
      style: 'normal',
    },
  ]
});

export default function Layout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className={clsx(alinsa.variable)}>
        <div className="overlay"></div>
        <div className="overlay-noise"></div>
        {children}
      </div>
    );
  };