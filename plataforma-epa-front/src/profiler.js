export const onRenderCallback = (
  id, // nombre del Profiler (puede ser cualquier string)
  phase, // "mount" o "update"
  actualDuration, // tiempo real que tardó el render
  baseDuration, // tiempo estimado si no hubiera memoización
  startTime, // cuándo empezó el render
  commitTime, // cuándo terminó
  interactions // interacciones asociadas (por ejemplo, eventos del usuario)
) => {
  console.log({
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions,
  });
}