import type {Maybe} from "graphql/jsutils/Maybe";

export type TextSectionProps = {
  id: string;
  value?: Maybe<string>;
  onSave: (value: string) => Promise<void>;
  isEditing?: boolean;
}