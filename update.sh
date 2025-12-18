#!/bin/bash
set -e

# --- CONFIGURACIÓN ---
PROJECT_DIR="/home/maria/PLAT_EPA"
LOG_FILE="$PROJECT_DIR/update.log"
LOCK_FILE="/tmp/deploy_epa.lock"

# --- LÓGICA DE BLOQUEO ---
# Si el archivo de bloqueo existe, otra actualización está en curso.
if [ -e "$LOCK_FILE" ]; then
  echo "INFO: Despliegue ya en progreso. Omitiendo ejecución. $(date)" >> "$LOG_FILE"
  exit 1
fi

# Crea el archivo de bloqueo y asegura su eliminación al final.
touch "$LOCK_FILE"
trap 'rm -f "$LOCK_FILE"' EXIT

# --- LÓGICA DE DESPLIEGUE ---
cd "$PROJECT_DIR" || exit 1

# 1. Obtiene la última versión del repositorio remoto
git fetch

# 2. Compara la versión local (HEAD) con la remota (origin/main)
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/main)

if [ "$LOCAL" = "$REMOTE" ]; then
  # No hay cambios, no hacemos nada.
  # echo "INFO: Sin cambios nuevos. $(date)" >> $LOG_FILE
  exit 0
else
  # ¡Hay cambios! Iniciamos el despliegue.
  echo "==================================================" >> "$LOG_FILE"
  echo "🚀 Detectados nuevos cambios. Iniciando despliegue en $(date)" >> "$LOG_FILE"

  # 3. Trae los cambios (actualiza docker-compose.yml, etc.)
  echo "📥 Actualizando repositorio con git pull..." >> "$LOG_FILE"
  git pull origin main >> "$LOG_FILE" 2>&1

  # 4. Descarga las nuevas imágenes de Docker Hub
  echo "🐳 Descargando nuevas imágenes de Docker..." >> "$LOG_FILE"
  docker compose pull >> "$LOG_FILE" 2>&1

  # 5. Reinicia los servicios con las nuevas imágenes (CERO DOWNTIME)
  echo "🔄 Reiniciando los contenedores..." >> "$LOG_FILE"
  docker compose up -d --remove-orphans >> "$LOG_FILE" 2>&1

  # 6. Limpieza de imágenes antiguas no utilizadas
  docker image prune -f >> "$LOG_FILE" 2>&1

  echo "✅ Despliegue completado." >> "$LOG_FILE"
  echo "--------------------------------------------------" >> "$LOG_FILE"
fi
