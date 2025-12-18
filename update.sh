#!/bin/bash
set -e

PROJECT_DIR="/home/maria/PLAT_EPA"
LOG="$PROJECT_DIR/update.log"

cd "$PROJECT_DIR" || exit 1

echo "==============================" >> "$LOG"
echo "Inicio: $(date)" >> "$LOG"

# 🔐 Verificar Docker
if ! docker info >/dev/null 2>&1; then
  echo "Docker no está activo" >> "$LOG"
  exit 1
fi

# 🔍 Verificar puertos libres
for PORT in 5000 5500; do
  if ss -lnt | grep -q ":$PORT "; then
    echo "Puerto $PORT ocupado. Abortando." >> "$LOG"
    exit 1
  fi
done

# 📥 Git
git pull >> "$LOG" 2>&1

# 📦 Pull de imágenes
docker compose pull >> "$LOG" 2>&1

# 🔴 Bajar servicios correctamente
docker compose down >> "$LOG" 2>&1

# 🧹 Limpieza defensiva
docker container prune -f >> "$LOG" 2>&1
docker network prune -f >> "$LOG" 2>&1

# 🟢 Levantar servicios
docker compose up -d >> "$LOG" 2>&1

# 📊 Estado final
docker compose ps >> "$LOG" 2>&1

echo "Completado: $(date)" >> "$LOG"
