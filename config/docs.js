const swaggerOptions = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Jaiye Documentation",
      description:
        "These documented endpoints describes the API (REST API) for Jaiye.",
      contact: {
        name: "Jaiye's Backend Team",
        email: "victorukay@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Test server running on locally.",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js", "./models/*/*.js"],
};

export default swaggerOptions;
