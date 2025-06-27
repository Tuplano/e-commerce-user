"use client";

import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Eye, EyeOff, Lock } from "lucide-react";

interface ProfileCardProps {
  username: string;
  email: string;
  image?: string | null;
  role?: string;
  hasPassword?: boolean;
}

interface userData {
  username: string;
  CurrentPassword: String;
  newPassword: string;
  confirmPassword: string;
}

interface userData {}
export default function ProfileCard({
  username: initialUsername,
  email,
  role,
  hasPassword,
}: ProfileCardProps) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<userData>({
    username: initialUsername,
    CurrentPassword:"",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Password states
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

const handleUpdate = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  // Password validation
  if (isChangingPassword) {
    if (hasPassword && !formData.CurrentPassword) {
      toast.error("Current password is required");
      setLoading(false);
      return;
    }

    if (!formData.newPassword) {
      toast.error("New password is required");
      setLoading(false);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      setLoading(false);
      return;
    }
  }

  try {
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.username,
        currentPassword: formData.CurrentPassword || null,
        newPassword: isChangingPassword ? formData.newPassword : null,
      }),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Update failed");

    toast.success("Profile updated successfully!");
    setIsChangingPassword(false);
    setFormData({
      username: formData.username,
      CurrentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  } catch (err: any) {
    toast.error(err.message || "Something went wrong");
  } finally {
    setLoading(false);
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
          <h2 className="text-xl font-semibold">{formData.username}</h2>
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
            name="username"
            value={formData.username}
            onChange={handleInputChange}
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
                {hasPassword ? "Change Password" : "Set Password"}
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
                    name="CurrentPassword"
                      type={showPasswords.current ? "text" : "password"}
                      onChange={handleInputChange}
                      className="block w-full border border-gray-300 rounded-md p-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("current")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords.current ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
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
                   name="newPassword"
                    type={showPasswords.new ? "text" : "password"}
                    onChange={handleInputChange}
                    className="block w-full border border-gray-300 rounded-md p-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("new")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.new ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
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
                  name="confirmPassword"
                    type={showPasswords.confirm ? "text" : "password"}
                    onChange={handleInputChange}
                    className="block w-full border border-gray-300 rounded-md p-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirm")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.confirm ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Cancel Password Change */}
              <button
                type="button"
                onClick={() => {
                  setIsChangingPassword(false);
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
          <p>
            <strong>Email:</strong> {email}{" "}
            <span className="text-xs">(cannot be changed)</span>
          </p>
          <p>
            <strong>Role:</strong> {role}
          </p>
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
