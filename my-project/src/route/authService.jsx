// authService.js

export const isAuthenticated = () => {
  // Check if the user is authenticated
  // You can implement this based on your specific authentication mechanism
  // For example, you can check if the user has a valid token or session
  const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
  return !!token; // Return true if token exists, false otherwise
};

export const isAdmin = () => {
  // Check if the user has the admin role
  // You can implement this based on your specific user role structure
  // For example, you can retrieve the user's role from the Redux store or from the server
  const role = localStorage.getItem("role"); // Assuming you store the role in localStorage
  return role === "admin"; // Return true if role is "admin", false otherwise
};
