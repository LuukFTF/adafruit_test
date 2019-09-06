let pixelplus = 0
let rgbloop = 0x000000
let buttonBstate = false


// Dit is een mooie function die ik gemaakt heb.
function add(x: number, y: number): number {
    return x + y
}



forever(function () {

    if (input.buttonB.wasPressed()) {



    }

    light.setPixelColor(pixelplus, rgbloop)

    rgbloop = (rgbloop + 0x0F0F9F) % 0xFFFFFF
    pixelplus = (pixelplus + 1) % 10

    pause(100)

})

