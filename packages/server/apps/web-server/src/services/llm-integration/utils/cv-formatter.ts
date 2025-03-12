import yaml from 'js-yaml';
import type { CvObjectType } from '../../cv/dto';

export class CvFormatter {
  static cvToJsonCodeBlock(cv: CvObjectType): string {
    return ['```yaml', yaml.dump(cv), '```'].join('\n');
  }
}
