#!/bin/bash
set -e

PROJECT_DIR="/home/maria/PLAT_EPA"
LOG="$PROJECT_DIR/update.log"

# Colores para consola
RED="\033[0;31m"
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
NC="\033[0m" # Sin color

cd "$PROJECT_DIR" || exit 1

echo -e "${YELLOW}==============================${NC}" | tee -a "$LOG"
echo -e "${YELLOW}Inicio: $(date)${NC}" | tee -a "$LOG"

# 🔐 Verificar Docker
if ! docker info >/dev/null 2>&1; then
  echo -e "${RED}Docker no está activo${NC}" | tee -a "$LOG"
  exit 1
fi

# 🔍 Advertencia de puertos ocupados (no aborta)
for PORT in 5000 5500; do
  if ss -lnt | grep -q ":$PORT "; then
    echo -e "${YELLOW}⚠ Advertencia: Puerto $PORT ocupado.${NC}" | tee -a "$LOG"
  fi
done

# 📥 Git pull
echo -e "${YELLOW}Actualizando repositorio Git...${NC}" | tee -a "$LOG"
git pull | tee -a "$LOG"

# 📦 Pull de imágenes Docker
echo -e "${YELLOW}Actualizando imágenes Docker...${NC}" | tee -a "$LOG"
docker compose pull | tee -a "$LOG"

# 🔴 Bajar servicios
echo -e "${YELLOW}Deteniendo servicios existentes...${NC}" | tee -a "$LOG"
docker compose down | tee -a "$LOG"

# 🧹 Limpieza defensiva
echo -e "${YELLOW}Limpiando contenedores y redes antiguas...${NC}" | tee -a "$LOG"
docker container prune -f | tee -a "$LOG"
docker network prune -f | tee -a "$LOG"

# 🟢 Levantar servicios
echo -e "${GREEN}Levantando servicios...${NC}" | tee -a "$LOG"
docker compose up -d | tee -a "$LOG"

# 📊 Estado final
echo -e "${GREEN}Estado actual de los servicios:${NC}" | tee -a "$LOG"
docker compose ps | tee -a "$LOG"

echo -e "${YELLOW}Completado: $(date)${NC}" | tee -a "$LOG"

