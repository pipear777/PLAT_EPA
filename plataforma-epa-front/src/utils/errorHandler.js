export const handleAxiosError = (error, defaultMessage) => {
  // El backend responde con un mensaje explícito
  if (error.response?.data?.msg) return error.response.data.msg;

  if (error.response?.data?.message) return error.response.data.message;
  
  // El backend responde con status pero sin message
  if (error.response?.status) {
    const status = error.response.status;

    switch (status) {
      case 400:
        return 'Solicitud incorrecta ❌';
      case 401:
        return 'No autorizado. Inicia sesión de nuevo 🔑';
      case 403:
        return 'Acceso denegado 🚫';
      case 404:
        return 'Recurso no encontrado 🔍';
      case 422:
        return 'Datos inválidos, revisa el formulario ✏️';
      case 500:
        return 'Error interno del servidor ⚠️';
      default:
        return `Error ${status}: ${defaultMessage}`;
    }
  }

  // No hubo respuesta del servidor (problemas de red o CORS)
  if (error.request) {
    return 'No hay respuesta del servidor. Verifica tu conexión 🌐';
  }

  // (Caso raro) Error al configurar la petición
  return defaultMessage;
};
