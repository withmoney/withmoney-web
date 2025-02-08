import type { CodegenConfig } from '@graphql-codegen/cli';

if (!process.env.VITE_APOLLO_SERVER_API) {
  throw new Error('VITE_APOLLO_SERVER_API is not set');
}

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.VITE_APOLLO_SERVER_API,
  documents: ['src/graphql-service/gqls/**/*.(tsx|ts)'],
  hooks: { afterAllFileWrite: ['prettier --write'] },
  generates: {
    './src/graphql-service/types.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        scalars: {
          Date: 'string',
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
