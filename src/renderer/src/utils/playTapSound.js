import tapSound from "../assets/sounds/tap.mp3"

export function playTapSound() {
    (new Audio(tapSound)).play();
}