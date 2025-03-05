import React from 'react';

const variants = {
  primary: 'bg-purple-500 hover:bg-purple-600 text-white',
  secondary: 'bg-purple-500/10 hover:bg-purple-500/20 text-purple-500',
  outline: 'bg-transparent border border-purple-500 text-purple-500 hover:bg-purple-500/10',
  ghost: 'bg-transparent text-purple-500 hover:bg-purple-500/10',
};

const sizes = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-base',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`
        ${variants[variant]} 
        ${sizes[size]} 
        ${fullWidth ? 'w-full' : ''} 
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        rounded-md flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;