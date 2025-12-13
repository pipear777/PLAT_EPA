export const DashboardCards = ({ children, title = '', cardSize = 'w-96 h-64' }) => {
  return (
    <div className={`flex flex-col bg-white p-8 rounded-2xl shadow-2xl shadow-epaColor2 ${cardSize}`}>
      <h4 className="text-xl text-epaColor1 font-semibold">
        {title}
      </h4>
      <div className="flex flex-col gap-1 justify-center h-full">
        {children}
      </div>
    </div>
  );
};
