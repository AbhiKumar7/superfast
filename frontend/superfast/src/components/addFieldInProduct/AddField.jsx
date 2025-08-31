import React, { useState } from "react";

function AddField({setFields,setNewLabel,newLabel,fields,setadditionalData,additionalData}) {
  


  const handleAddField = () => {
    if (newLabel.trim() === "") return;
    setFields([...fields, newLabel.trim()]);
    setNewLabel("");
  };


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddField();
    }
  };

  return (
    <div>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter label name (e.g., Material)"
          className="flex-grow border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="button"
          onClick={handleAddField}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add
        </button>
      </div>

   
      {fields.map((label, idx) => (
        <div key={idx} className="mb-4">
          <label className="block text-sm font-medium mb-1">{label}</label>
          <input
            type="text"
            value={additionalData}
            onChange={(e) => setadditionalData(e.target.value)}
            placeholder={`Enter ${label.toLowerCase()}`}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      ))}
    </div>
  );
}

export default AddField;
