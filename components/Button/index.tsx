import * as React from 'react';
import { HTMLAttributeAnchorTarget, useMemo } from 'react';
import ButtonUnstyled, { ButtonUnstyledOwnerState, ButtonUnstyledProps } from '@mui/base/ButtonUnstyled';
import { Turo } from '@/types';

interface Props {
  color?: Turo.Colors;
  target?: HTMLAttributeAnchorTarget;
  children?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef(function Button(
  { color = 'primary', leftIcon, rightIcon, children, target, ...props }: ButtonUnstyledProps & Props,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const rootColorClasses = useMemo(() => {
    switch (color) {
      case 'primary':
        return 'bg-primary-400 hover:bg-primary-500 ring-primary-700';
      case 'secondary':
        return 'bg-secondary-400 hover:bg-secondary-500 ring-secondary-700';
    }
  }, [color]);

  return (
    <ButtonUnstyled
      component={props.href ? 'a' : 'button'}
      target={target}
      {...props}
      componentsProps={{
        root: (state: ButtonUnstyledOwnerState) => ({
          className: `${rootColorClasses} outline-0 rounded-lg py-2 px-3 focus:ring text-white`,
        }),
      }}
      ref={ref}
    >
      <div className={`flex gap-x-2`}>
        {leftIcon}
        {children}
        {rightIcon}
      </div>
    </ButtonUnstyled>
  );
});

export default Button;
