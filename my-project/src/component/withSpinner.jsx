import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const withSpinner = (WrappedComponent) => {
  return (props) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
      <div>
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <ClipLoader color="#ffffff" loading={isLoading} size={50} />
          </div>
        )}

        <WrappedComponent {...props} setIsLoading={setIsLoading} />
      </div>
    );
  };
};

export default withSpinner;
