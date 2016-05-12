$B_SHADER_VERSION
#ifdef GL_ES
precision lowp float;
#endif

uniform sampler2D inputTexture;

varying vec4 texCoordVarying;

void main()
{
    vec4 tc = texture2D(inputTexture, texCoordVarying.st);
    gl_FragColor = tc;
}
