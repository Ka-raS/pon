import { CONFIG } from "./main.js";

export class Paddle extends Phaser.GameObjects.Rectangle {

    constructor(scene, side) {
        const x = CONFIG.width * (side === 'left' ? 0.04 : 0.96);
        const y = CONFIG.height / 2;
        const width  = CONFIG.width * 0.02;
        const height = CONFIG.height * 16 / 75;
        const color  = 0xffffff;

        super(scene, x, y, width, height, color);

        scene.add.existing(this);
        scene.physics.world.enable(this, Phaser.Physics.Arcade.STATIC_BODY);

        this.#speed = CONFIG.height * 0.4;
    }

    reset() {
        this.body.reset(this.x, CONFIG.height / 2);
    }

    up(deltaTime) {
        if (this.y - this.height / 2 <= 0) {
            return;
        }
        this.y -= this.#speed * deltaTime;
        this.body.updateFromGameObject();
    }

    down(deltaTime) {
        if (this.y + this.height / 2 >= CONFIG.height) {
            return;
        }
        this.y += this.#speed * deltaTime;
        this.body.updateFromGameObject();
    }

    #speed;

}