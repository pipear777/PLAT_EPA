import { AnimatePresence, motion } from 'framer-motion';
import { GlobalButton } from '../buttons';

export const UpdateModal = ({
  children,
  title,
  handleSubmit,
  onSubmit,
  closeModal,
  isOpen,
  formClassName = 'flex flex-col gap-2 p-4 bg-white rounded-lg shadow-lg w-[90%] max-w-[800px] sm:p-6',
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="update-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-epaColor1/50 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
          // onClick={closeModal} // cierra al hacer click fuera
        >
          <motion.form
            onClick={(e) => e.stopPropagation()} // evita que el click interior cierre el modal
            onSubmit={handleSubmit(onSubmit)}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={formClassName}
          >
            <h3 className="text-epaColor1 text-3xl text-center font-extrabold">
              {title}
            </h3>
            {children}
            <div className="flex justify-end gap-4 mt-4">
              <GlobalButton
                variant="modalFour"
                onClick={closeModal}
                className="p-1.5 w-30"
              >
                Cancelar
              </GlobalButton>
              <GlobalButton
                variant="modalTwo"
                type="submit"
                className="p-1.5 w-30"
              >
                Guardar
              </GlobalButton>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
