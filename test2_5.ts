// LuukFTF 
// adafruit fuckery v2 

let pixelplus = 0
let rgbloop = 0x000000
let buttonBstate = false


// Dit is een mooie function die ik gemaakt heb.
function add(x: number, y: number): number {
    return x + y
}


forever(function () {

    if (input.buttonA.wasPressed()) {
        light.setAll(1)

        buttonBstate = false
        pixelplus = 0
        rgbloop = 0x000000
    }

    if (input.buttonB.wasPressed()) {
        buttonBstate = !buttonBstate
    }

    if (buttonBstate) {
        light.setPixelColor(pixelplus, rgbloop)

        rgbloop = (rgbloop + 0x0F0F9F) % 0xFFFFFF
        pixelplus = (pixelplus + 1) % 10

        pause(1)

    }

    

})


