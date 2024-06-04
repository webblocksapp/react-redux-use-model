export type ForeignKey = {
  foreignEntityName: string;
  foreignKeyName: string;
  foreignFieldName: string;
  foreignFieldDataType?: 'array' | 'primitive';
};
