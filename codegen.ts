import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./server/**/*.graphql",
  generates: {
    "./server/types/resolvers-types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "../context#Context",
        defaultMapper: "Partial<{T}>",
        scalars: {
          DateTime: "Date",
        },
      },
    },
  },
};

export default config;
