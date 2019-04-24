import * as React from 'react';
import { LOGO_IMAGE } from 'shared/constants/statics';

export const LogoImage: React.SFC<
  React.ImgHTMLAttributes<HTMLImageElement>
> = React.memo(props => <img {...{ ...props, src: LOGO_IMAGE }} />);
