import React, { useState } from 'react'

function Role({setRole,role}) {
 
    
  return (
      <div className="flex gap-10 mt-4">
      {/* User Option */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="role"
          value="USER"
          checked={role === "USER"}
          onChange={(e) => setRole(e.target.value)}
          className="accent-green-600 w-4 h-4"
        />
        <span className="text-lg">User</span>
      </label>

      {/* Admin Option */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="role"
          value="ADMIN"
          checked={role === "ADMIN"}
          onChange={(e) => setRole(e.target.value)}
          className="accent-blue-600 w-4 h-4"
        />
        <span className="text-lg">Admin</span>
      </label>
    </div>
  )
}

export default Role