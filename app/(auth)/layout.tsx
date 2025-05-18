import React from "react";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="flex justify-center items-center h-screen">
      {children}
    </main>
  );
};

export default AuthLayout;
