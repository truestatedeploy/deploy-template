// Reusable Button Component
import arrow from '../../assets/home/arrow.svg'; // Importing arrow icon

const Button = ({ text, onClick, className, showArrow = true }) => {
  return (
    // Accessible button element with keyboard + focus support
    <button
      type="button"
      aria-label={typeof text === "string" ? text : undefined}
      className={`flex items-center justify-center px-8 md:px-10 py-3.5 md:py-4 w-fit bg-magenta text-white cursor-pointer
                  font-semibold text-xs md:text-sm uppercase whitespace-nowrap gap-2 rounded-lg tracking-wider
                  shadow-md hover:shadow-lg transition-all duration-300 ease-in-out
                  hover:bg-magentaDark hover:-translate-y-0.5 active:translate-y-0 active:shadow-md
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta focus-visible:ring-offset-2
                  ${className} font-body`} // Combining dynamic and static class names
      onClick={onClick} // Click event handler
    >
      <span>
        {text} {/* Displaying button text */}
      </span>
    </button>
  );
};

export default Button;
