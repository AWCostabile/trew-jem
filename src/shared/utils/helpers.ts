// 'NULL' CHECKS
export const isNull = (value: any) => value == null;

export const isNullOrEmpty = (value: any) => isNull(value) || value === '';

export const isNullOrWhitespace = (value: any) =>
  isNullOrEmpty(value) || String(value).replace(/\s/, '') === '';

export const isObjectNullOrEmpty = (value: any) =>
  typeof value !== 'object' || Object.keys(value).length === 0;

export const isArrayNullOrEmpty = (value: any) =>
  typeof value !== 'object' || Array.from(value).length === 0;

// 'NOT NULL' CHECKS
export const isNotNull = (value: any) => !isNull(value);

export const isNotNullOrEmpty = (value: any) => !isNullOrEmpty(value);

export const isNotNullOrWhitespace = (value: any) => !isNullOrWhitespace(value);

export const isObjectNotNullOrEmpty = (value: any) =>
  !isObjectNullOrEmpty(value);

export const isNotNotNullOrEmpty = (value: any) => !isArrayNullOrEmpty(value);
