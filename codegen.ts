import "dotenv/config";
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: `${process.env.VITE_API_URL}`,
  documents: "src/**/*.{ts,tsx}",
  generates: {
    "src/": {
      preset: "near-operation-file",
      presetConfig: {
        extension: ".generated.ts",
        baseTypesPath: "types/graphql.ts",
      },
      plugins: ["typescript", "typescript-react-apollo"],
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
    "src/types/graphql.ts": {
      plugins: ["typescript"],
    },
  },
};

export default config;
