$B_SHADER_VERSION
#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D inputTexture;

varying vec4 texCoordVarying;

void main()
{
    
    vec4 tc = texture2D(inputTexture, texCoordVarying.st); // content of depth map
    vec4 itc = vec4(1.0 - tc.x, 1.0 - tc.y, 1.0 - tc.z, 1); // inverted
    
    float n = 0.1;
    float f = 10.0;
    float zDist1 = tc.x;
    float zDist2 = 2.0 * n / (f + n - zDist1 * (f - n));
    
    float zDist3 = (f + n - 2.0 * n * f / zDist1) / (f - n);
    
    float zDist4 = 2.0 * n * f / (f + n - zDist1 * (f - n));
    
    float zDist5 = 120.0 * (zDist1 - 0.49);
    
    gl_FragColor = itc;
    gl_FragColor = vec4(vec3(zDist5), 1.0);
    
    
    //float c1 = texture2D(inputTexture, texCoordVarying.st).w;
    //gl_FragColor = vec4(vec3(c1), 1.0);
    //gl_FragColor = vec4(vec3(0.5), 1.0);
}
