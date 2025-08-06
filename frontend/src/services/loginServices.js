const API_URL_LOGIN = import.meta.env.VITE_API_URL_LOGIN;

const setLogRequest = async (dataLogUser) => {
  try {
    const response = await fetch(API_URL_LOGIN, {
      method: "POST",
      body: JSON.stringify(dataLogUser),
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    console.log(result);
    if (!result.success) {
      throw new Error(result.message);
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

export { setLogRequest };
