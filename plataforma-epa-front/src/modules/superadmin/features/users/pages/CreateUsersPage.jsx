import { AlertModal, GlobalButton } from '@/components';
import { useBackNavigation } from '@/hooks';
import { ArrowLeft } from 'lucide-react';
import { UserForm } from '../components';
import { useCreateUsers } from '../hooks';

export const CreateUsersPage = () => {
  const { onClickBack } = useBackNavigation();
  const {
    alertModal,
    errors,
    roles,
    closeModal,
    handleSubmit,
    onSubmit,
    register,
  } = useCreateUsers();

  return (
    <>
      <GlobalButton
        variant="back"
        className="flex w-30 p-1.5"
        onClick={onClickBack}
      >
        <ArrowLeft className="ml-0.5 mr-2 -left-0.5" />
        Regresar
      </GlobalButton>
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-epaColor1 text-4xl font-extrabold">
          Registrar Usuario
        </h2>
        <UserForm
          roles={roles}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          errors={errors}
        />
      </div>
      <AlertModal
        openAlertModal={alertModal.open}
        closeAlertModal={closeModal}
        modalTitle={alertModal.status}
        modalDescription={alertModal.message}
      />
    </>
  );
};
