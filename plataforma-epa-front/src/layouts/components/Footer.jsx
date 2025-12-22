const currentYear = new Date().getFullYear();

export const Footer = () => {
  return (
    <footer className="bg-epaColor1 text-white flex justify-between items-center p-4">
      <div>© {currentYear} Empresas Publicas de Armenia E.S.P.</div>
      <div className="font-bold">Plataforma EPA</div>
      <div>
        Contacto de Soporte:{' '}
        <a href="mailto:redes.tic@epa.gov.co">redes.tic@epa.gov.co</a>
        <p>Tel: (606) 741 17 80 Ext. 1512 - 1513</p>
      </div>
    </footer>
  );
};
