export const nameReflectionFrag = `
uniform float u_time;
uniform sampler2D u_texture;
varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    
    // UV y=0 is bottom, y=1 is top in WebGL
    // Bottom half gets distorted
    if (uv.y < 0.5) {
        float ripple = sin(uv.x * 40.0 + u_time * 3.0) * 0.008;
        float ripple2 = cos(uv.y * 20.0 - u_time * 2.0) * 0.005;
        uv.y += ripple;
        uv.x += ripple2;
        
        vec4 baseColor = texture2D(u_texture, uv);
        
        // Chromatic aberration and glitch
        float glitchOffset = sin(uv.y * 100.0 + u_time * 10.0) * 0.002;
        float r = texture2D(u_texture, uv + vec2(0.005 + glitchOffset, 0.0)).r;
        float g = baseColor.g;
        float b = texture2D(u_texture, uv - vec2(0.005 - glitchOffset, 0.0)).b;
        
        gl_FragColor = vec4(r, g, b, baseColor.a) * vec4(0.8, 0.8, 0.9, 1.0); // Slight darkening
    } else {
        gl_FragColor = texture2D(u_texture, uv);
    }
}
`;
