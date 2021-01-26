const path = require('path')
const os = require('os')

const form = document.getElementById('image-form')
const slider = document.getElementById('slider')
const img = document.getElementById('img')



document.getElementById('output-path').innerText = path.join(os.homedir(), "Image_Shrink")

