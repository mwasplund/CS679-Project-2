#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec3 vTransformedNormal;
varying vec4 vPosition;

uniform bool uLight0_Enabled;
uniform vec3 uLight0_Position;
uniform vec3 uLight0_Color;

uniform bool uLight1_Enabled;
uniform vec3 uLight1_Position;
uniform vec3 uLight1_Color;

uniform bool uTexture0_Enabled;

uniform vec3  uCameraPosition;
uniform vec3  uAmbientColor;
uniform vec3  uDiffuseColor;
uniform vec3  uSpecularColor;
uniform float uShininess;

uniform sampler2D uSampler;

void main(void) 
{
  vec3 ColorWeighting = vec3(1.0, 1.0, 1.0);

  if (uLight0_Enabled) 
  {
    vec3 Normal = normalize(vTransformedNormal);
    vec3 Light0_Direction = normalize(uLight0_Position - vPosition.xyz);
    vec3 Camera_Direction = normalize(uCameraPosition  - vPosition.xyz);
    vec3 ReflectionDirection     = reflect(-Light0_Direction, Normal);
    float DiffuseLightWeighting  = max(dot(Normal, Light0_Direction), 0.0);
    float SpecularLightWeighting = pow(max(dot(ReflectionDirection, Camera_Direction), 0.0), uShininess);
    vec3 LightWeighting = uAmbientColor + uDiffuseColor * DiffuseLightWeighting + uSpecularColor * SpecularLightWeighting;
    ColorWeighting = ColorWeighting * LightWeighting * uLight0_Color;
  } 
  
  if (uLight1_Enabled) 
  {
    vec3 Normal = normalize(vTransformedNormal);
    vec3 Light1_Direction = normalize(uLight1_Position - vPosition.xyz);
    vec3 Camera_Direction = normalize(uCameraPosition  - vPosition.xyz);
    vec3 ReflectionDirection     = reflect(-Light1_Direction, Normal);
    float DiffuseLightWeighting  = max(dot(Normal, Light1_Direction), 0.0);
    float SpecularLightWeighting = pow(max(dot(ReflectionDirection, Camera_Direction), 0.0), uShininess);
    vec3 LightWeighting = uAmbientColor + uDiffuseColor * DiffuseLightWeighting + uSpecularColor * SpecularLightWeighting;
    ColorWeighting = ColorWeighting * LightWeighting * uLight1_Color;
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
  gl_FragColor = vec4(FragmentColor.rgb * ColorWeighting, FragmentColor.a);
}
