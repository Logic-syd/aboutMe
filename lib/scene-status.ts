export type SceneFailure = 'graphics-unavailable' | 'context-lost' | 'download-failed' | 'scene-error';

export const sceneFailureMessages: Record<SceneFailure, string> = {
  'graphics-unavailable': 'This browser could not start the 3D graphics view. Check that hardware acceleration is enabled, or try another browser.',
  'context-lost': 'The browser interrupted the 3D graphics view. Try loading it again.',
  'download-failed': 'The 3D files could not be downloaded. Check your connection and reload the page.',
  'scene-error': 'The 3D scene encountered an error. You can retry or browse the project cards below.',
};

export function classifySceneError(error: Error): SceneFailure {
  if (/webgl|creating.*context/i.test(error.message)) return 'graphics-unavailable';
  if (/chunk|dynamically imported|failed to fetch|loading.*module/i.test(error.message)) return 'download-failed';
  return 'scene-error';
}
