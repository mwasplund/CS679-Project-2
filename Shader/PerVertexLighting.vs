attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec3 aVertexNormal;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat3 uNMatrix;

uniform bool uTexture0_Enabled;
uniform bool uLight0_Enabled;


uniform vec3  uLight0_Position;
uniform vec3  uAmbientColor;
uniform vec3  uDiffuseColor;

varying vec2 vTextureCoord;
varying vec3 vLightWeighting;

void main(void) 
{
  vec4 mvPosition = uMVMatrix * vec4(aVertexPosition, 1.0);
  gl_Position = uPMatrix * mvPosition;
  vTextureCoord = aTextureCoord;
  vec3 TransformedNormal = uNMatrix * aVertexNormal;
  
  if(uLight0_Enabled)
  {
    vec3 Light0_Direction = normalize(uLight0_Position - mvPosition.xyz);
    float DiffuseLightWeighting = max(dot(TransformedNormal, Light0_Direction), 0.0);
    vLightWeighting = uAmbientColor + uDiffuseColor * DiffuseLightWeighting ;
  }
  else
  {
    vLightWeighting = vec3(1.0, 1.0, 1.0);
  }
}
