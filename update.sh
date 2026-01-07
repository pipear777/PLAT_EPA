#!/bin/bash
set -e

# --- CONFIGURACIÓN ---
PROJECT_DIR="/home/maria/PLAT_EPA"
LOG_FILE="$PROJECT_DIR/update.log"
LOCK_FILE="/tmp/deploy_epa.lock"

# --- BLOQUEO ---
if [ -e "$LOCK_FILE" ]; then
  echo "⏳ Script ya en ejecución, saliendo..." >> "$LOG_FILE"
  exit 0
fi

touch "$LOCK_FILE"
trap 'rm -f "$LOCK_FILE"' EXIT

cd "$PROJECT_DIR"

# Crear log
touch "$LOG_FILE"
echo "==========================================" >> "$LOG_FILE"
echo "🚀 Inicio deploy: $(date)" >> "$LOG_FILE"

# 🔥 PASO 1: Verificar cambios en Git
git fetch origin >> "$LOG_FILE" 2>&1

LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/main)

echo "📌 Commit local: $LOCAL" >> "$LOG_FILE"
echo "📌 Commit remoto: $REMOTE" >> "$LOG_FILE"

if [ "$LOCAL" = "$REMOTE" ]; then
  echo "✅ No hay cambios en Git" >> "$LOG_FILE"
else
  echo "🔄 Cambios detectados en Git, actualizando..." >> "$LOG_FILE"
  git pull origin main >> "$LOG_FILE" 2>&1
fi

# 🔥 PASO 2: SIEMPRE intentar descargar nuevas imágenes
echo "🐳 Descargando imágenes de Docker Hub..." >> "$LOG_FILE"
docker compose pull >> "$LOG_FILE" 2>&1

# 🔥 PASO 3: Recrear contenedores FORZOSAMENTE
echo "🔄 Recreando contenedores..." >> "$LOG_FILE"
docker compose up -d --force-recreate --remove-orphans >> "$LOG_FILE" 2>&1

# 🔥 PASO 4: Limpiar imágenes antiguas
echo "🧹 Limpiando imágenes antiguas..." >> "$LOG_FILE"
docker image prune -af >> "$LOG_FILE" 2>&1

# 🔥 PASO 5: Verificar que los contenedores estén corriendo
echo "✅ Verificando contenedores..." >> "$LOG_FILE"
docker compose ps >> "$LOG_FILE" 2>&1

echo "✅ Deploy finalizado correctamente: $(date)" >> "$LOG_FILE"