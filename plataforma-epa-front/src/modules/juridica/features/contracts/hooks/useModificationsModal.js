import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const useModificationsModal = ({ watch, setValue }) => {

    const {
  register: registerModifications,
  setValue: setValueModifications,
  watch: watchModifications,
  formState: { errors: errorsModifications },
} = useForm();

  const [showAdicion, setShowAdicion] = useState(false);
  const [showProrroga, setShowProrroga] = useState(false);

  // Escuchar valores del formulario
  const valueAdicion = watch("adicion");
  const valueProrroga = watch("prorroga");

  useEffect(() => {
    const adicion = Boolean(valueAdicion);
    const prorroga = Boolean(valueProrroga);

    setShowAdicion(adicion);
    setShowProrroga(prorroga);

    // Si seleccionan solo prórroga → limpiar campos de adición
    if (prorroga && !adicion) {
      setValue("valorAdicion", "");
      setValue("fechaAdicion", "");
    }

    // Si seleccionan solo adición → limpiar campos de prórroga
    if (adicion && !prorroga) {
      setValue("fechaProrroga", "");
      setValue("tiempoProrroga", "");
    }
  }, [valueAdicion, valueProrroga, setValue]);

  

  return {
    showAdicion,
    showProrroga,
    watchModifications,
    setValueModifications,
    registerModifications,
    errorsModifications,
  };
};
