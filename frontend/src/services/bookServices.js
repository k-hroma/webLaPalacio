const API_URL = import.meta.env.VITE_API_URL;

const getRequest = async () => {
  try {
    const fetchBooks = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await fetchBooks.json();
    if (!response.success) {
      throw new Error(response.message || "Failed to fetch books");
    }
    return response.data;
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    console.error(errMsg);
    return {
      success: false,
      message: errMsg,
    };
  }
};

const getSearchTerm = async (term) => {
  try {
    const responseQuery = await fetch(
      `${API_URL}/search?term=${encodeURIComponent(term)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const response = await responseQuery.json();
    return response;
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    console.error(errMsg);
    return {
      success: false,
      message: errMsg,
    };
  }
};

export { getRequest, getSearchTerm };
