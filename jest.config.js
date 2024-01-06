module.exports = {
  clearMocks: true,
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
  preset: "ts-jest",
  coverageDirectory: "coverage",
  testPathIgnorePatterns: ["/node_modules/"],
};
