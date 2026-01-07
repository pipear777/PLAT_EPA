export const getCurrentModule = (pathname) => {
  if (pathname.startsWith('/superadmin')) return 'SUPERADMIN';
  if (pathname.startsWith('/aseo')) return 'ASEO';
  if (pathname.startsWith('/juridica')) return 'JURIDICA';
  return null;
};
