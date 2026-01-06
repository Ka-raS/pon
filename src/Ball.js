import { CONFIG } from "./main.js";

export class Ball extends Phaser.GameObjects.Ellipse {

    constructor(scene) {
        const x = CONFIG.width / 2;
        const y = CONFIG.height / 2;
        const size  = CONFIG.width * 0.02;
        const color = 0xffffff;

        super(scene, x, y, size, size, color);
        this.#speed = CONFIG.width * 0.5;
        this.#outOfBounds = false;

        scene.add.existing(this);
        scene.physics.world.enable(this, Phaser.Physics.Arcade.DYNAMIC_BODY);

        this.body.setBounce(1, 1);
        this.body.setFriction(0, 0);
        this.body.setCollideWorldBounds(true);

        this.body.onWorldBounds = true;
        this.body.world.on('worldbounds', (body, up, down, left, right) => {
            if (body === this.body && (left || right)) {
                this.#outOfBounds = true;
            }
        });

    }

    reset() {
        this.body.stop();
        this.body.reset(CONFIG.width / 2, CONFIG.height / 2);
        this.#outOfBounds = false;
    }

    launch() {
        const angle = Math.random() * Math.PI * 2;
        this.body.setVelocity(
            Math.cos(angle) * this.#speed,
            Math.sin(angle) * this.#speed
        );
    }

    accelerate() {
        this.#speed *= 1.1;
    }

    wasOutOfBounds() {
        return this.#outOfBounds;
    }

    #speed; #outOfBounds;

}