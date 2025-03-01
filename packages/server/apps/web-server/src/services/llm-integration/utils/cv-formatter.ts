import type { CvDocument } from '../../../../../../libs/schemas';

export class CvFormatter {
  static cvToJsonCodeBlock(cv: CvDocument): string {
    return ['```json', JSON.stringify(cv.toObject(), null, 2), '```'].join(
      '\n'
    );
  }
}
