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

const postRequest = async (newBook) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in localStorage");
    }
    const fetchBooks = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(newBook),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await fetchBooks.json();
    if (!response.success) {
      throw new Error(response.message || "Failed to fetch books");
    }
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

const deleteRequest = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in localStorage");
    }
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Unexpected error");
    }
    return result;
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    console.error(errMsg);
    return {
      success: false,
      message: errMsg,
    };
  }
};

const patchRequest = async (dataBook, id) => {};

export { getRequest, getSearchTerm, postRequest, deleteRequest, patchRequest };
