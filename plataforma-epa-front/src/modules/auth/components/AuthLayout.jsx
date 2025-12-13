import logo from '@/assets/logoepa.png'

export const AuthLayout = ({ title, children }) => {
  return (
    <div className="bg-[url(/assets/epaRecoleccion.jpeg)] bg-epaColor1/60 bg-blend-soft-light bg-cover bg-center flex justify-center items-center h-screen">
      <div className="bg-white/80 rounded-xl shadow-2xl w-96 p-6">
        <div>
          <img src={logo} alt="logo" />
        </div>
        <h2 className="text-epaColor1 text-2xl font-bold text-center p-6">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
};
