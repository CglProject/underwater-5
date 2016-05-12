$B_SHADER_VERSION
#ifdef GL_ES
precision lowp float;
#endif

uniform sampler2D inputTexture;

varying vec4 texCoordVarying;

void main()
{
    vec4 tc = texture2D(inputTexture, texCoordVarying.st); // content of depth map
    vec4 itc = vec4(1.0 - tc.x, 1.0 - tc.y, 1.0 - tc.z, 1); // inverted
    gl_FragColor = itc;
}
