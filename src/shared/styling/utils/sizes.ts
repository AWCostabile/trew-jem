import { IKeyValueMap } from 'mobx';
import { isNotNull, isNotNullOrWhitespace } from 'shared/utils/helpers';
import { ISized, ValueType } from './types';

// Creates a mapper for a value to a CSS attribute
const createAttributeMapper = (attribute: string) => (values: string[]) =>
  `${attribute}: ${values.join(' ')};`;

// Creates a mapper for a value to its CSS unit
const createUnitMapper = (unit: string, spaces?: number) => (
  value: ValueType
) =>
  String(value) !== '0' && String(value).match(/^[-0-9.]*$/)
    ? `${
        spaces && !isNaN(Number(value)) ? spaces * (value as number) : value
      }${unit}`
    : `${value}`;

const mapDirectionsToSides = (
  { x, y, all, ...values }: Partial<ISized>,
  spaces?: number,
  unit?: string
) => {
  const toUnit = unit
    ? createUnitMapper(unit, spaces)
    : (value: ValueType) => value;
  return ['top', 'left', 'right', 'bottom'].reduce(
    ({ keys, ...rest }: IKeyValueMap<any>, key) => {
      const value = [
        (values as IKeyValueMap<any>)[key],
        ['left', 'right'].includes(key) ? x : y,
        all
      ].find(isNotNull);

      return isNotNullOrWhitespace(value)
        ? { ...rest, [key]: toUnit(value), keys: [...keys, key] }
        : { ...rest, keys };
    },
    { keys: [] }
  );
};

/**
 * Returns a Directions object that maps input directions to CSS directions
 * @param Directions an IDirectional
 */
export const setSizedAttribute = (
  directions: Partial<ISized>,
  attribute?: string,
  spaces?: number,
  unit?: any
) => {
  const { keys, ...sides } = mapDirectionsToSides(directions, spaces, unit);

  if (!attribute || keys.length < 4) {
    return (keys as string[])
      .map(key => `${attribute ? `${attribute}-` : ''}${key}: ${sides[key]};`)
      .join(' ');
  }

  const toAttribute = createAttributeMapper(attribute);

  if (sides.left !== sides.right) {
    return toAttribute([sides.top, sides.right, sides.bottom, sides.left]);
  }

  if (sides.top !== sides.bottom) {
    return toAttribute([sides.top, sides.right, sides.bottom]);
  }

  if (sides.top !== sides.left) {
    return toAttribute([sides.top, sides.right]);
  }

  return toAttribute([sides.top]);
};
