import { useState, useEffect, useRef } from "react";
import "./ProfileSection.css";

export default function ProfileSection({ user }) {
  const [isEditing, setIsEditing] = useState(false);

  const fileInputRef = useRef(null);

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    dob: "",
    profileImage: "",
  });

  // Load user data
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        mobile: user.mobile || "",
        gender: user.gender || "",
        dob: user.dob || "",
        profileImage: user.profileImage || "",
      });
    }
  }, [user]);

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image upload
 const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileData((prev) => ({
        ...prev,
        profileImage: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  }
};

  // Save profile
  const handleSave = () => {
    localStorage.setItem(
      "user",
      JSON.stringify(profileData)
    );

    alert("Profile Updated Successfully");

    setIsEditing(false);
  };

  // Delete profile
  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete profile data?"
    );

    if (confirmDelete) {
      localStorage.removeItem("user");

      setProfileData({
        name: "",
        email: "",
        mobile: "",
        gender: "",
        dob: "",
        profileImage: "",
      });
    }
  };

  return (
    <div className="profile-card">
      {/* Header */}
      <div className="profile-header">
        <h2>My Profile</h2>

        {!isEditing ? (
          <button
            className="edit-btn"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        ) : (
          <button
            className="save-btn"
            onClick={handleSave}
          >
            Save Changes
          </button>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageChange}
      />

      {/* Profile Image */}
      <div
        className="profile-avatar"
        onClick={() =>
          isEditing && fileInputRef.current.click()
        }
      >
        {profileData.profileImage ? (
          <img
            src={profileData.profileImage}
            alt="Profile"
          />
        ) : (
          profileData.name?.charAt(0).toUpperCase()
        )}
      </div>

      {/* Form */}
      <div className="profile-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={profileData.name}
          onChange={handleChange}
          disabled={!isEditing}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={profileData.email}
          onChange={handleChange}
          disabled={!isEditing}
        />

        <input
          type="text"
          name="mobile"
          placeholder="Mobile"
          value={profileData.mobile}
          onChange={handleChange}
          disabled={!isEditing}
        />

        <select
          name="gender"
          value={profileData.gender}
          onChange={handleChange}
          disabled={!isEditing}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input
          type="date"
          name="dob"
          value={profileData.dob}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>

      {/* Delete Button */}
      <button
        className="delete-btn"
        onClick={handleDelete}
      >
        Delete Profile Data
      </button>
    </div>
  );
}