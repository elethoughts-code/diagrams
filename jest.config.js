module.exports = {

    clearMocks: true,

    coverageDirectory: "coverage",

    coverageProvider: "v8",

    moduleDirectories: [
        "node_modules"
    ],

    testMatch: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[tj]s?(x)"
    ],

    testPathIgnorePatterns: [
        "\\\\node_modules\\\\"
    ],

    coveragePathIgnorePatterns: [
        "<rootDir>/src/test-utilities/"
    ],

    preset: 'ts-jest',
};
