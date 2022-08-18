import React, { useEffect } from 'react';

import { useDhlDeliveryDataContext } from '../../hooks';

function ErrorMesage() {
  const { errorMessage, setDhlErrorMessage } = useDhlDeliveryDataContext();

  // auto-disappear message after some time.
  useEffect(() => {
    const timer = setTimeout(() => {
      setDhlErrorMessage(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, [errorMessage, setDhlErrorMessage]);

  if (!errorMessage) {
    return null;
  }

  return (
    <div className="mx-4 mt-6">
      <div className="relative px-6 py-2 my-4 text-white border-0 rounded bg-alert">
        <span className="inline-block mr-8 align-middle">{errorMessage}</span>
        <button
          type="button"
          className="absolute top-0 right-0 mt-2 mr-6 text-2xl font-semibold leading-none outline-none bg-none focus:outline-none"
          onClick={() => setDhlErrorMessage(false)}
        >
          <span>×</span>
        </button>
      </div>
    </div>
  );
}

export default ErrorMesage;
