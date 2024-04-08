import { ApolloClientOptions, ApolloLink } from '@apollo/client/core';
import { createHttpLink, InMemoryCache } from '@apollo/client/core';
import { createUploadLink } from 'apollo-upload-client';
import type { BootFileParams } from '@quasar/app-vite';

export /* async */ function getClientOptions(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  /* {app, router, ...} */ options?: Partial<BootFileParams<any>>
) {
  const httpLink = createHttpLink({
    uri:
      import.meta.env.VITE_GRAPHQL_URI ||
      // Change to your graphql endpoint.
      '/graphql',
  });

  const uploadLink = createUploadLink({
    uri:
      import.meta.env.VITE_GRAPHQL_URI ||
      // Change to your graphql endpoint.
      '/graphql',
  });

  return <ApolloClientOptions<unknown>>Object.assign(
    // General options.
    <ApolloClientOptions<unknown>>{
      link: ApolloLink.split(
        (op) => op.getContext().hasUpload,
        uploadLink,
        httpLink
      ),

      cache: new InMemoryCache(),
    },

    // Specific Quasar mode options.
    process.env.MODE === 'spa'
      ? {
          //
        }
      : {},
    process.env.MODE === 'ssr'
      ? {
          //
        }
      : {},
    process.env.MODE === 'pwa'
      ? {
          //
        }
      : {},
    process.env.MODE === 'bex'
      ? {
          //
        }
      : {},
    process.env.MODE === 'cordova'
      ? {
          //
        }
      : {},
    process.env.MODE === 'capacitor'
      ? {
          //
        }
      : {},
    process.env.MODE === 'electron'
      ? {
          //
        }
      : {},

    // dev/prod options.
    process.env.DEV
      ? {
          //
        }
      : {},
    process.env.PROD
      ? {
          //
        }
      : {},

    // For ssr mode, when on server.
    process.env.MODE === 'ssr' && process.env.SERVER
      ? {
          ssrMode: true,
        }
      : {},
    // For ssr mode, when on client.
    process.env.MODE === 'ssr' && process.env.CLIENT
      ? {
          ssrForceFetchDelay: 100,
        }
      : {}
  );
}
