// GLSL utils
//
// -------------------------------------------------------
// Shader helpers
export function compileShader(gl, shaderSource, shaderType){
    var shader = gl.createShader(shaderType)
    gl.shaderSource(shader, shaderSource)
    gl.compileShader(shader)
    const status = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
    if (!status){
        throw new TypeError("Shader compile failed with: " + gl.getShaderInfoLog(shader))
    }
    return shader
}

export function getAttribLocation(gl, program, name) {
    var attributeLocation = gl.getAttribLocation(program, name)
    if (attributeLocation === -1) {
        throw 'Cannot find attribute ' + name + '.'
    }
    return attributeLocation
}

export function getUniformLocation(gl, program, name) {
    var attributeLocation = gl.getUniformLocation(program, name)
    if (attributeLocation === -1) {
        throw 'Cannot find uniform ' + name + '.'
    }
    return attributeLocation
}

// -------------------------------------------------------
// Rect buffer as two triangles
export function setRect(gl, x, y, width, height) {
    const x1 = x;
    const x2 = x + width;
    const y1 = y;
    const y2 = y + height;
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        x1, y1,
        x2, y1,
        x1, y2,
        x1, y2,
        x2, y1,
        x2, y2,
    ]), gl.STATIC_DRAW);
}

// -------------------------------------------------------
// Texture loader
// From: https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Using_textures_in_WebGL
export function loadTexture(gl, url, callback) { // AG: added a callback

    function isPowerOf2(value) {
        return (value & (value - 1)) == 0
    }

    const level = 0
    const internalFormat = gl.RGBA
    const width = 1
    const height = 1
    const border = 0
    const srcFormat = gl.RGBA
    const srcType = gl.UNSIGNED_BYTE
    const pixel = new Uint8Array([0, 0, 0, 255])    // opaque black

    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, pixel)

    const image = new Image()
    image.onload = function() {
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image)

        // WebGL1 has different requirements for power of 2 images
        // vs non power of 2 images so check if the image is a
        // power of 2 in both dimensions.
        if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
             // Yes, it's a power of 2. Generate mips.
             gl.generateMipmap(gl.TEXTURE_2D)
        } else {
             // No, it's not a power of 2. Turn off mips
             // and set wrapping to clamp to edge
             gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
             gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
             gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR) // gl.NEAREST?
             gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
        }
        if (typeof callback === 'function') callback(image, texture)
    }
    image.src = url
    return texture
}
