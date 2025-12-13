export const LoadSpinner = ({ styles, name }) => {
  let textName = '';

  name ? (textName = name) : (textName = 'Cargando');

  return (
    <div className={`${styles} inset-0 flex flex-col gap-4 items-center justify-center`}>
      <div className="animate-spin rounded-full h-16 w-16 border-t-5 border-epaColor1"></div>
      <div className="text-epaColor1 text-xl font-semibold">{textName}</div>
    </div>
  );
};
