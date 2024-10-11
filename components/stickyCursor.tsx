'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Importing Icons
import { EmojiContact, EmojiHandFinger, EmojiEyes, EmojiCute, EmojiProud, VideoIcon, NewLinkIcon } from "@/components/Images";

interface StickyCursorProps {
  stickyElement: React.RefObject<HTMLElement>;
}

const StickyCursor: React.FC<StickyCursorProps> = ({ stickyElement }) => {
  const cursorSize = 20;
  const mouse = {
    x: useMotionValue(-cursorSize),
    y: useMotionValue(-cursorSize)
  };

  const smoothOptions = { damping: 15, stiffness: 200, mass: 0.25 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions)
  };

  const [currentEmoji, setCurrentEmoji] = useState<React.ReactNode>(null); // Emoji par défaut
  const [isHovered, setIsHovered] = useState(false);

  const manageMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    mouse.x.set(clientX - cursorSize / 2);
    mouse.y.set(clientY - cursorSize / 2);
  };

  const manageMouseOverLink = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    setIsHovered(true);
    
    // Définir un tableau des classes et l'emoji associé
    const classEmojiMap: { [key: string]: React.ReactNode } = {
      'button-contact': <Image src={EmojiContact} alt="Emoji" width={50} height={50} draggable="false" />,
      //'button-discover': <Image src={EmojiHandFinger} alt="Emoji" width={50} height={50} draggable="false" />,
      'button-footer': <Image src={EmojiContact} alt="Emoji" width={50} height={50} draggable="false" />,
      'button-footer-reveal': <Image src={EmojiCute} alt="Emoji" width={50} height={50} draggable="false" />,
      'proud': <Image src={EmojiProud} alt="Emoji" width={50} height={50} draggable="false" />,
      'show-me': <NewLinkIcon className="new-link "/>,
    };

    // Chercher l'élément parent qui a une des classes définies
    const link = target.closest('a');
    if (link) {
      for (const className in classEmojiMap) {
        if (link.classList.contains(className)) {
          setCurrentEmoji(classEmojiMap[className]); // Définir l'émoji correspondant
          return;
        }
      }
    }

    // Si aucune classe ne correspond, réinitialiser à l'émoji par défaut
    setCurrentEmoji(<Image src={EmojiEyes} alt="Default Emoji" width={50} height={50} draggable="false" />);
  };

  const manageMouseLeaveLink = () => {
    setIsHovered(false);
    setCurrentEmoji(null); // Réinitialiser à l'émoji par défaut
  };

  useEffect(() => {
    window.addEventListener("mousemove", manageMouseMove);
    const links = document.querySelectorAll('a');

    links.forEach(link => {
      link.addEventListener('mouseover', manageMouseOverLink);
      link.addEventListener('mouseleave', manageMouseLeaveLink);
    });

    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
      links.forEach(link => {
        link.removeEventListener('mouseover', manageMouseOverLink);
        link.removeEventListener('mouseleave', manageMouseLeaveLink);
      });
    };
  }, []); // Ajoutez un tableau vide pour éviter les appels répétés

  return (
    <motion.div
      style={{
        left: smoothMouse.x,
        top: smoothMouse.y,
        scale: isHovered ? 3.5 : 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none',
        background: isHovered ? 'none' : 'rgba(255, 255, 255, 1)',
        mixBlendMode: isHovered ? 'normal' : 'difference'
      }}
      className="cursor"
    >
      {currentEmoji} {/* Affiche l'émoji selon l'état */}
    </motion.div>
  );
};

export default StickyCursor;
