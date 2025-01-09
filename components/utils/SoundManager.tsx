import { useEffect, useRef } from 'react';
import { Howl } from 'howler';

const soundManager = () => {
  // Créer des instances de Howl pour différents sons
  const sounds = {
    click: new Howl({ src: ['/sounds/click-sound.wav'], volume: 1 }),
    hoverClick: new Howl({ src: ['/sounds/hover-click-sound.wav'], volume: 1 }),
    instagram: new Howl({ src: ['/sounds/hover-sound-instagram.wav'], volume: 1 }),
    linkedin: new Howl({ src: ['/sounds/hover-sound-linkedin.wav'], volume: 1 }),
    behance: new Howl({ src: ['/sounds/hover-sound-behance.wav'], volume: 1 }),
    contact: new Howl({ src: ['/sounds/hover-sound-contact.wav'], volume: 1 }),
    mario: new Howl({ src: ['/sounds/hover-sound-mario.wav'], volume: 1 }),
    whoosh: new Howl({ src: ['/sounds/hover-sound-whoosh.wav'], volume: 1 }),
  };

  // Références pour gérer les sons
  const currentSoundRef = useRef<Howl | null>(null); // Le son en cours
  const lastHoveredSoundRef = useRef<Howl | null>(null); // Le dernier son joué, pour vérifier si c'est le même
  const soundFinishedRef = useRef(true); // Indicateur pour savoir si le son est terminé

  const playSound = (newSound: Howl) => {
    if (lastHoveredSoundRef.current === newSound && !soundFinishedRef.current) {
      // Si le même son est déjà en train de jouer, mais pas terminé, on ne rejoue pas
      return;
    }

    // Arrêter l'ancien son si un nouveau son est joué
    if (currentSoundRef.current && currentSoundRef.current !== newSound) {
      currentSoundRef.current.stop();
    }

    // Jouer le nouveau son
    newSound.volume(1);
    newSound.play();

    // Mettre à jour les références
    currentSoundRef.current = newSound;
    lastHoveredSoundRef.current = newSound;
    soundFinishedRef.current = false; // Indiquer que le son n'est pas encore terminé

    // Détecter quand le son est terminé
    newSound.once('end', () => {
      soundFinishedRef.current = true; // Le son est terminé
    });
  };

  useEffect(() => {
    // Gérer le hover avec différents sons pour différentes classes
    const handleMouseOver = (event: MouseEvent) => {
      let target = event.target as HTMLElement;

      // Remonter dans la hiérarchie pour trouver un élément interactif
      while (target && target !== document.body) {
        if (target.classList.contains('hover-click-sound')) {
          playSound(sounds.hoverClick);
          return;
        } else if (target.classList.contains('hover-sound-instagram')) {
          playSound(sounds.instagram);
          return;
        } else if (target.classList.contains('hover-sound-linkedin')) {
          playSound(sounds.linkedin);
          return;
        } else if (target.classList.contains('hover-sound-behance')) {
          playSound(sounds.behance);
          return;
        /*} else if (target.classList.contains('hover-sound-contact')) {
          playSound(sounds.contact);
          return;*/
        } else if (target.classList.contains('hover-sound-mario')) {
          playSound(sounds.mario);
          return;
        } else if (target.classList.contains('hover-sound-whoosh')) {
          playSound(sounds.whoosh);
          return;
        }
        target = target.parentElement as HTMLElement;
      }
    };

    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [sounds]);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      let target = event.target as HTMLElement;

      // Remonter dans la hiérarchie pour trouver un élément interactif
      while (target && target !== document.body) {
        if (
          target.tagName === 'A' || // Lien
          target.tagName === 'BUTTON' || // Bouton
          //target.tagName === 'VIDEO' || // Video
          target.classList.contains('clickable') // Classe spécifique
        ) {
          playSound(sounds.click);
          return; // Arrêter la recherche une fois trouvé
        }
        target = target.parentElement as HTMLElement; // Remonter au parent
      }
    };

    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [sounds]);

  return null; // Ce composant ne rend rien
};

export default soundManager;
