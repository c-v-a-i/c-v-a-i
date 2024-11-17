export class GooglePayload {
  id!: string;

  displayName!: string;

  name!: {
    familyName: string;
    givenName: string;
  };

  emails!: {
    value: string;
    verified: boolean;
  }[];

  photos!: {
    value: string;
  }[];

  provider!: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _raw!: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _json!: any[];
}
