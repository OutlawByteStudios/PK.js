import React from 'react';

export default function() {
  return (
    <>
      <div className="text-center mt-2 mb-2">
        No Permission!
      </div>
      <div className="btn-wrapper text-center">
        <i className="fas fa-lock fa-4x"/>
      </div>
      <div className="text-center mt-2 mb-2">
        You do not have permission to view this information.
      </div>
    </>
  );
}