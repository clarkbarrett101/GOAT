import React, { useRef } from "react";
const RecordButton = ({ appMode, setAppMode }) => {
  const ref = useRef(null);

  return (
    <div className="reccontainer">
      <div className="background">
        <div className="icon" />
        <div
          className="title"
          ref={ref}
          onClick={() => setAppMode("recording")}
        >
          Record
        </div>
      </div>
    </div>
  );
};

export default RecordButton;
