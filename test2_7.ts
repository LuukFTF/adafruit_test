let pixelplus = 0
let buttonBstate = false
let rgbloop = 0

// Dit is een mooie function die ik gemaakt heb.
function add(x: number, y: number): number {
    return x + y
}
forever(function () {
    if (input.buttonA.wasPressed()) {
        light.setAll(0x000088)
        buttonBstate = false
        pixelplus = 0
        rgbloop = 0
        music.setVolume(255)
        music.playMelody("C1 B6 E5 D3 A5 F7 G9 E7 B8 C6 D8 F8 G8 B5 C7 D6 F8 A3 E7 G6 B8 C5 E7 A8 G5 F7 E7 G6 B8 C5 E7 A8 G5 F7 E7 G8 A8 D8 F9 B7 C8 F9 G7 E8 A8 G8 A7 D8 F6 B5 G8 A4 E1 C9 A8 E7 C9 F9 D8", 300)

    }
    if (input.buttonB.wasPressed()) {
        buttonBstate = !(buttonBstate)
        music.playSound("A A F")
    }
    if (buttonBstate) {
        light.setPixelColor(pixelplus, rgbloop)

        rgbloop = (rgbloop + 0x0F0F9F) % 0xFFFFFF
        pixelplus = (pixelplus + 1) % 10

        pause(1)
    }
})
