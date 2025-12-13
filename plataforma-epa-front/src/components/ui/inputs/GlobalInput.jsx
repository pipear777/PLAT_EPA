export const GlobalInput = ({
  as: Component = 'input',
  type,
  label,
  data,
  defaultValue,
  classNameLabel = 'flex flex-col',
  classNameSpan = 'text-epaColor1 font-semibold',
  classNameComponent = 'border border-gray-500 rounded-md p-1',
  register,
  errors,
  rules,
  ...props
}) => {
  return (
    <label className={classNameLabel}>
      <span className={classNameSpan}>{label}</span>
      <Component
        type={type}
        defaultValue={defaultValue}
        className={classNameComponent}
        {...register(data, rules)}
        {...props}
      />
      {errors?.[data] && (
        <p className="text-red-500 text-sm">{errors[data].message}</p>
      )}
    </label>
  );
};