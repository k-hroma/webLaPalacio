const API_URL_REGISTER_USER = import.meta.env.VITE_API_URL_REGISTER_USER;
const API_URL_REGISTER_ADMIN = import.meta.env.VITE_API_URL_REGISTER_ADMIN;

const setRequestRegisterUser = async (dataUser) => {
  try {
    const response = await fetch(API_URL_REGISTER_USER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataUser),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Unknown error");
    }
    return result;
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    console.log(error);
    return {
      success: false,
      message: errMsg,
    };
  }
};

const setRequestRegisterAdmin = async (dataUser) => {
  try {
    const response = await fetch(API_URL_REGISTER_ADMIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataUser),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Unknown error");
    }
    return result;
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    console.log(error);
    return {
      success: false,
      message: errMsg,
    };
  }
};

export { setRequestRegisterUser, setRequestRegisterAdmin };
