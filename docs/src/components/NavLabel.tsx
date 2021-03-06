import { styled } from "linaria/react";
import React from "react";

import Badge from "@architus/facade/components/Badge";
import { gap, SpacingKey } from "@architus/facade/theme/spacing";
import { Nil } from "@architus/lib/types";
import { isDefined } from "@architus/lib/utility";

const Styled = {
  Gap: styled.span<{ gap: SpacingKey }>`
    margin-left: ${(p): string => gap(p.gap)};
  `,
};

export type NavLabelProps = {
  text: string;
  badge: string | Nil;
  gap?: SpacingKey;
};

/**
 * Renders a nav label + badge together
 */
const NavLabel: React.FC<NavLabelProps> = ({
  text,
  badge,
  gap: badgeGap = "pico",
}) => {
  return (
    <>
      {text}
      {isDefined(badge) && (
        <>
          <Styled.Gap gap={badgeGap} />
          <Badge>{badge}</Badge>
        </>
      )}
    </>
  );
};

export default NavLabel;
