import { styled } from '@mui/material/styles';
import type { TypographyProps } from '@mui/material';
import { Tooltip, Typography } from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';

const StyledTypography = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TypographyWithOverflow = ({
  children,
  disableTooltip,
  ...props
}: TypographyProps & { disableTooltip?: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);

  const component = useMemo(
    () => (
      <StyledTypography {...props} ref={ref} key="styledTypographyKey">
        {children}
      </StyledTypography>
    ),
    [props, children]
  );

  useEffect(() => {
    const hasOverflow = !!ref.current && ref.current.scrollWidth > ref.current.clientWidth;
    setIsOverflow(hasOverflow);
  }, [children]);

  const renderTooltip = !disableTooltip && isOverflow && typeof children === 'string';

  return renderTooltip ? <Tooltip title={children}>{component}</Tooltip> : component;
};
