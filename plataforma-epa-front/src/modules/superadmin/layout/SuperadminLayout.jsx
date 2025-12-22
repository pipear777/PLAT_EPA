import { AppLayout } from "@/layouts"

export const SuperadminLayout = () => {
  return (
    <AppLayout title={'Modulo Administrador'} />
  )
}


// import { useState } from 'react';
// import { Outlet } from 'react-router-dom';
// import { Navbar, Sidebar } from '../components';

// const currentYear = new Date().getFullYear();

// export const SuperadminLayout = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   return (
//     <div className="flex h-screen">
//       <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
//       <div className="flex flex-col w-full">
//         {/* <header className="bg-epaColor1 flex p-6">
//           <div className="w-2/10"></div>
//           <h2 className="w-full text-white text-center font-bold text-3xl">
//             Plataforma EPA - Modulo Administrador
//           </h2>
//           <div className="w-2/10 flex text-white text-sm items-center justify-end gap-2">
//             <UserStar />
//             <div>
//               <p className="text-center">{auth.user.name}</p>
//               <Link to={superadminRoutesList.superadminDashboard}>
//                 <p className="bg-white px-2 text-epaColor1 font-semibold underline rounded-sm">
//                   {auth.user.rol}
//                 </p>
//               </Link>
//             </div>
//           </div>
//         </header> */}

//         <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

//         <main className="relative bg-gray-200 flex-1 overflow-auto p-4">
//           <Outlet />
//         </main>

//         <footer className="bg-epaColor1 text-white flex justify-between items-center p-4">
//           <div>© {currentYear} Empresas Publicas de Armenia E.S.P.</div>
//           <div>Plataforma de Horas Extra Aseo - EPA</div>
//           <div>
//             Contacto de Soporte:{' '}
//             <a href="mailto:redes.tic@epa.gov.co">redes.tic&#64;epa.gov.co</a>
//             <p>Tel: (606) 741 17 80 Ext. 1512 - 1513</p>
//           </div>
//         </footer>
//       </div>
//     </div>
//   );
// };