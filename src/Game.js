import { Ball } from "./Ball.js";
import { Paddle } from "./Paddle.js";

export class Game extends Phaser.Scene {

    constructor() {
        super('Game');
    }

    create() {
        this.#playing = false;
        this.#keys = this.input.keyboard.addKeys('W,S,UP,DOWN,SPACE');

        this.#ball        = new Ball(this);
        this.#leftPaddle  = new Paddle(this, 'left');
        this.#rightPaddle = new Paddle(this, 'right');

        this.#collisionCount = 0;
        this.physics.add.collider(
            this.#ball,
            [this.#leftPaddle, this.#rightPaddle],
            () => ++this.#collisionCount
        );

        this.#reset();
    }

    update(time, delta) {
        this.#handleInput(delta / 1000);
        this.#handleCollision();
    }

    #reset() {
        this.#playing = false;
        this.#collisionCount = 0;

        this.#ball.reset();
        this.#leftPaddle.reset();
        this.#rightPaddle.reset();
    }

    #handleInput(deltaTime) {
        if (this.#keys.W.isDown) {
            this.#leftPaddle.up(deltaTime);
        } else if (this.#keys.S.isDown) {
            this.#leftPaddle.down(deltaTime);
        }

        if (this.#keys.UP.isDown) {
            this.#rightPaddle.up(deltaTime);
        } else if (this.#keys.DOWN.isDown) {
            this.#rightPaddle.down(deltaTime);
        }

        if (Phaser.Input.Keyboard.JustDown(this.#keys.SPACE)) {
            if (this.#playing) {
                this.#reset();
            } else {
                this.#ball.launch();
                this.#playing = true;
            }
        }
    }

    #handleCollision() {
        if (this.#collisionCount >= 10) {
            this.#collisionCount = 0;
            this.#ball.accelerate();
        }
        if (this.#ball.wasOutOfBounds()) {
            this.#reset();
        }
    }

    #playing; #keys; #ball; #leftPaddle; #rightPaddle; #collisionCount;

}
