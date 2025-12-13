export const SuccessErrorMessage = ({ message }) => {
  return (
    <>
      {/* Mensajes de error o éxito */}
      {message && (
        <div className={`px-4 py-3 rounded-lg relative mb-4 font-semibold ${
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