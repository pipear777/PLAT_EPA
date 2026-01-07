export const SuccessErrorMessage = ({ message }) => {
  return (
    <>
      {/* Mensajes de error o éxito */}
      {message && (
        <div className={`p-1 text-center font-semibold relative rounded-md sm:px-4 sm:py-3 sm:rounded-lg ${
          message.type === 'success'
          ? 'bg-epaColor1/30 border-2 border-epaColor1 text-epaColor1'
          : 'bg-red-100/60 border-2 border-red-400 text-red-700'
        }`}>
          {message.text}
        </div>
      )}
    </>
  )
}