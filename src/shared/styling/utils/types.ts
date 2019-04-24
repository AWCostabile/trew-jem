// DIRECTIONS
export enum DirectionType {
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
  TOP = 'top'
}

export enum ImpliedDirectionType {
  ALL,
  X,
  Y
}

export type DirectionY = DirectionType.TOP | DirectionType.BOTTOM;
export type DirectionX = DirectionType.LEFT | DirectionType.RIGHT;
export type ExpandedDirectionType = DirectionType | ImpliedDirectionType;

export type ValueType = string | number;

// SIZING
export type AbsoluteSizeUnits = 'cm' | 'mm' | 'in' | 'px' | 'pt' | 'pc';
export type RelativeSizeUnits =
  | '%'
  | 'ch'
  | 'em'
  | 'ex'
  | 'vh'
  | 'vw'
  | 'rem'
  | 'vmax'
  | 'vmin';

export type SizeUnits = AbsoluteSizeUnits | RelativeSizeUnits;

// UTILITY TYPES
export interface ISizeAndDirection<Direction = DirectionType> {
  attribute: string;
  direction: Direction;
  size: number;
  unit: SizeUnits | '';
}

export interface IAbsolutePlacement {
  x?: Partial<ISizeAndDirection<DirectionX>>;
  y?: Partial<ISizeAndDirection<DirectionY>>;
}

export interface ISized<Value = ValueType | undefined> {
  all: Value;
  bottom: Value;
  left: Value;
  right: Value;
  top: Value;
  x: Value;
  y: Value;
}
