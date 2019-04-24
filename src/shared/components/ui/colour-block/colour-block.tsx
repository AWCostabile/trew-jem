import * as React from 'react';
import { ColouredSpan } from './colour-block.emotion';

export type ColourText = [string] | [string, string];

interface IColourTextProps {
  text: ColourText[];
}

export const ColourBlock: React.SFC<IColourTextProps> = ({
  text: textArray
}) => (
  <React.Fragment>
    {textArray.map(([text, colour], key) => {
      const props = {
        children: key ? ` ${text}` : text,
        colour,
        key
      };
      return colour ? <ColouredSpan {...props} /> : <span {...props} />;
    })}
  </React.Fragment>
);
