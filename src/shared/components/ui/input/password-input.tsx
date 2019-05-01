import * as React from 'react';
import { BaseInput } from 'shared/styling/components/input.emotion';

export const PasswordInput = (
  props: React.InputHTMLAttributes<HTMLInputElement>
) => <BaseInput type="password" {...props} />;
