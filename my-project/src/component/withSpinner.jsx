import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const withSpinner = (WrappedComponent) => {
  const SpinnerComponent = (props) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
      <div>
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-[#000] bg-opacity-50">
            <ClipLoader color="#000" loading={isLoading} size={50} />
          </div>
        )}

        <WrappedComponent {...props} setIsLoading={setIsLoading} />
      </div>
    );
  };

  return SpinnerComponent;
};

export default withSpinner;
