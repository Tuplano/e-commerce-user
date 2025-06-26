"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff, Lock } from "lucide-react";

interface ProfileCardProps {
  username: string;
  email: string;
  image?: string | null;
  role?: string;
  bio?: string;
  hasPassword?: boolean;
}

export default function ProfileCard({
  username: initialUsername,
  email,
  role,
  hasPassword = true, 
}: ProfileCardProps) {
  const [username, setUsername] = useState(initialUsername);
  const [loading, setLoading] = useState(false);
  
  // Password states
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate password fields if changing password
    if (isChangingPassword) {
      if (hasPassword && !currentPassword) {
        alert("Current password is required");
        setLoading(false);
        return;
      }
      
      if (!newPassword) {
        alert("New password is required");
        setLoading(false);
        return;
      }
      
      if (newPassword !== confirmPassword) {
        alert("Passwords do not match");
        setLoading(false);
        return;
      }
      
      if (newPassword.length < 6) {
        alert("Password must be at least 6 characters");
        setLoading(false);
        return;
      }
    }

    const updateData: any = { username };
    
    // Add password data if changing password
    if (isChangingPassword) {
      updateData.currentPassword = currentPassword;
      updateData.newPassword = newPassword;
    }

    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    setLoading(false);
    if (!res.ok) {
      alert("Failed to update profile");
    } else {
      alert("Profile updated successfully!");
      
      // Reset password fields after successful update
      if (isChangingPassword) {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setIsChangingPassword(false);
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">
      {/* Profile Header */}
      <div className="flex items-center gap-4">
        {/* Placeholder for profile image */}
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-gray-500 text-sm">Image</span>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold">{username}</h2>
          <p className="text-gray-500">{email}</p>
          <p className="text-sm text-gray-400">Role: {role}</p>
        </div>
      </div>

      {/* Editable Form */}
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        {/* Password Section */}
        <div className="border-t pt-4 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Password
            </h3>
            {!isChangingPassword && (
              <button
                type="button"
                onClick={() => setIsChangingPassword(true)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                {hasPassword ? 'Change Password' : 'Set Password'}
              </button>
            )}
          </div>

          {isChangingPassword && (
            <div className="space-y-4">
              {/* Current Password (only show if user has existing password) */}
              {hasPassword && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <div className="relative mt-1">
                    <input
                      type={showPasswords.current ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="block w-full border border-gray-300 rounded-md p-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('current')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="relative mt-1">
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="block w-full border border-gray-300 rounded-md p-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('new')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <div className="relative mt-1">
                  <input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full border border-gray-300 rounded-md p-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Cancel Password Change */}
              <button
                type="button"
                onClick={() => {
                  setIsChangingPassword(false);
                  setCurrentPassword("");
                  setNewPassword("");
                  setConfirmPassword("");
                }}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel password change
              </button>
            </div>
          )}
        </div>

        {/* Read-only Info */}
        <div className="flex flex-col gap-1 text-sm text-gray-500 bg-gray-50 p-3 rounded-md">
          <p><strong>Email:</strong> {email} <span className="text-xs">(cannot be changed)</span></p>
          <p><strong>Role:</strong> {role}</p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}