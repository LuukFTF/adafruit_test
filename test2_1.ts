let pixelplus = 0

forever(function () {
    if (input.buttonA.isPressed()) {
        light.setPixelColor(0, 0xff0000)
        light.setPixelColor(1, 0xAB2A00)
        light.setPixelColor(2, 0x825700)
        light.setPixelColor(3, 0x578200)
        light.setPixelColor(4, 0x2AAB00)
        light.setPixelColor(5, 0x00ff00)
        light.setPixelColor(6, 0x00AB44)
        light.setPixelColor(7, 0x008282)
        light.setPixelColor(8, 0x0044AB)
        light.setPixelColor(9, 0x0000ff)

    }

    if (input.buttonB.wasPressed()) {
        light.setPixelColor(pixelplus, 0x0000ff)

        pixelplus = (pixelplus + 1) % 10
    }
})


