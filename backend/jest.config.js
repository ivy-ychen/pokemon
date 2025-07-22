/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    testEnvironment: "node",
    testPathIgnorePatterns: ['<rootDir>/dist/', 'dist/', 'node_modules/'],
    transform: {
        "^.+.tsx?$": ["ts-jest", {}],
    },
}