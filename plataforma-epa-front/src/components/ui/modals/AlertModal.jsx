import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './dialog';

export const AlertModal = ({
  openAlertModal,
  closeAlertModal,
  modalTitle,
  modalDescription,
}) => {
  return (
    <Dialog open={openAlertModal} onOpenChange={closeAlertModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle
            className={`text-3xl text-center font-bold mb-2 ${
              modalTitle === 'Error' ? 'text-red-500' : 'text-epaColor1'
            }`}
          >
            {modalTitle}
          </DialogTitle>
          <DialogDescription
            className={'text-xl text-center font-semibold mb-2'}
          >
            {modalDescription}
          </DialogDescription>
        </DialogHeader>
        <button
          onClick={closeAlertModal}
          className="bg-epaColor1 w-1/2 text-white rounded-xl p-1.5 border border-transparent mx-auto block hover:border-black hover:bg-blue-100 hover:text-epaColor1 hover:font-semibold"
        >
          Cerrar
        </button>
      </DialogContent>
    </Dialog>
  );
};
