// import { useState } from 'react';
// import { contractsServices } from '../services';
// import { useForm } from 'react-hook-form';
// import { useJuridica } from '@/modules/juridica/context';

// export const useCreateContracts = () => {
 
//   const [selectedContractId, setSelectedContractId] = useState();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();

//   const [loading, setLoading] = useState(false);

  
//   const onSubmit = async (updateData) => {
//     setLoading(true);
//     try {
//       await contractsServices.updateContracts(updateData);
//       setAlertModal({
//         open: true,
//         message: '¡Contrato creado con Exito ✅!',
//         state: 'Registro Exitoso',
//       });
//       reset();
//     } catch (error) {
//       console.log(error);
//       setAlertModal({
//         open: true,
//         message: error.message,
//         state: 'Error',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const closeModal = () => {
//     setAlertModal({
//       open: false,
//       message: '',
//       state: '',
//     });
//   };

//   return {
//     // Properties
//     alertModal,
//     contractType,
//     errors,
//     handleSubmit,
//     lawyers,
//     loading,
//     register,
//     process,

//     // Methods
//     onSubmit,
//     closeModal,
//   };
// };
