'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Importing Icons
import { EmojiContact, EmojiEyes, EmojiCute, EmojiProud, NewLinkIcon, ArrowLeftNavIcon, ArrowRightNavIcon, PlayerPlayIcon } from "@/components/Images";

interface StickyCursorProps {
  stickyElement: React.RefObject<HTMLElement>;
}

const CustomCursor: React.FC<StickyCursorProps> = ({ stickyElement }) => {
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
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [isMagnetized, setIsMagnetized] = useState(false);
  const [currentMagnetTarget, setCurrentMagnetTarget] = useState<HTMLElement | null>(null);

  // Mapping between classes and cursor content
  const classEmojiMap: { [key: string]: React.ReactNode } = {
    'button-contact': <Image src={EmojiContact} alt="Emoji" draggable="false" />,
    'button-footer': <Image src={EmojiContact} alt="Emoji" draggable="false" />,
    'button-footer-reveal': <Image src={EmojiCute} alt="Emoji" draggable="false" />,
    'proud': <Image src={EmojiProud} alt="Emoji" draggable="false" />,
    'show-me': <NewLinkIcon className="new-link" />,
    'portfolio-start': <ArrowLeftNavIcon className="new-link new-link-start" />,
    'portfolio-end': <ArrowRightNavIcon className="new-link new-link-end" />,
    'hovered-child': <PlayerPlayIcon className="new-link new-hovered-child" />,
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isMagnetized) {
        // Si l'élément ciblé a changé de position (après scroll), désactive le magnétisme
        setIsMagnetized(false);
        setCurrentCursor(null);
        if (timeoutId) clearTimeout(timeoutId); // Réinitialise le timeout
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMagnetized, timeoutId]);

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
  
    if (isMagnetized && currentMagnetTarget) {
      const rect = currentMagnetTarget.getBoundingClientRect();
  
      // Si l'élément a changé de position, désactive le magnétisme
      if (
        rect.top > window.innerHeight ||
        rect.bottom < 0 ||
        rect.left > window.innerWidth ||
        rect.right < 0
      ) {
        setIsMagnetized(false);
        setCurrentMagnetTarget(null);
        setCurrentCursor(null);
      }
    }
  
    // Si la souris bouge, désactive le magnétisme
    if (isMagnetized) {
      setIsMagnetized(false);
      setCurrentMagnetTarget(null);
      setCurrentCursor(null); // Réinitialise si nécessaire
    }
  
    if (!isMagnetized) {
      mouse.x.set(clientX - cursorSize / 2);
      mouse.y.set(clientY - cursorSize / 2);
    }
  };

  const handleMouseOver = (e: Event) => {
    const target = e.target as HTMLElement;
    setIsHovered(true);

    const matchingClass = Object.keys(classEmojiMap).find((className) =>
      target.closest(`.${className}`)
    );

    if (matchingClass) {
      setCurrentCursor(classEmojiMap[matchingClass]);
    } else {
      setCurrentCursor(<Image src={EmojiEyes} alt="Default Emoji" width={50} height={50} draggable="false" />);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentCursor(null);
  
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
  
    // Désactive aussi le magnétisme
    setIsMagnetized(false);
    setCurrentMagnetTarget(null);
  };

  const handlePortfolioHover = (e: MouseEvent) => {
    const containerRect = stickyElement.current?.getBoundingClientRect();
    if (!containerRect) return;
  
    const mouseX = e.clientX - containerRect.left;
    const isLeftSide = mouseX < containerRect.width * 0.5;
  
    const newCursor = classEmojiMap[isLeftSide ? 'portfolio-start' : 'portfolio-end'] || null;
  
    setIsHovered(true);
    setCurrentCursor(newCursor);
  
    const child = (e.target as HTMLElement).closest('.portfolio-popup-dynamic-content-video');
    if (child) {
      setCurrentMagnetTarget(child as HTMLElement); // Enregistre l'élément ciblé
      if (timeoutId) clearTimeout(timeoutId);
  
      const newTimeoutId = setTimeout(() => {
        if (!isHovered) return; // Si la souris n'est plus dessus, annule le magnétisme
  
        const childRect = child.getBoundingClientRect();
        const centerX = childRect.left + childRect.width / 2 - cursorSize / 2;
        const centerY = childRect.top + childRect.height / 2 - cursorSize / 2;
  
        if (
          centerX < 0 ||
          centerY < 0 ||
          centerX > window.innerWidth ||
          centerY > window.innerHeight
        ) {
          setIsMagnetized(false);
          setCurrentMagnetTarget(null);
          return;
        }
  
        // Applique le magnétisme
        mouse.x.set(centerX);
        mouse.y.set(centerY);
  
        setIsMagnetized(true);
  
        // Change le style du curseur
        setCurrentCursor(<PlayerPlayIcon />);
      }, 300);
  
      setTimeoutId(newTimeoutId);
    }
  };
  

  useEffect(() => {
    const handleMouseMoveWrapper = (e: MouseEvent) => handleMouseMove(e);
    const handleMouseOverWrapper = (e: Event) => handleMouseOver(e);
    const handleMouseLeaveWrapper = () => handleMouseLeave();
    const handlePortfolioHoverWrapper = (e: MouseEvent) => handlePortfolioHover(e);

    window.addEventListener('mousemove', handleMouseMoveWrapper);

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
  }, [timeoutId]);

  return (
    <motion.div
      style={{
        left: smoothMouse.x,
        top: smoothMouse.y,
        scale: isMagnetized ? 4.5 : isHovered ? 3.5 : 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none',
        background: isHovered ? 'none' : 'rgba(255, 255, 255, 1)',
      }}
      transition={{
        left: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
        top: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
        scale: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
      }}
      className="cursor"
    >
      {currentCursor}
    </motion.div>
  );
};

export default CustomCursor;



{/*'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Importing Icons
import { EmojiContact, EmojiEyes, EmojiCute, EmojiProud, NewLinkIcon, ArrowLeftNavIcon, ArrowRightNavIcon, PlayerPlayIcon } from "@/components/Images";

interface StickyCursorProps {
  stickyElement: React.RefObject<HTMLElement>;
}

const CustomCursor: React.FC<StickyCursorProps> = ({ stickyElement }) => {
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
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [isTransitioningScale, setIsTransitioningScale] = useState(false); // Nouvel état

  // Mapping between classes and cursor content
  const classEmojiMap: { [key: string]: React.ReactNode } = {
    'button-contact': <Image src={EmojiContact} alt="Emoji" draggable="false" />,
    'button-footer': <Image src={EmojiContact} alt="Emoji" draggable="false" />,
    'button-footer-reveal': <Image src={EmojiCute} alt="Emoji" draggable="false" />,
    'proud': <Image src={EmojiProud} alt="Emoji" draggable="false" />,
    'show-me': <NewLinkIcon className="new-link" />,
    'portfolio-start': <ArrowLeftNavIcon className="new-link new-link-start" />,
    'portfolio-end': <ArrowRightNavIcon className="new-link new-link-end" />,
    'hovered-child': <PlayerPlayIcon className="new-link new-hovered-child" />,
  };

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    mouse.x.set(clientX - cursorSize / 2);
    mouse.y.set(clientY - cursorSize / 2);

    // Reset scale transition if the mouse moves
    if (isTransitioningScale) {
      setIsTransitioningScale(false);
    }
  };

  const handleMouseOver = (e: Event) => {
    const target = e.target as HTMLElement;
    setIsHovered(true);

    const matchingClass = Object.keys(classEmojiMap).find((className) =>
      target.closest(`.${className}`)
    );

    if (matchingClass) {
      setCurrentCursor(classEmojiMap[matchingClass]);
    } else {
      setCurrentCursor(<Image src={EmojiEyes} alt="Default Emoji" width={50} height={50} draggable="false" />);
    }
  };
  
  const handleMouseLeave = () => {
    // Réinitialiser les états pour revenir au curseur initial
    setIsHovered(false);
    setCurrentCursor(null);
  
    // Annuler tout timeout en cours
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
  };
  
  const handlePortfolioHover = (e: MouseEvent) => {
    const containerRect = stickyElement.current?.getBoundingClientRect();
    if (!containerRect) return;
  
    const mouseX = e.clientX - containerRect.left;
    const isLeftSide = mouseX < containerRect.width * 0.5;
  
    const newCursor = classEmojiMap[isLeftSide ? 'portfolio-start' : 'portfolio-end'] || null;
    
    // Appliquer l'effet de hover
    setIsHovered(true);
    setCurrentCursor(newCursor);
  
    // Gestion des enfants spécifiques
    const child = (e.target as HTMLElement).closest('.portfolio-popup-dynamic-content-video');
    if (child) {
      if (timeoutId) clearTimeout(timeoutId);
  
      const newTimeoutId = setTimeout(() => {
        setIsHovered(true);
        setCurrentCursor(classEmojiMap['hovered-child']);
      }, 500); // Délai pour changer l'icône
      setTimeoutId(newTimeoutId);
    }
  };
  
  useEffect(() => {
    const handleMouseMoveWrapper = (e: MouseEvent) => handleMouseMove(e);
    const handleMouseOverWrapper = (e: Event) => handleMouseOver(e);
    const handleMouseLeaveWrapper = () => handleMouseLeave();
    const handlePortfolioHoverWrapper = (e: MouseEvent) => handlePortfolioHover(e);
  
    window.addEventListener('mousemove', handleMouseMoveWrapper);
  
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
  }, [timeoutId]);
  
  return (
    <motion.div
      style={{
        left: smoothMouse.x,
        top: smoothMouse.y,
        scale: isTransitioningScale ? 1 : isHovered ? 3.5 : 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none',
        background: isHovered ? 'none' : 'rgba(255, 255, 255, 1)',
      }}
      transition={{
        duration: 0.2,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="cursor"
    >
      {currentCursor}
    </motion.div>
  );
};

export default CustomCursor;*/}