export const localhostEnvCorsUrls = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  // localhost Gql playground
  'http://localhost:4000',
];

export const productionEnvCorsUrls = [
  'https://cva-i.github.io',
  'https://arstoien.org',
]

export function getCorsUrls(environment: string) {
  return environment === 'local' ? localhostEnvCorsUrls : productionEnvCorsUrls;
}
