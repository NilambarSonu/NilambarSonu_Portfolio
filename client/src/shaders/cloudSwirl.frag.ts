export const cloudSwirlFrag = `
uniform float u_time;
uniform sampler2D u_texture;
varying vec2 vUv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f*f*(3.0-2.0*f);
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
        value += amplitude * noise(p);
        p *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

void main() {
    // Add time-based distortion
    vec2 distortedUV = vUv + fbm(vUv * 3.0 + u_time * 0.1) * 0.08;
    vec4 texColor = texture2D(u_texture, distortedUV);
    
    // Add a pulsing red ambient glow
    float glow = fbm(vUv * 2.0 - u_time * 0.05);
    vec3 glowColor = vec3(0.6, 0.0, 0.0) * glow * 0.3;
    
    gl_FragColor = vec4(texColor.rgb + glowColor, texColor.a);
}
`;
