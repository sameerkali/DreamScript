import React from "react";

const AutLlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full bg-[#111827] flex items-center justify-center">
      {children}
    </div>
  );
};

export default AutLlayout;
