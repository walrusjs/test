import { Loader, Format } from 'esbuild';

export interface Options {
  jsxFactory?: string
  jsxFragment?: string
  sourcemap?: boolean | 'inline' | 'external';
  loaders?: {
    [ext: string]: Loader;
  },
  target?: string;
  format?: Format;
}
