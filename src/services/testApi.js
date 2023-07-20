const api = require("./api");

(async () => {
  try {
    const token = await api.getToken();
    console.log(token);
  } catch (error) {
    console.error(error);
  }
})();
