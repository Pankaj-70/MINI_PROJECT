import React from "react";

const Settings = () => {
  return (
    <div className="text-center p-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <p className="mb-8">
        Manage your account, notifications, and privacy settings.
      </p>

      {/* Profile Settings Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
        <p className="text-lg mb-2">
          Change your name, email, and profile picture.
        </p>
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
          Edit Profile
        </button>
      </div>

      {/* Notification Settings Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
        <p className="text-lg mb-2">
          Customize how you receive notifications from us.
        </p>
        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200">
          Manage Notifications
        </button>
      </div>

      {/* Privacy Settings Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Privacy Settings</h2>
        <p className="text-lg mb-2">
          Control your data privacy and who can see your information.
        </p>
        <button className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-200">
          Edit Privacy
        </button>
      </div>

      {/* Account Settings Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
        <p className="text-lg mb-2">
          Manage your account settings, change password, and more.
        </p>
        <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200">
          Change Password
        </button>
      </div>
    </div>
  );
};

export default Settings;
