'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Importing Icons
import { EmojiContact, EmojiEyes, EmojiCute, EmojiProud, NewLinkIcon, ArrowLeftNavIcon, ArrowRightNavIcon, PlayerPlayButton } from "@/components/Images";

interface StickyCursorProps {
  stickyElement: React.RefObject<HTMLElement>;
}

const StickyCursor: React.FC<StickyCursorProps> = ({ stickyElement }) => {
  const cursorSize = 20;

  // Mouse tracking
  const mouse = {
    x: useMotionValue(-cursorSize),
    y: useMotionValue(-cursorSize),
  };

  const smoothOptions = { damping: 15, stiffness: 200, mass: 0.25 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  const [currentCursor, setCurrentCursor] = useState<React.ReactNode>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mapping between classes and cursor content
  const classEmojiMap: { [key: string]: React.ReactNode } = {
    'button-contact': <Image src={EmojiContact} alt="Emoji" draggable="false" />,
    'button-footer': <Image src={EmojiContact} alt="Emoji" draggable="false" />,
    'button-footer-reveal': <Image src={EmojiCute} alt="Emoji" draggable="false" />,
    'proud': <Image src={EmojiProud} alt="Emoji" draggable="false" />,
    'show-me': <NewLinkIcon className="new-link" />,
    'portfolio-start': <ArrowLeftNavIcon className="new-link start" />,
    'portfolio-end': <ArrowRightNavIcon className="new-link end" />,
    //'play': <ArrowRightNavIcon className="new-link end" />,
  };

  // Handle global mouse movement
  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    mouse.x.set(clientX - cursorSize / 2);
    mouse.y.set(clientY - cursorSize / 2);
  };

  // Manage hover over elements
  const handleMouseOver = (e: Event) => {
    const target = e.target as HTMLElement;
    setIsHovered(true);

    // Check for a relevant class in the map
    const matchingClass = Object.keys(classEmojiMap).find((className) =>
      target.closest(`.${className}`)
    );

    if (matchingClass) {
      setCurrentCursor(classEmojiMap[matchingClass]);
    } else {
      // Default cursor if no match
      setCurrentCursor(<Image src={EmojiEyes} alt="Default Emoji" width={50} height={50} draggable="false" />);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentCursor(null);
  };

  // Special handling for portfolio div
  const handlePortfolioHover = (e: MouseEvent) => {
    const containerRect = stickyElement.current?.getBoundingClientRect();
    if (!containerRect) return;

    const mouseX = e.clientX - containerRect.left; // Mouse position relative to the container
    const isLeftSide = mouseX < containerRect.width * 0.5;

    setCurrentCursor(classEmojiMap[isLeftSide ? 'portfolio-start' : 'portfolio-end'] || null);
    setIsHovered(true);
  };

  useEffect(() => {
    const handleMouseMoveWrapper = (e: MouseEvent) => handleMouseMove(e);
    const handleMouseOverWrapper = (e: Event) => handleMouseOver(e);
    const handleMouseLeaveWrapper = () => handleMouseLeave();
    const handlePortfolioHoverWrapper = (e: MouseEvent) => handlePortfolioHover(e);
  
    window.addEventListener('mousemove', handleMouseMoveWrapper);
  
    // Select all relevant hoverable elements
    const hoverableElements = document.querySelectorAll('a, .horizontal-scroll');
    hoverableElements.forEach(el => {
      if (el instanceof HTMLElement) {
        if (el.classList.contains('horizontal-scroll')) {
          el.addEventListener('mousemove', handlePortfolioHoverWrapper);
          el.addEventListener('mouseleave', handleMouseLeaveWrapper);
        } else {
          el.addEventListener('mouseover', handleMouseOverWrapper);
          el.addEventListener('mouseleave', handleMouseLeaveWrapper);
        }
      }
    });
  
    return () => {
      window.removeEventListener('mousemove', handleMouseMoveWrapper);
      hoverableElements.forEach(el => {
        if (el instanceof HTMLElement) {
          if (el.classList.contains('horizontal-scroll')) {
            el.removeEventListener('mousemove', handlePortfolioHoverWrapper);
            el.removeEventListener('mouseleave', handleMouseLeaveWrapper);
          } else {
            el.removeEventListener('mouseover', handleMouseOverWrapper);
            el.removeEventListener('mouseleave', handleMouseLeaveWrapper);
          }
        }
      });
    };
  }, []);

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
        mixBlendMode: isHovered ? 'normal' : 'difference',
      }}
      className="cursor"
    >
      {currentCursor}
    </motion.div>
  );
};

export default StickyCursor;






{/*'use client';

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

  const [currentCursor, setCurrentCursor] = useState<React.ReactNode>(null); // Emoji par défaut
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
      //'button-contact-img': <Image src={EmojiContact} alt="Emoji" width={50} height={50} draggable="false" />,
      //'header-button': <Image src={EmojiContact} alt="Emoji" width={50} height={50} draggable="false" />,
      //'button-discover': <Image src={EmojiHandFinger} alt="Emoji" width={50} height={50} draggable="false" />,
      'button-footer': <Image src={EmojiContact} alt="Emoji" width={50} height={50} draggable="false" />,
      'button-footer-reveal': <Image src={EmojiCute} alt="Emoji" width={50} height={50} draggable="false" />,
      'proud': <Image src={EmojiProud} alt="Emoji" width={50} height={50} draggable="false" />,
      'show-me': <NewLinkIcon className="new-link "/>,
      'horizontal-scroll': <NewLinkIcon className="new-link "/>,
    };

    // Chercher l'élément parent qui a une des classes définies
    const link = target.closest('a');
    if (link) {
      for (const className in classEmojiMap) {
        if (link.classList.contains(className)) {
          setCurrentCursor(classEmojiMap[className]); // Définir l'émoji correspondant
          return;
        }
      }
    }

    // Si aucune classe ne correspond, réinitialiser à l'émoji par défaut
    setCurrentCursor(<Image src={EmojiEyes} alt="Default Emoji" width={50} height={50} draggable="false" />);
  };

  const manageMouseLeaveLink = () => {
    setIsHovered(false);
    setCurrentCursor(null); // Réinitialiser à l'émoji par défaut
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
      {currentCursor}
    </motion.div>
  );
};

export default StickyCursor;*/}