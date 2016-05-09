precision mediump float;
uniform float numLights;
uniform vec4 lightPositionViewSpace_0;
uniform float lightIntensity_0;
uniform float lightAttenuation_0;
uniform float lightRadius_0;
uniform vec3 lightDiffuseColor_0;
uniform vec3 lightSpecularColor_0;
varying vec3 lightVectorTangentSpace_0;
varying float intensityBasedOnDist_0;
uniform vec4 lightPositionViewSpace_1;
uniform float lightIntensity_1;
uniform float lightAttenuation_1;
uniform float lightRadius_1;
uniform vec3 lightDiffuseColor_1;
uniform vec3 lightSpecularColor_1;
varying vec3 lightVectorTangentSpace_1;
varying float intensityBasedOnDist_1;
uniform vec4 lightPositionViewSpace_2;
uniform float lightIntensity_2;
uniform float lightAttenuation_2;
uniform float lightRadius_2;
uniform vec3 lightDiffuseColor_2;
uniform vec3 lightSpecularColor_2;
varying vec3 lightVectorTangentSpace_2;
varying float intensityBasedOnDist_2;
uniform vec4 lightPositionViewSpace_3;
uniform float lightIntensity_3;
uniform float lightAttenuation_3;
uniform float lightRadius_3;
uniform vec3 lightDiffuseColor_3;
uniform vec3 lightSpecularColor_3;
varying vec3 lightVectorTangentSpace_3;
varying float intensityBasedOnDist_3;
varying vec2 texCoordVarying;
varying vec3 surfaceToCameraTangentSpace;
uniform sampler2D DiffuseMap;
uniform sampler2D Klomo;
uniform sampler2D NormalMap;
uniform sampler2D SpecularMap;
uniform vec3 ambientColor;
uniform vec3 Ka;
uniform vec3 Kd;
uniform vec3 Ks;
uniform float Ns;
uniform float transparency;

varying mediump vec4 posVarying; // pos in world space
varying mediump vec3 normalVarying;     // normal in world space



void main() {
vec4 diffuse = vec4(0.0,0.0,0.0,transparency);
vec4 specular = vec4(0.0,0.0,0.0,0.0);
float specularCoefficient = 0.0;
vec3 surfaceToCamera = normalize(surfaceToCameraTangentSpace);
vec3 surfaceNormal = normalize(texture2D(NormalMap, texCoordVarying).xyz *2.0 - 1.0);
float intensity = 0.0;
if(numLights >= 1.0){
if (intensityBasedOnDist_0 > 0.0 && (intensity = max(dot(surfaceNormal, normalize(lightVectorTangentSpace_0)), 0.0)) > 0.0){
intensity = clamp(intensity, 0.0, 1.0);
diffuse += vec4(lightDiffuseColor_0 * (intensity * intensityBasedOnDist_0), 0.0);
specularCoefficient = pow(max(0.0, dot(surfaceToCamera, reflect(-normalize(lightVectorTangentSpace_0), surfaceNormal))), Ns);
specular += vec4(lightSpecularColor_0 * (specularCoefficient * intensity * intensityBasedOnDist_0), 0.0);
}if(numLights >= 2.0){
if (intensityBasedOnDist_1 > 0.0 && (intensity = max(dot(surfaceNormal, normalize(lightVectorTangentSpace_1)), 0.0)) > 0.0){
intensity = clamp(intensity, 0.0, 1.0);
diffuse += vec4(lightDiffuseColor_1 * (intensity * intensityBasedOnDist_1), 0.0);
specularCoefficient = pow(max(0.0, dot(surfaceToCamera, reflect(-normalize(lightVectorTangentSpace_1), surfaceNormal))), Ns);
specular += vec4(lightSpecularColor_1 * (specularCoefficient * intensity * intensityBasedOnDist_1), 0.0);
}if(numLights >= 3.0){
if (intensityBasedOnDist_2 > 0.0 && (intensity = max(dot(surfaceNormal, normalize(lightVectorTangentSpace_2)), 0.0)) > 0.0){
intensity = clamp(intensity, 0.0, 1.0);
diffuse += vec4(lightDiffuseColor_2 * (intensity * intensityBasedOnDist_2), 0.0);
specularCoefficient = pow(max(0.0, dot(surfaceToCamera, reflect(-normalize(lightVectorTangentSpace_2), surfaceNormal))), Ns);
specular += vec4(lightSpecularColor_2 * (specularCoefficient * intensity * intensityBasedOnDist_2), 0.0);
}if(numLights >= 4.0){
if (intensityBasedOnDist_3 > 0.0 && (intensity = max(dot(surfaceNormal, normalize(lightVectorTangentSpace_3)), 0.0)) > 0.0){
intensity = clamp(intensity, 0.0, 1.0);
diffuse += vec4(lightDiffuseColor_3 * (intensity * intensityBasedOnDist_3), 0.0);
specularCoefficient = pow(max(0.0, dot(surfaceToCamera, reflect(-normalize(lightVectorTangentSpace_3), surfaceNormal))), Ns);
specular += vec4(lightSpecularColor_3 * (specularCoefficient * intensity * intensityBasedOnDist_3), 0.0);
}} } } } diffuse = diffuse * vec4(Kd,1.0) * texture2D(DiffuseMap, texCoordVarying);
specular = specular  * vec4(Ks, 0.0);
    vec3 kkk = normalize(posVarying).xyz;
gl_FragColor = clamp(diffuse+specular, 0.0, 1.0);
    
    // gl_FragColor = texture2D(Klomo, texCoordVarying);
    
    float xx = posVarying.x / 10.0;
    float yy = posVarying.z / 10.0;
    
    vec4 caust = texture2D(Klomo, vec2(xx, yy));
    
    gl_FragColor = texture2D(Klomo, vec2(xx, yy));
    
    
    // gl_FragColor = clamp(diffuse+specular, 0.0, 1.0);
    
    
    // Kind of OK, caust is never really black -> change image
    // On top and on bottom
    gl_FragColor = clamp(diffuse+specular+caust, 0.0, 1.0);
    
    
    
    // gl_FragColor = vec4(kkk, 1.0);
    
    // Also kind of OK (cuast only on top)
    vec4 caust2 = vec4(0.0, 0.0, 0.0, 0.0);
    vec3 up = vec3(0.0, 1.0, 0.0);
    float upAngle = dot(up, normalVarying);
    if (upAngle > 0.0) {
        // sharp edge:
        // caust2 = texture2D(Klomo, vec2(xx, yy));
        
        // softer edge
        caust2 = upAngle * upAngle * texture2D(Klomo, vec2(xx, yy));
    }
    gl_FragColor = clamp(diffuse+specular+caust2, 0.0, 1.0);
    
    
    
    
    
    
    //gl_FragColor = vec4(lightIntensity_1, 1.0, 1.0, 1.0);
    // gl_FragColor = texture2D(DiffuseMap, texCoordVarying) * vec4(Kd, 0.0);
    //gl_FragColor = diffuse;
    // gl_FragColor = vec4(surfaceNormal, 1.0);
}
