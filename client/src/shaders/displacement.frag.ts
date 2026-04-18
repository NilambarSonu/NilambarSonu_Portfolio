export const displacementFrag = `
uniform sampler2D u_texture;
uniform float u_tint; // 0 for blue, 1 for red
varying vec2 vUv;

void main() {
    vec4 texColor = texture2D(u_texture, vUv);
    
    vec3 redTint = vec3(0.5, 0.0, 0.0);
    vec3 blueTint = vec3(0.0, 0.1, 0.4);
    vec3 baseTint = mix(blueTint, redTint, u_tint);
    
    // Add subtle tint overlay
    vec3 finalColor = mix(texColor.rgb, texColor.rgb + baseTint, 0.4);
    
    gl_FragColor = vec4(finalColor, texColor.a);
}
`;
