'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface StickyCursorProps {
  stickyElement: React.RefObject<HTMLElement>;
}

const StickyCursor: React.FC<StickyCursorProps> = ({ stickyElement }) => {
  const cursorSize = 20;
  const mouse = {
    x: useMotionValue(-cursorSize), // Initialement en dehors du viewport
    y: useMotionValue(-cursorSize)  // Initialement en dehors du viewport
  };

  const smoothOptions = { damping: 15, stiffness: 200, mass: 0.25 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions)
  };

  const [currentEmoji, setCurrentEmoji] = useState(''); // Émoji actuel
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
    const classEmojiMap: { [key: string]: string } = {
      'button-contact': '✉️',
      'button-footer': '✉️' // Même emoji pour 'button-contact' et 'button-footer'
    };
  
    // Vérifiez si l'élément a une des classes définies
    for (const className in classEmojiMap) {
      if (target.classList.contains(className)) {
        setCurrentEmoji(classEmojiMap[className]); // Définir l'émoji correspondant
        return;
      }
    }
  
    // Si aucune classe ne correspond, réinitialiser à l'émoji par défaut
    setCurrentEmoji('👀');
  };

  const manageMouseLeaveLink = () => {
    setIsHovered(false);
    setCurrentEmoji(''); // Réinitialiser l'émoji
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
        scale: isHovered ? 2 : 1, // Change la taille du curseur selon l'état
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: isHovered ? '30px' : '20px', // Change la taille de l'émoji selon l'état
        pointerEvents: 'none', // Pour que l'émoji ne bloque pas les événements de souris
        background: isHovered ? 'none' : 'rgba(255, 255, 255, 1)', // Pas de fond au survol
        mixBlendMode: isHovered ? 'normal' : 'difference' // Pas de mode de mélange au survol
      }}
      className="cursor"
    >
      {currentEmoji} {/* Affiche l'émoji selon l'état */}
    </motion.div>
  );
};

export default StickyCursor;
