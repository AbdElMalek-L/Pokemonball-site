async function handler({ action, email, password, newPassword }) {
  console.log("Auth request received:", { action, email });

  if (!action) throw new Error("Action is required");
  if (!email) throw new Error("Email is required");
  if (!password) throw new Error("Password is required");

  try {
    if (action === "login") {
      // Fetch user data from JSON Server
      const response = await fetch(`http://localhost:3000/users?email=${email}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const users = await response.json();

      // Check if the user exists and credentials match
      const user = users.find((u) => u.email === email && u.password === password);

      if (user) {
        console.log("Login successful");
        return {
          success: true,
          message: "Login successful",
          user,
        };
      } else {
        console.log("Login failed: Invalid credentials");
        return {
          success: false,
          error: "Invalid email or password",
        };
      }
    }

    if (action === "change-credentials") {
      if (!newPassword)
        throw new Error("New password is required for password change");

      // Fetch user data from JSON Server
      const response = await fetch(`http://localhost:3000/users?email=${email}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const users = await response.json();
      const user = users.find((u) => u.email === email && u.password === password);

      if (user) {
        // Update the user's password
        const updateResponse = await fetch(`http://localhost:3000/users/${user.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password: newPassword }),
        });

        if (!updateResponse.ok) {
          throw new Error(`HTTP error! Status: ${updateResponse.status}`);
        }

        console.log("Password change successful");
        return {
          success: true,
          message: "Password changed successfully",
        };
      } else {
        return {
          success: false,
          error: "Current credentials are invalid",
        };
      }
    }

    throw new Error("Invalid action");
  } catch (error) {
    console.error("Auth error:", error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}