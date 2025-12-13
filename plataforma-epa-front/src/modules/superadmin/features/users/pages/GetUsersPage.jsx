import { AlertModal, FilterInput, GlobalButton, LoadSpinner } from '@/components';
import { useBackNavigation } from '@/hooks';
import { ArrowLeft } from 'lucide-react';
import { useGetUsers } from '../hooks/useGetUsers';
import { UsersTable, UserUpdateModal } from '../components';

export const GetUsersPage = () => {
  const { onClickBack } = useBackNavigation();
  const {
    // Properties
    alertModal,
    errors,
    estado,
    filterValue,
    loading,
    loadingSearch,
    roles,
    updateModal,
    users,

    // Methods
    closeAlertModal,
    closeModals,
    handleKeyDown,
    handleOpenUpdateModal,
    handleSearch,
    handleSubmit,
    onSubmit,
    register,
    setFilterValue,
  } = useGetUsers();

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
      <div className="flex flex-col gap-4">
        <h2 className="text-epaColor1 text-center text-4xl font-extrabold">
          Usuarios
        </h2>
        <FilterInput
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          handleKeyDown={handleKeyDown}
          handleSearch={handleSearch}
          placeholder="Buscar por identificación"
        />
        <UsersTable loading={loading} users={users} handleOpenUpdateModal={handleOpenUpdateModal} />
        <UserUpdateModal
          updateModal={updateModal}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          errors={errors}
          closeModal={closeModals}
          roles={roles}
          estado={estado}
        />
        <AlertModal
          openAlertModal={alertModal.open}
          closeAlertModal={closeAlertModal}
          modalTitle={alertModal.status}
          modalDescription={alertModal.message}
        />
      </div>
      {loadingSearch && <LoadSpinner styles="fixed bg-gray-200/90" />}
    </>
  );
};
