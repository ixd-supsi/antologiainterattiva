// -- vertex shader ------------------------------------------------------------
export const vertex = `

precision mediump float;
precision mediump int;

uniform vec2 u_resolution;
attribute vec2 a_position;
void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
}

`;

// -- frgament shader ----------------------------------------------------------
export const fragment = `

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;

float sdCircle( vec2 p, float r ) {
    return length(p) - r;
}

void main() {
    vec2 p = (2.0 * gl_FragCoord.xy-resolution.xy)/resolution.y;

    //
    float d = sdCircle(p + vec2(0.0, 0.0), 2.0);

    vec3 col = vec3(1.0) - sign(d);
    col *= 1.0 - exp(-1.0 * abs(d));
    col *= 0.8 + 0.2*cos(20.0*d - time*10.0);
    //col = mix( col, vec3(1.0), 1.0-smoothstep(0.0,0.01,abs(d)) );
    gl_FragColor = vec4(col, 1.0);
}
`;

