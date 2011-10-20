#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec3 vTransformedNormal;
varying vec4 vPosition;

uniform bool uLight0_Enabled;
uniform bool uTexture0_Enabled;

uniform vec3  uCameraPosition;
uniform vec3  uLight0_Position;
uniform vec3  uAmbientColor;
uniform vec3  uDiffuseColor;
uniform vec3  uSpecularColor;
uniform float uShininess;

uniform sampler2D uSampler;

void main(void) 
{
  vec3 LightWeighting;
  if (!uLight0_Enabled) 
  {
    LightWeighting = vec3(1.0, 1.0, 1.0);
  } 
  else 
  {
    vec3 Normal = normalize(vTransformedNormal);
    vec3 Light0_Direction = normalize(uLight0_Position - vPosition.xyz);
    vec3 Camera_Direction = normalize(uCameraPosition  - vPosition.xyz);
    vec3 ReflectionDirection     = reflect(-Light0_Direction, Normal);
    float DiffuseLightWeighting  = max(dot(Normal, Light0_Direction), 0.0);
    float SpecularLightWeighting = pow(max(dot(ReflectionDirection, Camera_Direction), 0.0), uShininess);
    LightWeighting = uAmbientColor + uDiffuseColor * DiffuseLightWeighting + uSpecularColor * SpecularLightWeighting;
  }

  vec4 FragmentColor;
  if (uTexture0_Enabled) 
  {
    FragmentColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
  } 
  else 
  {
    FragmentColor = vec4(1.0, 1.0, 1.0, 1.0);
  }
  
  // Apply the Light Weight to the fragment color
  gl_FragColor = vec4(FragmentColor.rgb * LightWeighting, FragmentColor.a);
}