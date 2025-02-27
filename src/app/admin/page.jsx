"use client";
import { useState, useEffect, useCallback } from 'react';
import React from "react";

import { useUpload } from "../../utilities/runtime-helpers";

function MainComponent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [media, setMedia] = useState([]);
  const [exchanges, setExchanges] = useState([]);
  const [activeTab, setActiveTab] = useState("exchanges");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showAddMedia, setShowAddMedia] = useState(false);
  const [showAddExchange, setShowAddExchange] = useState(false);
  const [editingExchange, setEditingExchange] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    newPassword: "",
  });
  const [newMedia, setNewMedia] = useState({
    title: "",
    description: "",
    file: null,
  });
  const [newExchange, setNewExchange] = useState({
    name: "",
    logo_url: "",
    status: "coming_soon",
  });
  const [upload] = useUpload();

  const handleLogout = useCallback(async () => {
    try {
      setIsAuthenticated(false);
      setIsVisible(false);
      setCredentials({
        email: "",
        password: "",
        newPassword: "",
      });
      setMedia([]);
      setExchanges([]);
      setActiveTab("exchanges");
    } catch (err) {
      console.error("Logout error:", err);
      setError("Failed to logout");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(null);
    try {
      if (!credentials.email || !credentials.password) {
        setLoginError("Please enter both username and password");
        return;
      }

      const response = await fetch("../api/admin-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "login",
          email: credentials.email.trim(),
          password: credentials.password.trim(),
        }),
      });

      const data = await response.json();
      if (data.success) {
        setIsAuthenticated(true);
        if (credentials.password.trim() === "admin") {
          setLoginError(
            "Using default credentials. Please change your password."
          );
          setShowChangePassword(true);
        }
      } else {
        setLoginError(data.error || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      setLoginError("Login failed. Please try again.");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoginError(null);
    try {
      const response = await fetch("../api/admin-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "change-credentials",
          email: credentials.email,
          password: credentials.password,
          newPassword: credentials.newPassword,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSuccessMessage("Password changed successfully");
        setShowChangePassword(false);
        setCredentials((prev) => ({
          ...prev,
          newPassword: "",
        }));
        fetchMedia();
        fetchExchanges();
      } else {
        setLoginError(data.error || "Failed to change password");
      }
    } catch (err) {
      console.error(err);
      setLoginError("Password change failed");
    }
  };

  const fetchExchanges = useCallback(async () => {
    try {
      const response = await fetch("/api/get-exchanges", { method: "POST" });
      if (!response.ok) {
        throw new Error(`Error fetching exchanges: ${response.status}`);
      }
      const data = await response.json();
      setExchanges(data.exchanges);
    } catch (err) {
      console.error(err);
      setError("Failed to load exchanges");
    }
  }, []);

  const fetchMedia = useCallback(async () => {
    try {
      const response = await fetch("/api/get-admin-media", { method: "POST" });
      if (!response.ok) {
        throw new Error(`Error fetching media: ${response.status}`);
      }
      const data = await response.json();
      setMedia(data.media);
    } catch (err) {
      console.error(err);
      setError("Failed to load media");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && !showChangePassword) {
      setIsVisible(true);
      fetchMedia();
      fetchExchanges();
    }
  }, [isAuthenticated, showChangePassword, fetchMedia, fetchExchanges]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white font-inter flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center text-[#FF0000] mb-6">
            Admin Login
          </h1>

          {loginError &&
            loginError !==
              "Using default credentials. Please change your password." && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <p className="font-bold">Login Error</p>
                <p>{loginError}</p>
              </div>
            )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF0000]"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF0000]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-2 rounded-lg bg-[#FF0000] text-white hover:bg-[#FF3333] transition-colors duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-inter">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-[#FF0000]">Admin Dashboard</h1>
          <div className="flex gap-4">
            {!showChangePassword && (
              <>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition-colors duration-300"
                >
                  Logout
                </button>
                <button
                  onClick={() => setShowAddMedia(true)}
                  className="px-6 py-2 rounded-lg bg-[#FF0000] text-white hover:bg-[#FF3333] transition-colors duration-300 flex items-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add Media
                </button>
                <button
                  onClick={() => {
                    setEditingExchange(null);
                    setShowAddExchange(true);
                  }}
                  className="px-6 py-2 rounded-lg bg-[#FF0000] text-white hover:bg-[#FF3333] transition-colors duration-300 flex items-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add Exchange
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


export default MainComponent;