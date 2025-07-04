"use client";

import { useState, ChangeEvent } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  User,
  Mail,
  MapPin,
  Phone,
  Shield,
  Edit3,
  Check,
  X,
} from "lucide-react";
import { toast } from "sonner";
interface ProfileCardProps {
  username: string;
  email: string;
  address: string;
  contact: string;
  image?: string | null;
  role?: string;
  hasPassword?: boolean;
}

interface UserData {
  username: string;
  address: string;
  contact: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ProfileCard({
  username: initialUsername,
  email,
  contact: initialContact,
  address: initialAddress,
  role = "User",
  hasPassword = true,
}: ProfileCardProps) {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState<UserData>({
    username: initialUsername,
    contact: initialContact,
    address: initialAddress,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

  const handleUpdate = async () => {
    setLoading(true);

    // Password validation
    if (isChangingPassword) {
      if (hasPassword && !formData.currentPassword) {
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
          address: formData.address,
          contact: formData.contact,
          currentPassword: formData.currentPassword || null,
          newPassword: isChangingPassword ? formData.newPassword : null,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Update failed");

      toast.success("Profile updated successfully!");
      setIsChangingPassword(false);
      setIsEditing(false);
      setFormData({
        ...formData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setFormData({
      username: initialUsername,
      address: initialAddress,
      contact: initialContact,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setIsEditing(false);
    setIsChangingPassword(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-300 via-white to-neutral-100 p-10 text-black">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold  mb-2">
            Profile Settings
          </h1>
          <p>
            Manage your personal information and account settings
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Profile Header Section */}
          <div className="bg-gradient-to-r from-zinc-900 to-zinc-700 p-8 text-white">
            <div className="flex items-center gap-6">
              {/* Profile Avatar */}
              <div className="relative">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/30">
                  <User className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">{formData.username}</h2>
                <p className="text-blue-100 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {email}
                </p>
                <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full w-fit">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm font-medium">{role}</span>
                </div>
              </div>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2"
              >
                {isEditing ? (
                  <>
                    <X className="w-4 h-4" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit3 className="w-4 h-4" />
                    Edit Profile
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8 space-y-8">
            {/* Personal Information */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Personal Information
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      disabled
                      className="w-full border border-gray-300 rounded-lg p-3 pl-10 bg-gray-50 text-gray-500"
                    />
                    <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                      Cannot be changed
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <Phone className="w-5 h-5 text-green-600" />
                Contact Information
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500"
                      placeholder="+1 (555) 123-4567"
                    />
                    <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <div className="relative">
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500 resize-none"
                      placeholder="Enter your full address"
                    />
                    <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                  </div>
                </div>
              </div>
            </div>

            {/* Password Section */}
            <div className="border-t pt-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-red-600" />
                  Security Settings
                </h3>
                {!isChangingPassword && (
                  <button
                    type="button"
                    onClick={() => setIsChangingPassword(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    {hasPassword ? "Change Password" : "Set Password"}
                  </button>
                )}
              </div>

              {isChangingPassword && (
                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  {/* Current Password (only show if user has existing password) */}
                  {hasPassword && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          name="currentPassword"
                          type={showPasswords.current ? "text" : "password"}
                          value={formData.currentPassword}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg p-3 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility("current")}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPasswords.current ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* New Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        name="newPassword"
                        type={showPasswords.new ? "text" : "password"}
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg p-3 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("new")}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPasswords.new ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        name="confirmPassword"
                        type={showPasswords.confirm ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg p-3 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("confirm")}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPasswords.confirm ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Cancel Password Change */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsChangingPassword(false);
                      setFormData({
                        ...formData,
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                      });
                    }}
                    className="text-sm text-gray-600 hover:text-gray-800 underline"
                  >
                    Cancel password change
                  </button>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {(isEditing || isChangingPassword) && (
              <div className="flex gap-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all duration-200 flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
