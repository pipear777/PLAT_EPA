import { GlobalInput } from '@/components';
import { useGetContracts } from '../hooks';

export const ModificationsContractModal = ({ register, errors }) => {
  const {
    showAdicion,
    showProrroga,

    setShowAdicion,
    setShowProrroga,
  } = useGetContracts();

  return (
    <div>

      {/* CHECKBOXES */}
      <div className="flex gap-4 pt-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showProrroga}
            onChange={() => setShowProrroga(!showProrroga)}
          />
          <span>Prórroga</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showAdicion}
            onChange={() => setShowAdicion(!showAdicion)}
          />
          <span>Adición</span>
        </label>
      </div>

      {/* INPUTS PARA ADICIÓN */}
      {showAdicion && (
        <GlobalInput
          type="text"
          label="Valor Adición"
          data="valorAdicion"
          register={register}
          errors={errors}
          rules={{ required: 'Este campo es obligatorio' }}
        />
      )}

      {/* INPUTS PARA PRÓRROGA */}
      {showProrroga && (
        <>
          <GlobalInput
            type="date"
            label="Fecha Final"
            data="fechaFinalProrroga"
            register={register}
            errors={errors}
            rules={{ required: 'La fecha es obligatoria' }}
          />

          <GlobalInput
            type="text"
            label="Tiempo Prórroga (días/meses)"
            data="tiempoProrroga"
            register={register}
            errors={errors}
            rules={{ required: 'Este campo es obligatorio' }}
          />
        </>
      )}
    </div>
  );
};
