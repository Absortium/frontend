module.exports = function () {
  switch (process.env.NODE_ENV) {
    case "development":
      return {
        url: "dev.absortium.com"
      };

    case "production":
      return {
        url: "absortium.com"
      };

  }
};
