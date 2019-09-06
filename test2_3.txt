

let pixelplus = 0
let rgbloop = 0x000000

forever(function () {

    light.setPixelColor(pixelplus, rgbloop)

    rgbloop = (rgbloop + 0x0F0F9F) % 0xFFFFFF

    pixelplus = (pixelplus + 1) % 10

    pause(100)
})
