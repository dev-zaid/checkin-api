require("dotenv").config();

process.env.NODE_ENV = process.env.NODE_ENV || "development";

export default {
  port: parseInt(process.env.PORT!) || 5050,

  databaseURL: process.env.MONGODB_URI,

  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },

  google: {
    sheetURL:
      process.env.SPREADSHEET_ID || "GIMME THE ID!",
  },

  api: {
    prefix: "/api",
  },
};
