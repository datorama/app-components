import { FunctionComponent } from 'react';

export type IconComponent = FunctionComponent<{
  className?: string;
  onClick?: () => void;
}>;
