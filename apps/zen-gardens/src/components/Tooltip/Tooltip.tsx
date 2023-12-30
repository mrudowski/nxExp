import {Tooltip as MantineTooltip, TooltipProps} from '@mantine/core';

const Tooltip = (props: TooltipProps) => {
  return <MantineTooltip withArrow={true} arrowSize={8} {...props} />;
};

Tooltip.Group = MantineTooltip.Group;

export default Tooltip;
