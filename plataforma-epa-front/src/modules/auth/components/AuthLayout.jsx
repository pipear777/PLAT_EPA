import logo from '@/assets/logoepa.png'

export const AuthLayout = ({ title, children }) => {
  return (
    <div className="bg-[url(/assets/epaRecoleccion.jpeg)] bg-epaColor1/60 bg-blend-soft-light bg-cover bg-center flex justify-center items-center min-h-screen">
      <div className="flex flex-col gap-2 bg-white/80 w-62 p-4 rounded-xl shadow-2xl sm:gap-4 sm:w-96 sm:p-6">
        <div>
          <img src={logo} alt="logo" />
        </div>
        <h2 className="text-epaColor1 text-xl font-bold text-center sm:text-3xl sm:py-2">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
};
