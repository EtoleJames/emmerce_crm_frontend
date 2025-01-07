// api.js
export const api = async (url, options = {}) => {
  const token = localStorage.getItem("access_token");
  options.headers = options.headers || {};

  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, options);

  // If the response is 401 (Unauthorized), try to refresh the token
  if (response.status === 401) {
    const refreshedToken = await refreshToken(); // Refresh the token
    options.headers.Authorization = `Bearer ${refreshedToken}`;
    return fetch(url, options); // Retry the original request with the new token
  }

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

// Function to refresh the token using the refresh token
export const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/token/refresh/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const { access } = await response.json();
    // Store the new access token
    localStorage.setItem("access_token", access);
    return access;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw new Error("Token refresh failed");
  }
};
