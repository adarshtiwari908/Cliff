import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login"); 
          return;
        }

        const res = await API.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = res.data?.data?.user;
        setProfile(user);
      } catch (err) {
        console.error("Error fetching profile:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login"); 
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-orange-300 flex items-center justify-center">
        <div className="bg-black rounded-2xl p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-orange-300 p-6">
      <div className="max-w-7xl mx-auto">
        {profile ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Profile Card */}
            <div className="lg:col-span-2">
              <div className="bg-black rounded-2xl p-8 border border-white/20">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold border-2 border-white/30">
                      {profile.name
                        ? profile.name.charAt(0).toUpperCase()
                        : profile.email.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <h1 className="text-3xl font-bold text-white mb-2">
                        {profile.name || "User"}
                      </h1>
                      <p className="text-white/80 text-lg">{profile.email}</p>
                      <div className="flex items-center mt-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        <span className="text-green-300 text-sm font-medium">Active</span>
                      </div>
                    </div>
                  </div>

                  <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 text-white px-4 py-2 rounded-lg transition duration-300">
                    Edit Profile
                  </button>
                </div>

                {/* Profile Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="space-y-4">
                    <div>
                      <label className="text-white/60 text-sm font-medium block mb-1">
                        User ID
                      </label>
                      <div className="bg-white/10 rounded-lg p-3">
                        <span className="text-white font-mono">{profile.id}</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-white/60 text-sm font-medium block mb-1">
                        Full Name
                      </label>
                      <div className="bg-white/10 rounded-lg p-3">
                        <span className="text-white">{profile.name || "Not provided"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-white/60 text-sm font-medium block mb-1">
                        Email Address
                      </label>
                      <div className="bg-white/10 rounded-lg p-3">
                        <span className="text-white">{profile.email}</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-white/60 text-sm font-medium block mb-1">
                        Member Since
                      </label>
                      <div className="bg-white/10 rounded-lg p-3">
                        <span className="text-white">
                          {profile.createdAt
                            ? new Date(profile.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })
                            : "Recently joined"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Account Overview */}
              <div className="bg-black rounded-2xl p-6 border border-white/20">
                <h3 className="text-white font-semibold text-lg mb-4">Account Overview</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Plan</span>
                    <span className="text-white font-medium bg-gradient-to-r from-purple-500 to-blue-500 px-3 py-1 rounded-full text-sm">
                      Free
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Status</span>
                    <span className="text-green-300 font-medium">Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Last Login</span>
                    <span className="text-white font-medium text-sm">Today</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-black rounded-2xl p-6 border border-white/20">
                <h3 className="text-white font-semibold text-lg mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 text-white p-3 rounded-lg transition duration-300 text-left">
                    ⚙️ Account Settings
                  </button>
                  <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 text-white p-3 rounded-lg transition duration-300 text-left">
                    🔒 Security
                  </button>
                  <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 text-white p-3 rounded-lg transition duration-300 text-left">
                    ❓ Help & Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-96">
            <div className="bg-black rounded-2xl p-8 text-center border border-white/20">
              <p className="text-red-400 text-lg font-medium">Failed to load profile</p>
              <p className="text-white/60 mt-2">Please try refreshing the page</p>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium transition duration-300"
          >
            Logout
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-white/80 text-sm">
          © 2025 Cliff, Inc. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default Profile;
