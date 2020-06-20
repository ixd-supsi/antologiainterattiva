import * as GLU from './glsl_utils.js'
import * as shader_sources from './shader.js'

// -- Canvas ------------------------------------
const canvas = document.querySelector("canvas")
const gl = canvas.getContext('webgl')
if(!gl){
    console.error("Unable to initialize WebGL")
}

// -- Pointer -----------------------------------
const pointer = {
    x       : 0,
    y       : 0,
    px      : 0,
    py      : 0,
    pressed : false
}

canvas.addEventListener('mousemove', function(e){
    pointer.px = pointer.x
    pointer.py = pointer.y
    pointer.x  = e.pageX
    pointer.y  = e.pageY
})

// 1. Vertex & fragment shaders
const v_shader = GLU.compileShader(gl, shader_sources.vertex, gl.VERTEX_SHADER)
const f_shader = GLU.compileShader(gl, shader_sources.fragment, gl.FRAGMENT_SHADER)

// 2. Shader programs
const program = gl.createProgram()
gl.attachShader(program, v_shader)
gl.attachShader(program, f_shader)
gl.linkProgram(program)
gl.useProgram(program)

// 3. Buffers
const position_buf = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, position_buf)
GLU.setRect(gl, -1, -1, 2, 2)

// 4. Attribs
const a_position = GLU.getAttribLocation(gl, program, 'a_position')

gl.enableVertexAttribArray(a_position)
gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 2 * 4, 0)

// 4. Set Uniforms
const u_time = GLU.getUniformLocation(gl, program, 'time')
const u_resolution = GLU.getUniformLocation(gl, program, 'resolution')
const u_pointer = GLU.getUniformLocation(gl, program, 'mouse')

// -- Loop -----------------------------------
requestAnimationFrame(loop)

function loop(t){
    const r = window.devicePixelRatio
    const w = Math.floor(gl.canvas.clientWidth * r)
    const h = Math.floor(gl.canvas.clientHeight * r)

    // Resize
    if (canvas.width != w || canvas.height != h){
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
        gl.uniform2f(u_resolution, w, h)
    }

    // Immagine
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(u_pointer, pointer.x * r / w, h-pointer.y * r / h)
    gl.uniform1f(u_time, t / 1000.0)

    gl.drawArrays(gl.TRIANGLES, 0, 6)

    requestAnimationFrame(loop)
}