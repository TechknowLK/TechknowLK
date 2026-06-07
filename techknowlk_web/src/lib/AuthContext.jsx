import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("customer_token"));
  const [loading, setLoading] = useState(true);

  // Sync token changes and fetch user profile
  useEffect(() => {
    const loadProfile = async () => {
      if (!token) {
        setCustomer(null);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/customer/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setCustomer(data.customer);
        } else {
          // Token expired or invalid
          localStorage.removeItem("customer_token");
          setToken(null);
          setCustomer(null);
        }
      } catch (err) {
        console.error("Failed to load customer profile:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [token]);

  // Auth fetch helper
  const authFetch = async (url, options = {}) => {
    const headers = options.headers || {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return fetch(url, {
      ...options,
      headers,
    });
  };

  // Login
  const login = async (email, password) => {
    try {
      const res = await fetch("/api/customer/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }
      localStorage.setItem("customer_token", data.token);
      setToken(data.token);
      setCustomer(data.customer);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Signup
  const signup = async (details) => {
    try {
      const res = await fetch("/api/customer/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }
      localStorage.setItem("customer_token", data.token);
      setToken(data.token);
      setCustomer(data.customer);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("customer_token");
    setToken(null);
    setCustomer(null);
  };

  // Update Profile
  const updateProfile = async (details) => {
    try {
      const res = await authFetch("/api/customer/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update profile");
      }
      setCustomer(data.customer);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Fetch Orders
  const fetchOrders = async () => {
    try {
      const res = await authFetch("/api/customer/orders");
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch orders");
      }
      return { success: true, orders: data.orders };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        customer,
        token,
        loading,
        login,
        signup,
        logout,
        updateProfile,
        fetchOrders,
        authFetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
