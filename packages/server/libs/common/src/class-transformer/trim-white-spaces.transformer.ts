import { Transform } from 'class-transformer';

export const TrimWhiteSpacesTransformer = () => {
  return Transform(({ value }) => (value ? (value as string).trim() : value), {
    toPlainOnly: true,
  });
};
