export const GlobalCards = ({
  title,
  onClick,
  className = 'bg-white text-center text-epaColor1 font-bold text-2xl h-40 content-center rounded-2xl cursor-pointer shadow-2xl shadow-epaColor1',
}) => {
  return (
    <div className={className} onClick={onClick}>
      <h3>{title}</h3>
    </div>
  );
};
