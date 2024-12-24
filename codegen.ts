import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./server/**/*.graphql",
  documents: ["src/**/*.graphql"],
  generates: {
    "./server/types/resolvers-types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        typesPrefix: "I",
        contextType: "../context#Context",
        defaultMapper: "Partial<{T}>",
        scalars: {
          DateTime: "Date",
        },
        mappers: {
          Job: "@prisma/client#Job",
        },
      },
    },
    "src/types/graphql.ts": {
      plugins: ["typescript"],
      config: {
        namingConvention: {
          enumValues: "change-case#upperCase",
        },
      },
    },
    "src/": {
      preset: "near-operation-file",
      presetConfig: {
        extension: ".generated.tsx",
        baseTypesPath: "types/graphql.ts",
      },
      plugins: ["typescript-operations", "typescript-react-apollo"],
      config: {
        withHooks: true,
        scalars: {
          DateTime: "Date",
        },
      },
    },
  },
};

export default config;
