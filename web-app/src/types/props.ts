export type DataAttributeKey = `data-${string}`;

export type PropsOf<T> = T extends React.ComponentType<infer P>
  ? P & {
      [dataAttribute: DataAttributeKey]: unknown;
    }
  : never;
