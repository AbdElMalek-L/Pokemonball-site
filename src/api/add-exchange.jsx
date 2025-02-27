async function handler({ name, logo_url, status }) {
    if (!name || !logo_url) {
      throw new Error("Name and logo URL are required");
    }
  
    try {
      console.log("Creating exchange on JSON Server...");
  
      // Send a POST request to JSON Server
      const response = await fetch('http://localhost:3000/exchanges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          logo_url,
          status: status || "coming_soon", // Default status if not provided
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const exchange = await response.json(); // Parse the JSON response
  
      console.log("Created exchange:", exchange);
  
      // Return the created exchange
      return { exchange };
    } catch (error) {
      console.error("Fetch error:", error);
      throw error; // Re-throw the error for the caller to handle
    }
  }