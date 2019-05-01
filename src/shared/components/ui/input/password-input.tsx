import * as React from 'react';
import { BaseInput } from 'shared/styling/components/text-input.emotion';

export const PasswordInput = (
  props: React.InputHTMLAttributes<HTMLInputElement>
) => <BaseInput type="password" {...props} />;
