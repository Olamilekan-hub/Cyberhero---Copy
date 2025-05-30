import { useState } from "react";
import Sound from "../../assets/sound/click-game-menu-147356.mp3";

const SoundButton = ({ children }) => {
  const [audio] = useState(new Audio(Sound));

  const playClickSound = () => {
    audio.currentTime = 0;
    audio.play();
  };
  return <div onClick={playClickSound}>{children}</div>;
};

export default SoundButton;
