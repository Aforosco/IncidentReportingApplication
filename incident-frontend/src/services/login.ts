// src/services/login.ts

interface LoginResponse {
  token: string;
  role: string;
  email: string;
  fullName?: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const res = await fetch("http://localhost:5206/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        Email: email,    
        Password: password }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Login failed");
    }

    const data: LoginResponse = await res.json();
    
    // Store token and user info
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("email", data.email);
    if (data.fullName) {
      localStorage.setItem("fullName", data.fullName);
    }
    
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("email");
  localStorage.removeItem("fullName");
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("token");
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const getRole = (): string | null => {
  return localStorage.getItem("role");
};

export const isAdmin = (): boolean => {
  return getRole() === "Admin";
};