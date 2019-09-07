const BPM = 300
const MUSIC_VOLUME = 255
const MELODY = "C2 B6 E5 D3 A5 F7 G9 E7 B8 C6 D8 F8 G8 B5 C7 D6 F8 A3 E7 G6 B8 C5 E7 A8 G5 F7 E7 G6 B8 C5 E7 A8 G5 F7 E7 G8 A8 D8 F9 B7 C8 F9 G7 E8 A8 G8 A7 D8 F6 B5 G8 A4 E1 C9 A8 E7 C9 F9 D8".split(" ")
const MELODYB = "A A F"
const MS_PER_BEAT = 100 / (BPM / 60) //tickrate is 100
const RGB_LOOP_INCREASE = 0x0F0F9F
const RGB_LOOP_MAX = 0xFFFFFF
const A_COLOR = 0x000088
const LETTER_TO_LED = new Map([["A", 0], ["B", 1], ["C", 2], ["D", 3], ["E", 4], ["F", 5], ["G", 6]])
const NUMBER_TO_COLOR = new Map([["1", 0x000000], ["2", 0xFF0000], ["3", 0xCC4400], ["4", 0x44CC00], ["5", 0x00FF00], ["6", 0x00CC44], ["7", 0x008888], ["8", 0x0044CC], ["9", 0x0000FF]])

let rgbloop = 0
let pixelplus = 0
let buttonBstate = false
let melodyState = false
let melodyIndex = 0
let timeSinceLastBeat = MS_PER_BEAT

music.setVolume(MUSIC_VOLUME)

// Dit is een mooie function die ik gemaakt heb.
function add(x: number, y: number): number {
    return x + y
}


forever(function () {
    if (melodyState) {
        if (timeSinceLastBeat == MS_PER_BEAT) {
            let note = MELODY[melodyIndex]
            let noteSplit = note.split()

            light.pixelColor(LETTER_TO_LED.get(noteSplit[0]))
            music.playSound(note)
            melodyIndex++
            timeSinceLastBeat = 0
            


            if (melodyIndex == MELODY.length - 1) {
                melodyState = false
                melodyIndex = 0

            }
        }

        timeSinceLastBeat++
    }
    if (input.buttonA.wasPressed()) {
        light.setAll(A_COLOR)
        buttonBstate = false
        pixelplus = 0
        rgbloop = 0
        melodyState = !melodyState
    }
    if (input.buttonB.wasPressed()) {
        buttonBstate = !buttonBstate
        music.playSound(MELODYB)
    }
    if (buttonBstate) {
        light.setPixelColor(pixelplus, rgbloop)
        rgbloop = (rgbloop + RGB_LOOP_INCREASE) % RGB_LOOP_MAX
        pixelplus = (pixelplus + 1) % 10
    }
    pause(1)
})

