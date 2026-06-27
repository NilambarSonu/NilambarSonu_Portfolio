export const displacementVert = `
uniform sampler2D u_depthMap;
uniform float u_time;
uniform float u_intensity;
varying vec2 vUv;

void main() {
    vUv = uv;
    
    // Sample depth from grayscale map
    float disp = texture2D(u_depthMap, vUv).r;
    
    vec3 pos = position;
    pos.z += disp * u_intensity;
    // Breathing undulating tentacles effect
    pos.x += sin(vUv.y * 10.0 + u_time) * 0.05 * disp;
    pos.y += cos(vUv.x * 10.0 + u_time * 0.8) * 0.03 * disp;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;
