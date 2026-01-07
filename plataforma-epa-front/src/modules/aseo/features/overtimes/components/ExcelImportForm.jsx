import { GlobalButton } from '@/components';
import { Controller } from 'react-hook-form';

export const ExcelImportForm = ({
  onSubmit,
  control,
  errors,
  ref,
  sheetNamesProp,
  getExcelSheetNamesProp,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-2 w-full bg-white p-4 rounded-xl shadow-2xl sm:w-3/4 md:w-2/3 lg:w-1/2 sm:gap-4"
    >
      {/* Input de archivo Excel */}
      <label className="flex flex-col">
        <span className="text-epaColor1 font-semibold">Archivo Excel</span>
        <Controller
          name="file"
          control={control}
          rules={{ required: 'Debe adjuntar un archivo de Excel' }}
          render={({ field }) => (
            <input
              ref={ref}
              type="file"
              accept=".xlsx, .xls, .csv"
              className="border border-gray-500 rounded-md p-1"
              onChange={(e) => {
                const file = e.target.files?.[0];
                field.onChange(file || null);
                if (file) getExcelSheetNamesProp(file);
              }}
            />
          )}
        />
        {errors.file && (
          <p className="text-red-500 text-sm">{errors.file.message}</p>
        )}
      </label>
      {/* Select de hoja */}
      <label className="flex flex-col">
        <span className="text-epaColor1 font-semibold">Hoja de Excel</span>
        <Controller
          name="sheetName"
          control={control}
          rules={{
            required: 'Debe seleccionar la hoja de Excel que desea subir',
          }}
          render={({ field }) => (
            <select
              className="border border-gray-500 rounded-md p-1"
              {...field}
            >
              <option value="">Seleccione la hoja que desea importar</option>
              {sheetNamesProp.map((sheetName, index) => (
                <option key={index} value={sheetName}>
                  {sheetName}
                </option>
              ))}
            </select>
          )}
        />
        {errors.sheetName && (
          <p className="text-red-500 text-sm">{errors.sheetName.message}</p>
        )}
      </label>
      <GlobalButton type="submit" className="p-1.5 w-1/2 block mx-auto">
        Subir Archivo
      </GlobalButton>
    </form>
  );
};
