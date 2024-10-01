import React from 'react';
import clsx from 'clsx';

// Importing Custom Fonts
import Alinsa from 'next/font/local'

// Importing Local Fonts
const alinsa = Alinsa({
  variable: '--font-alinsa',
  src: [
    {
      path: '../content/fonts/alinsa.ttf',
      weight: '300',
      style: 'normal',
    }
  ]
})


// Importing Google Fonts
/*import { Space_Grotesk } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})*/

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
  