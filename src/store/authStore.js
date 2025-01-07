import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: localStorage.getItem("access_token") || null,
    refreshToken: localStorage.getItem("refresh_token") || null,
    current_user: localStorage.getItem("current_user") || null,
  }),
  getters: {
    // Check if the user is authenticated based on the presence of the access token
    isAuthenticated: (state) => !!state.accessToken,
  },
  actions: {
    // Set both access and refresh tokens
    setTokens(access, refresh, current_user) {
      this.accessToken = access;
      this.refreshToken = refresh;
      this.current_user = current_user;
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("current_user", current_user);
    },

    // Logout by clearing tokens from state and localStorage
    logout() {
      this.accessToken = null;
      this.refreshToken = null;
      this.current_user = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("current_user");
    },

    // Refresh the access token with the refresh token
    async refreshAccessToken() {
      if (this.refreshToken) {
        try {
          // Make a request to the backend to refresh the token
          const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/token/refresh/`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ refresh: this.refreshToken }),
            }
          );

          if (response.ok) {
            const { access } = await response.json();
            this.setTokens(access, this.refreshToken, this.current_user); // Set the new access token
          } else {
            this.logout(); // Logout if refreshing the token fails
          }
        } catch (error) {
          console.error("Error refreshing token:", error);
          this.logout();
        }
      } else {
        this.logout(); // Logout if there's no refresh token
      }
    },
  },
});
