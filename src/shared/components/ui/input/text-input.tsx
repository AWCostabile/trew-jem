import * as React from 'react';
import { BaseInput } from 'shared/styling/components/input.emotion';

export const TextInput = (
  props: React.InputHTMLAttributes<HTMLInputElement>
) => <BaseInput type="text" {...props} />;
