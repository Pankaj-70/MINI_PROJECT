import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin mx-auto"></div>
        <h1 className="mt-4 text-2xl font-semibold text-blue-600">
          Please wait...
        </h1>
        <p className="mt-2 text-gray-500">Loading your dashboard</p>
      </div>
    </div>
  );
};

export default Loading;
