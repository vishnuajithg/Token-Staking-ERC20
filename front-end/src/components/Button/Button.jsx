const Button = ({onClick, label, type}) =>{
    return (
        <button
        className="bg-gray-800 text-[#00B7A8] font-semibold py-2 px-6 border border-[#00B7A8] rounded-md hover:bg-gray-900 "
        type={type}
        onClick={onClick}
      >
        {label}
      </button>
      
    )
}
export default Button;