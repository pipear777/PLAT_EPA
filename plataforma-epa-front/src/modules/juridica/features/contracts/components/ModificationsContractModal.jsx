export const ModificationsContractModal = ({
  register,
  errors,
  watchModifications,
}) => {
  const showAdicion = watchModifications('adicion');
  const showProrroga = watchModifications('prorroga');

  return (
    <>
      {/* Checkboxes */}
      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register('adicion')} />
          Adición
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" {...register('prorroga')} />
          Prórroga
        </label>
      </div>

      {/* ADICIÓN */}
      {showAdicion && (
        <div>
          <label className="font-semibold">Valor de la adición</label>
          <input
            type="number"
            className="border p-2 rounded w-full"
            {...register('valorAdicion', {
              required: 'Valor obligatorio',
              min: { value: 1, message: 'Debe ser mayor a 0' },
            })}
          />
          {errors.valorAdicion && (
            <p className="text-red-500">{errors.valorAdicion.message}</p>
          )}
        </div>
      )}

      {/* PRÓRROGA */}
      {showProrroga && (
        <>
          <div>
            <label className="font-semibold">Fecha final de prórroga</label>
            <input
              type="date"
              className="border p-2 rounded w-full"
              {...register('fechaFinalProrroga', {
                required: 'Fecha obligatoria',
              })}
            />
            {errors.fechaFinalProrroga && (
              <p className="text-red-500">
                {errors.fechaFinalProrroga.message}
              </p>
            )}
          </div>

          <div>
            <label className="font-semibold">Tiempo prórroga (meses)</label>
            <input
              type="text"
              className="border p-2 rounded w-full"
              {...register('tiempoProrroga', {
                required: 'Obligatorio',
                min: { value: 1, message: 'Debe ser mayor a 0' },
              })}
            />
            {errors.tiempoProrroga && (
              <p className="text-red-500">{errors.tiempoProrroga.message}</p>
            )}
          </div>
        </>
      )}
    </>
  );
};
