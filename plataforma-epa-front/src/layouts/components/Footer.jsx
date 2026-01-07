const currentYear = new Date().getFullYear();

export const Footer = () => {
  return (
    <footer className="bg-epaColor1 flex flex-col items-center gap-0.5 px-4 py-2 text-white text-xs sm:flex-row sm:text-base">
      <div className="sm:flex-1 sm:text-left">© {currentYear} Empresas Publicas de Armenia E.S.P.</div>
      <div className="text-sm font-bold sm:flex-1 sm:text-2xl sm:text-center">Plataforma EPA</div>
      <div className="sm:flex-1 sm:text-right">
        <p>
          Contacto de Soporte:{' '}
          <a href="mailto:redes.tic@epa.gov.co">redes.tic@epa.gov.co</a>
        </p>
        <p>Tel: (606) 741 17 80 Ext. 1512 - 1513</p>
      </div>
    </footer>
  );
};
