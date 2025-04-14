// AudioManager.ts
import moveSound from '../assets/audio/Move.mp3';
import eatSound from '../assets/audio/Capture.mp3';

class AudioManager {
	private moveSound!: HTMLAudioElement;
	private eatSound!: HTMLAudioElement;
	private isInitialized: boolean = false;

	constructor() {
		this.initSounds();
	}

	private initSounds() {
		this.moveSound = new Audio(moveSound);
		this.eatSound = new Audio(eatSound);
		this.isInitialized = true;
	}

	public playMoveSound() {
		if (!this.isInitialized) {
			this.initSounds();
		}

		this.moveSound.play().catch(error => {
			console.warn('Failed to play move sound:', error);
			this.initSounds();
			this.moveSound.play().catch(e => console.error('Still failed:', e));
		});
	}

	public playEatSound() {
		if (!this.isInitialized) {
			this.initSounds();
		}

		this.eatSound.play().catch(error => {
			console.warn('Failed to play eat sound:', error);
			this.initSounds();
			this.eatSound.play().catch(e => console.error('Still failed:', e));
		});
	}
}

export const audioManager = new AudioManager();
