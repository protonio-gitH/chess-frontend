// AudioManager.ts
import moveSound from '../assets/audio/Move.mp3';
import eatSound from '../assets/audio/Capture.mp3';

class AudioManager {
	private moveSound: HTMLAudioElement;
	private eatSound: HTMLAudioElement;

	constructor() {
		this.moveSound = new Audio(moveSound);
		this.eatSound = new Audio(eatSound);
	}

	playMoveSound() {
		this.moveSound.play();
	}

	playEatSound() {
		this.eatSound.play();
	}
}

export const audioManager = new AudioManager();
