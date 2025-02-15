import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return <div className="flex justify-center pt-24">{children}</div>;
};

export default AuthLayout;
