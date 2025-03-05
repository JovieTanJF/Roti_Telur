import React from 'react';

const Card = ({
  children,
  className = '',
  hover = false,
  padding = 'p-4',
  ...props
}) => {
  return (
    <div
      className={`
        bg-white rounded-md shadow-sm 
        ${hover ? 'hover:shadow-md transition-shadow duration-300' : ''}
        ${padding}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`mb-2 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className = '', ...props }) => {
  return (
    <h3
      className={`text-base font-semibold text-gray-900 ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
};

export const CardDescription = ({ children, className = '', ...props }) => {
  return (
    <p
      className={`text-xs text-gray-500 ${className}`}
      {...props}
    >
      {children}
    </p>
  );
};

export const CardContent = ({ children, className = '', ...props }) => {
  return (
    <div
      className={className}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`mt-3 pt-2 border-t border-gray-100 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;