async function handler() {
    try {
      console.log("Fetching exchanges from JSON Server...");
  
      // Fetch data from JSON Server
      const response = await fetch('http://localhost:3000/exchanges'); // Replace with your JSON Server URL
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const exchanges = await response.json(); // Parse the JSON response
  
      console.log("Fetched exchanges:", exchanges);
  
      // Return the data as a JSON object
      return {
        exchanges: exchanges || [],
        success: true,
      };
    } catch (error) {
      console.error("Fetch error:", error);
  
      // Return an error response as a JSON object
      return {
        exchanges: [],
        error: error.message,
        success: false,
      };
    }
  }