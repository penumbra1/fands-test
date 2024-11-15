/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

interface ImportMetaEnv {
  readonly VITE_APP_PAGES_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
