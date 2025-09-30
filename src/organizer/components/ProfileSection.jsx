import React, { useEffect, useState } from "react";
import { FaUserEdit, FaCamera } from "react-icons/fa";
import { editUserAPI, getUserAPI } from "../../services/allAPIs";

const ProfileSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //editing userdetails
  const [formValue, setFormValue] = useState({
    profilePic: null,
    fullName: "",

    bio: "",
  });
  const [userData, setUserData] = useState({});
  const token = sessionStorage.getItem("token");
  const getUser = async () => {
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const res = await getUserAPI(reqHeader);
      console.log(res.data);
      setUserData(res.data);
      setFormValue(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  //useeffect to fetch user details
  useEffect(() => {
    if (token) {
      getUser();
    }
  }, []);
  console.log(userData);

  console.log(formValue);
  const [preview, setPreview] = useState(null);
  const handleProfpic = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setFormValue({ ...formValue, profilePic: file });
    setPreview(URL.createObjectURL(e.target.files[0]));
  };
  console.log(preview);
  const handleReset = () => {
    setPreview(null);
    setFormValue({ profilePic: null, fullName: "", bio: "" });
  };
  //edit profile
  const handleEditProfile = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    const reqHeader = { Authorization: `Bearer ${token}` };
    if (
      formValue.bio == "" ||
      formValue.profilePic == null ||
      formValue.fullName == ""
    ) {
      alert("Fill the Form");
      return;
    }
    const formData = new FormData();
    formData.append("fullName", formValue.fullName);
    formData.append("bio", formValue.bio);
    if (formValue.profilePic) {
      formData.append("profilePic", formValue.profilePic);
    }
    try {
      const res = await editUserAPI(formData, reqHeader);
      if (res.status === 200) {
        getUser(); // Update UI with new user data
        setIsModalOpen(false); // Close modal
        handleReset();
      } else {
        alert("Failed to update profile.");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const profilePicture = userData.profilePic;
  console.log("profile pic", profilePicture);

  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-7xl my-3 mx-auto">
      {/* Profile Display */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Profile Image */}
        <div className="relative group">
          {profilePicture != null ? (
            <img
              src={`https://kickoffmeta-backend.onrender.com/uploads/${profilePicture}`}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100"
            />
          ) : (
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100"
            />
          )}

          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute bottom-0 right-0 bg-gradient-to-br from-black to-blue-800 text-white p-2 rounded-full hover:bg-indigo-500 cursor-pointer transition"
          >
            <FaUserEdit size={16} />
          </button>
        </div>

        {/* Profile Info */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800">
            {userData.fullName}{" "}
          </h2>
          <p className="text-gray-600 mt-2 max-w-xl">{userData.bio}</p>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-blur flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">
                Edit Profile
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500 text-2xl"
              >
                &times;
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="flex flex-col items-center">
                {/* Profile Image Upload */}
                <label htmlFor="profpic" className="relative mb-6">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-4 border-indigo-100"
                    />
                  ) : (
                    <img
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-4 border-indigo-100"
                    />
                  )}

                  <label
                    htmlFor="profpic"
                    className="absolute bottom-0 bg-gradient-to-br cursor-pointer from-black to-blue-800 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700"
                  >
                    <FaCamera size={14} />
                  </label>
                  <input
                    onChange={handleProfpic}
                    type="file"
                    id="profpic"
                    className="hidden"
                  />
                </label>

                {/* Name Field */}
                <div className="w-full mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    value={formValue.fullName}
                    onChange={(e) =>
                      setFormValue({ ...formValue, fullName: e.target.value })
                    }
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/* Description Field */}
                <div className="w-full mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    value={formValue.bio}
                    onChange={(e) =>
                      setFormValue({ ...formValue, bio: e.target.value })
                    }
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/* Save Button */}
                <div className="flex gap-3">
                  <button
                    onClick={handleReset}
                    className="w-full bg-gradient-to-br cursor-pointer from-black to-blue-800 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleEditProfile}
                    className="w-full bg-gradient-to-br cursor-pointer from-black to-blue-800 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;
