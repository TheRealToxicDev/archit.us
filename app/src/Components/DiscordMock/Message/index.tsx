import classNames from "classnames";
import React from "react";

import ReactionList from "@app/components/DiscordMock/ReactionList";
import Skeleton from "@app/components/Skeleton";
import { MockReaction, StyleObject } from "@app/utility/types";
import "./style.scss";

type MessageProps = {
  onReact: (r: MockReaction) => void;
  onUnreact: (r: MockReaction) => void;
  content: string;
  edited: boolean;
  reactions: MockReaction[];
  mentionsUser: boolean;
  skeletonAmount?: number;
  style?: StyleObject;
  className?: string;
};

const Message: React.FC<MessageProps> = ({
  content,
  edited,
  reactions,
  mentionsUser,
  onReact,
  onUnreact,
  skeletonAmount = 80,
  style,
  className,
}) => (
  <div className={className} style={style}>
    <div
      className={classNames("message", {
        "mentions-user": mentionsUser,
      })}
    >
      <Skeleton.Multiline
        text={content}
        displayBlank={true}
        amount={skeletonAmount}
        size="0.9em"
        light
      >
        <div
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
        {edited && <span className="edited">(edited)</span>}
      </Skeleton.Multiline>
    </div>
    <ReactionList
      reactions={reactions}
      onReact={onReact}
      onUnreact={onUnreact}
    />
  </div>
);

export default Message;
