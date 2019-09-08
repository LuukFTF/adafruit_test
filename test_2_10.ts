// LuukFTF v4.2
interface IDictionary<TValue> {
    [id: string]: TValue;
}

const BPM = 2000
const MUSIC_VOLUME = 255
const MELODY = "C2 B6 E5 D3 A5 F7 G9 E7 B8 C6 D8 F8 G8 B5 C7 D6 F8 A3 E7 G6 B8 C5 E7 A8 G5 F7 E7 G6 B8 C5 E7 A8 G5 F7 E7 G8 A8 D8 F9 B7 C8 F9 G7 E8 A8 G8 A7 D8 F6 B5 G8 A4 E1 C9 A8 E7 C9 F9 D8".split(" ")
const MELODYB = "A5 B5 - D6 B5 - F#6 - F#6 - E6 - - A5 B5 - D6 B5 - E6 - E6 - D6 C#6 B5 - - A5 B5 - D6 B5 - D6 - E6 C#6 - A5 - A5 E6 - D6 - -"
// tickrate is 100
const MS_PER_BEAT = 100 / (BPM / 60)
const RGB_LOOP_INCREASE = 10
const RGB_LOOP_MAX = 255
const A_COLOR = 0x000000
const LETTER_TO_LED: IDictionary<number> = { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6 }
const NUMBER_TO_COLOR: IDictionary<number> = { 1: 0x000000, 2: 0xFF0000, 3: 0xCC4400, 4: 0x44CC00, 5: 0x00FF00, 6: 0x00CC44, 7: 0x008888, 8: 0x0044CC, 9: 0x0000FF }
const NUMBER_TO_LED: IDictionary<number> = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8 }
const LETTER_TO_COLOR: IDictionary<number> = { A: 0xFF0000, B: 0xCC4400, C: 0x44CC00, D: 0x00FF00, E: 0x00CC44, F: 0x0044CC, G: 0x0000FF }

let currentMelody: string[]
let rgbloop = 0
let pixelplus = 0
let buttonAstate = false
let buttonBstate = false
let buttonB2state = false
let melodyState = false
let melodyIndex = 0
let timeSinceLastBeat = MS_PER_BEAT
let sensorState = false

music.setVolume(MUSIC_VOLUME)



// add funtion
// Dit is een mooie function die ik gemaakt heb.
function add(x: number, y: number): number {
    return x + y
}


// shuffle string function
// deze is geleend
function shuffle(array: string[]) {
    array.sort(() => Math.random() - 0.5);
}




// touch buttons
input.touchA1.onEvent(ButtonEvent.Click, function () {
    music.playSound("A5")
})
/*
input.touchA2.onEvent(ButtonEvent.Click, function () {
    music.playSound("B5")
})

input.touchA3.onEvent(ButtonEvent.Click, function () {
    music.playSound("C6")
})

input.touchA4.onEvent(ButtonEvent.Click, function () {
    music.playSound("D6")
})

input.touchA5.onEvent(ButtonEvent.Click, function () {
    music.playSound("E6")
})

input.touchA6.onEvent(ButtonEvent.Click, function () {
    music.playSound("F6")
})

input.touchA7.onEvent(ButtonEvent.Click, function () {
    music.playSound("G6")
})

*/


// button A
input.buttonA.onEvent(ButtonEvent.Click, function () {



    if (input.switchRight()) {
        //switch right, button A
        sensorState = !sensorState
        light.clear()
        music.stopAllSounds()

    } else {
        //switch left, button A
        buttonAstate = !buttonAstate

        if (buttonAstate) {
            light.clear()
            buttonBstate = false
            pixelplus = 0
            rgbloop = 0
            currentMelody = MELODY
            shuffle(currentMelody)
            melodyState = !melodyState
        } else {
            light.clear()
            music.stopAllSounds()
        }

    }


})


// button B
input.buttonB.onEvent(ButtonEvent.Click, function () {



    if (input.switchRight()) {
        //switch right, button B

        if (buttonB2state) {
            light.clear()
            music.stopAllSounds()
            light.setPixelColor(0, 0xFF00FF)

        } else {
            light.clear()
            music.stopAllSounds()

        }
        buttonB2state = !buttonB2state
    } else {
        //switch left, button B
        buttonBstate = !buttonBstate

        music.playMelody(MELODYB, 300)
    }


})


// switch moved to right
// clear light when switch is moved to right
input.onSwitchMoved(SwitchDirection.Right, function () {
    light.clear()
})



// Loop
forever(function () {



    if (input.switchRight()) {
        // switch right

    } else {
        // switch left
        light.setPixelColor(pixelplus, light.hsv(rgbloop))
        rgbloop = (rgbloop + RGB_LOOP_INCREASE) % RGB_LOOP_MAX
        pixelplus = (pixelplus + 1) % 10
    }

    /*//sensor mode 
    if (sensorState) {
        light.setPixelColor(9, light.hsv(input.lightLevel()))
        light.setPixelColor(8, light.hsv(input.soundLevel()))
        light.setPixelColor(7, light.hsv(input.temperature(1)))
        light.setPixelColor(3, light.hsv(input.rotation(0)))
        light.setPixelColor(2, light.hsv(input.rotation(1)))
        light.setPixelColor(1, light.hsv(input.acceleration(Dimension.X)))
        light.setPixelColor(0, light.hsv(input.acceleration(Dimension.Y)))
    }
    */

    // music player mode
    // on button a press
    if (melodyState) {
        if (timeSinceLastBeat == MS_PER_BEAT) {
            let note = currentMelody[melodyIndex]
            let noteSplit = note.split("")
            light.setPixelColor(NUMBER_TO_LED[noteSplit[1]], LETTER_TO_COLOR[noteSplit[0]])
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

    pause(1)
})
// EOF  
