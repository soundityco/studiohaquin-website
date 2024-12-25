import { useEffect, useRef } from 'react';
import { Howl } from 'howler';

const SoundManager = () => {
  // Créer des instances de Howl pour différents sons
  const sounds = {
    //click: new Howl({ src: ['/sounds/click-sound.wav'], volume: 1 }),
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
    newSound.on('end', () => {
      soundFinishedRef.current = true; // Le son est terminé
    });
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
        } else if (target.classList.contains('hover-sound-mario')) {
          playSound(sounds.mario);
        } else if (target.classList.contains('hover-sound-whoosh')) {
          playSound(sounds.whoosh);
        }
      }
    };

    // Gérer le son au clic de souris (mousedown)
    /*const handleMouseDown = () => {
      sounds.click.play();
    };*/

    // Ajouter les écouteurs d'événements
    document.addEventListener('mouseover', handleMouseOver);
    //document.addEventListener('mousedown', handleMouseDown);

    // Nettoyer les écouteurs d'événements lors du démontage du composant
    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      //document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [sounds]);

  return null; // Ce composant ne rend rien
};

export default SoundManager;