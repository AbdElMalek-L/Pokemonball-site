"use client";
import { useState, useEffect, useCallback } from 'react';
import React from "react";

// localStorage key constants
const DB_KEY = 'crypto_db';
const CREDENTIALS_KEY = 'admin_credentials';

// Initial database structure
const INITIAL_DB = {
  media: [],
  exchanges: [],
  credentials: { email: 'admin@example.com', password: 'admin' }
};

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

  // Initialize database
  const initializeDB = () => {
    if (!localStorage.getItem(DB_KEY)) {
      localStorage.setItem(DB_KEY, JSON.stringify(INITIAL_DB));
    }
  };

  // Database operations
  const getDB = () => JSON.parse(localStorage.getItem(DB_KEY));
  const updateDB = (newData) => localStorage.setItem(DB_KEY, JSON.stringify(newData));

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setIsVisible(false);
    setCredentials({ email: "", password: "", newPassword: "" });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError(null);
    
    const db = getDB();
    const storedCreds = db.credentials;

    if (credentials.email === storedCreds.email && 
        credentials.password === storedCreds.password) {
      setIsAuthenticated(true);
      if (credentials.password === "admin") {
        setLoginError("Using default credentials. Please change your password.");
        setShowChangePassword(true);
      }
    } else {
      setLoginError("Invalid credentials");
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    const db = getDB();
    
    if (credentials.password !== db.credentials.password) {
      setLoginError("Current password is incorrect");
      return;
    }

    const updatedDB = {
      ...db,
      credentials: { ...db.credentials, password: credentials.newPassword }
    };
    
    updateDB(updatedDB);
    setSuccessMessage("Password changed successfully");
    setShowChangePassword(false);
    setCredentials(prev => ({ ...prev, newPassword: "" }));
  };

  const fetchMedia = useCallback(() => {
    const db = getDB();
    setMedia(db.media);
    setLoading(false);
  }, []);

  const fetchExchanges = useCallback(() => {
    const db = getDB();
    setExchanges(db.exchanges);
  }, []);

  const handleAddMedia = async (e) => {
    e.preventDefault();
    const db = getDB();
    
    const newMediaItem = {
      id: Date.now(),
      ...newMedia,
      file: newMedia.file ? await readFileAsURL(newMedia.file) : null,
    };

    updateDB({ ...db, media: [...db.media, newMediaItem] });
    setMedia(prev => [...prev, newMediaItem]);
    setShowAddMedia(false);
    setNewMedia({ title: "", description: "", file: null });
  };

  const handleAddExchange = (e) => {
    e.preventDefault();
    const db = getDB();
    
    const newExchangeItem = {
      id: Date.now(),
      ...newExchange,
    };

    updateDB({ ...db, exchanges: [...db.exchanges, newExchangeItem] });
    setExchanges(prev => [...prev, newExchangeItem]);
    setShowAddExchange(false);
    setNewExchange({ name: "", logo_url: "", status: "coming_soon" });
  };

  const readFileAsURL = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    initializeDB();
    if (isAuthenticated) {
      setIsVisible(true);
      fetchMedia();
      fetchExchanges();
    }
  }, [isAuthenticated, fetchMedia, fetchExchanges]);

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