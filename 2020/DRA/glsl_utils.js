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

