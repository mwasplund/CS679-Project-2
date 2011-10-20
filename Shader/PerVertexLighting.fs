#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec3 vLightWeighting;

uniform sampler2D uSampler;
uniform bool uTexture0_Enabled;

void main(void) 
{
  vec4 Color;
  if(uTexture0_Enabled)
    Color = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
  else
    Color = vec4(0.8, 0.8, 0.8, 1.0);
    
  gl_FragColor = vec4(Color.rgb * vLightWeighting, Color.a);
}