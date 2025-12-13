const buttonVariants = {
  primary: 'bg-epaColor1 font-semibold rounded-xl hover:border-epaColor1 hover:bg-blue-100 hover:text-epaColor1 transform transition duration-300 ease-in-out',
  secondary: 'bg-gray-600 font-semibold rounded-xl hover:border-epaColor1 hover:bg-epaColor6 hover:text-epaColor1 transform transition duration-300 ease-in-out',
  third: 'bg-gray-600 font-semibold rounded-md hover:border-epaColor1 hover:bg-blue-200 hover:text-epaColor1 transform transition duration-300 ease-in-out',
  modal: 'bg-epaColor1 rounded-xl hover:border-epaColor1 hover:bg-blue-100 hover:text-epaColor1 hover:font-semibold',
  modalTwo: 'bg-epaColor1 rounded-md hover:border-epaColor1 hover:bg-blue-100 hover:text-epaColor1 transform transition duration-300 ease-in-out',
  modalThree: 'bg-red-700 rounded-md hover:border-red-600 hover:bg-red-200 hover:text-red-600 transform transition duration-300 ease-in-out',
  modalFour: 'bg-gray-600 rounded-md hover:bg-gray-300 hover:text-epaColor1 transform transition duration-300 ease-in-out',
  back: 'bg-epaColor1 rounded-4xl hover:border-epaColor1 hover:bg-transparent hover:text-epaColor1 hover:font-semibold hover:scale-105 transform transition duration-300 ease-in-out',
  danger: 'bg-red-600 rounded-4xl hover:bg-red-800 hover:scale-105 transform transition duration-300 ease-in-out',
  
}

export const GlobalButton = ({
  children,
  variant = 'primary',
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`text-epaColor7 border-2 border-transparent cursor-pointer ${buttonVariants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};