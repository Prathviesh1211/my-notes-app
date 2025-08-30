import React from 'react';

interface AuthLayoutProps {
  // We're extending the props with React.PropsWithChildren to explicitly
  // tell TypeScript that this component can accept children.
}

const AuthLayout: React.FC<React.PropsWithChildren<AuthLayoutProps>> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex flex-1 items-center justify-center p-8 md:p-12 lg:p-16 xl:p-24">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
      <div 
        className="hidden md:flex flex-1 items-center justify-center bg-cover bg-center h-screen"
        style={{ backgroundImage: "url('/png.jpeg')" }}
      >
      </div>
    </div>
  );
};

export default AuthLayout;
