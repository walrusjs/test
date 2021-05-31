import { extname } from 'path';
import { Transformer } from '@jest/transform';
import {
  Loader,
  TransformOptions as EsbuildTransformOptions,
  transformSync
} from 'esbuild';

import { Options } from './types'
import { getExt, loaders } from './utils'

const createTransformer: Transformer<Options>['createTransformer'] = (options: Options = {}) => ({
  process(sourceText, sourcePath, opts) {
    const sources = {
      code: sourceText
    };

    const ext = getExt(sourcePath);
    const extName = extname(sourcePath).slice(1);
    const enableSourcemaps = options?.sourcemap ?? false;

    const loader = (options.loaders && options.loaders[ext]
      ? options.loaders[ext]
      : loaders.includes(extName) ? extName: 'text'
    ) as Loader;

    const sourcemaps: Partial<EsbuildTransformOptions> = enableSourcemaps
      ? { sourcemap: true, sourcesContent: false, sourcefile: sourcePath }
      : {}

    const result = transformSync(sources.code, {
      loader,
      format: options.format ?? 'cjs',
      target: options.target ?? 'es2018',
      ...(options.jsxFactory ? { jsxFactory: options.jsxFactory }: {}),
      ...(options.jsxFragment ? { jsxFragment: options.jsxFragment }: {}),
      ...sourcemaps
    });

    let { map, code } = result;

    if (enableSourcemaps) {
      map = {
        ...JSON.parse(result.map),
        sourcesContent: null,
      }

      code = code + '\n//# sourceMappingURL=data:application/json;base64,' + Buffer.from(JSON.stringify(map)).toString('base64')
    } else {
      map = null
    }

    return { code, map }
  }
})

const transformer: Pick<Transformer, 'canInstrument' | 'createTransformer'> = {
  canInstrument: true,
  createTransformer
}

export * from './types';

export default transformer;
