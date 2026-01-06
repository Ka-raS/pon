import { Game } from './Game.js';

export const CONFIG = Object.freeze({
    type: Phaser.AUTO,
    pixelArt: true,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#000000',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade'
    },
    scene: [Game]
});

new Phaser.Game(CONFIG);
