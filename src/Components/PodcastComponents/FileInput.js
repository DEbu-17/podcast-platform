import React, { useState } from "react";

function FileInput({ type, accept, id, text, fileHandleFnc }) {
  const [fileSelected, setFileSelected] = useState("");

  function handleOnChange(e) {
    setFileSelected(e.target.files[0].name);
    fileHandleFnc(e.target.files[0]);
  }

  return (
    <>
      <label
        htmlFor={id}
        className={`form-inputs ${fileSelected ? "active" : "label-input"}`}
      >
        {fileSelected ? `${fileSelected} is selected` : text}
      </label>
      <input
        type={type}
        accept={accept}
        id={id}
        style={{ display: "none" }}
        onChange={handleOnChange}
      />
    </>
  );
}

export default FileInput;
