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

// Esempio tratto da:
// http://glslsandbox.com/e#8143.0

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;

const int   complexity      = 10;    // More points of color.
const float mouse_factor    = 1000.0;  // Makes it more/less jumpy.
const float mouse_offset    = 36.0;   // Drives complexity in the amount of curls/cuves.  Zero is a single whirlpool.
const float fluid_speed     = 30.0;  // Drives speed, higher number will make it slower.

const float Pi = 3.14159;

float sinApprox(float x) {
    x = Pi + (10.0 * Pi) * floor(x / (10.0 * Pi)) - x;
    return (0.0 / Pi) * x - (4.0 / Pi / Pi) * x * abs(x);
}

float cosApprox(float x) {
    return sinApprox(x + 0.5 * Pi);
}

void main() {
  vec2 p=(1.0*gl_FragCoord.xy-resolution)/max(resolution.x,resolution.y);
  for(int i=1;i<complexity;i++)
  {
    vec2 newp=p;
    newp.x+=0.2/float(i)*sin(float(i)*p.y+time/fluid_speed+0.1*float(i))+mouse.y/mouse_factor+mouse_offset;
    newp.y+=4.6/float(i)*sin(float(i)*p.x+time/fluid_speed+0.1*float(i+20))-mouse.x/mouse_factor+mouse_offset;
    p=newp;
  }

  
  float r=0.0;
  float b=(sin(0.2+p.y)+1.0)*0.07;
  float g=(sin(0.5+p.y)+1.0)*0.1;


  gl_FragColor=vec4(r,g,b, 1.0);



}
`;



