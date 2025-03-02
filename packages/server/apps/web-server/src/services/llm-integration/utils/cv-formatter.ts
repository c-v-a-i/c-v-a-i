import type { CvDocument } from '../../../../../../libs/schemas';
import type { ToObjectOptions } from 'mongoose';
import yaml from 'js-yaml';

export class CvFormatter {
  static cvToJsonCodeBlock(cv: CvDocument): string {
    const options: ToObjectOptions = {
      flattenMaps: true,
    };
    return [
      '```yaml',
      yaml.dump(cv.toObject(options)),
      // cv.toObject(options),
      '```',
    ].join('\n');
  }
}
