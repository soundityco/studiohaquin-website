import { useEffect, useRef } from 'react';
import { Howl } from 'howler';

const SoundManager = () => {
  // Créer des instances de Howl pour différents sons
  const sounds = {
    click: new Howl({ src: ['/sounds/click-sound.mp3'], volume: 0.15 }), // Son pour les clics
    hoverClick: new Howl({ src: ['/sounds/hover-click-sound.mp3'], volume: 0.15 }),
    instagram: new Howl({ src: ['/sounds/hover-sound-instagram.mp3'], volume: 0.15 }),
    linkedin: new Howl({ src: ['/sounds/hover-sound-linkedin.mp3'], volume: 0.15 }),
    behance: new Howl({ src: ['/sounds/hover-sound-behance.mp3'], volume: 0.15 }),
    contact: new Howl({ src: ['/sounds/hover-sound-contact.mp3'], volume: 0.15 }),
  };

  // Références pour gérer les sons
  const currentSoundRef = useRef<Howl | null>(null); // Le son en cours
  const isFadingOutRef = useRef(false); // Éviter les conflits entre fade-out et nouvelle lecture

  const playSound = (newSound: Howl) => {
    if (currentSoundRef.current && currentSoundRef.current !== newSound) {
      // Si un autre son est en cours, le fade-out avant de jouer le nouveau
      if (isFadingOutRef.current) return; // Empêche d’empiler plusieurs fade-out

      isFadingOutRef.current = true;
      currentSoundRef.current.fade(0.15, 0, 300); // Fade-out rapide
      setTimeout(() => {
        currentSoundRef.current?.stop();
        currentSoundRef.current = null;
        isFadingOutRef.current = false;

        // Joue le nouveau son
        newSound.volume(0.15);
        newSound.play();
        currentSoundRef.current = newSound;
      }, 300); // Durée du fade-out
    } else if (currentSoundRef.current === newSound) {
      // Si le son est déjà en cours, rejoue-le depuis le début
      newSound.stop();
      newSound.play();
    } else {
      // Si aucun son n'est en cours, joue directement
      newSound.volume(0.15);
      newSound.play();
      currentSoundRef.current = newSound;
    }
  };

  useEffect(() => {
    // Gérer le hover avec différents sons pour différentes classes
    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (target) {
        if (target.classList.contains('hover-click-sound')) {
          playSound(sounds.hoverClick);
        } else if (target.classList.contains('hover-sound-instagram')) {
          playSound(sounds.instagram);
        } else if (target.classList.contains('hover-sound-linkedin')) {
          playSound(sounds.linkedin);
        } else if (target.classList.contains('hover-sound-behance')) {
          playSound(sounds.behance);
        } else if (target.classList.contains('hover-sound-contact')) {
          playSound(sounds.contact);
        }
      }
    };

    // Gérer le son au clic de souris (mousedown)
    const handleMouseDown = () => {
      sounds.click.play();
    };

    // Ajouter les écouteurs d'événements
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mousedown', handleMouseDown);

    // Nettoyer les écouteurs d'événements lors du démontage du composant
    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [sounds]);

  return null; // Ce composant ne rend rien
};

export default SoundManager;
