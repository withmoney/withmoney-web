import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:5000/graphql',
  documents: ['src/graphql-service/gqls/**/*.(tsx|ts)'],
  hooks: { afterAllFileWrite: ['prettier --write'] },
  generates: {
    './src/graphql-service/types.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        scalars: {
          DateTime: 'string',
          UUID: 'string',
        },
      },
    },
    './src/graphql-service/hooks.ts': {
      plugins: ['typescript-react-apollo'],
      preset: 'import-types',
      presetConfig: {
        typesPath: './types',
      },
      config: {
        withHOC: false,
        withComponent: false,
        withHooks: true,
        scalars: {
          DateTime: 'string',
          UUID: 'string',
        },
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
