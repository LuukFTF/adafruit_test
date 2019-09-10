
Search...
89909192939495969798991001011021031051061071081091101111121131148788104115116
// button Binput.buttonB.onEvent(ButtonEvent.Click, function () {       if (input.switchRight()) {        //switch right, button B         if (buttonB2state) {             light.setPixelColor(2, 0xFF0000)             pins.A2.servoWrite(20)            pause(100)            pins.A2.servoWrite(160)        } else {            light.clear()            music.stopAllSounds()         }        buttonB2state = !buttonB2state    } else {        //switch left, button B        buttonBstate = !buttonBstate            music.playMelody(MELODYB, 300)    }
            pins.A2.servoWrite(20)
            pause(100)
            pins.A2.servoWrite(160)

        } else {
            light.clear()
            music.stopAllSounds()

        }
        buttonB2state = !buttonB2state

Find
No Results

Type a name for your project
main
Made 1 formatting edit on line 102