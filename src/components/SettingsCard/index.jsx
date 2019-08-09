import React, { useCallback } from "react";
import PropTypes from "prop-types";

import Card from "components/Card";
import SettingsEntry, {
  propShape as settingPropShape
} from "components/SettingsEntry";

import "./style.scss";

function SettingsCard({ title, width, settings, onCommit }) {
  return (
    <div className={`settings-card width-${width}`}>
      <Card header={title}>
        {settings.map(({ key, ...rest }, entryIndex) => (
          <EntryWrapper
            {...rest}
            key={entryIndex}
            onCommit={onCommit}
            entryIndex={entryIndex}
            settingKey={key}
          />
        ))}
      </Card>
    </div>
  );
}

export default SettingsCard;
export const propShape = {
  settings: PropTypes.arrayOf(
    PropTypes.shape({ ...settingPropShape, key: PropTypes.string.isRequired })
  ).isRequired,
  title: PropTypes.string.isRequired,
  width: PropTypes.number
};

SettingsCard.propTypes = { ...propShape, onCommit: PropTypes.func };

SettingsCard.defaultProps = { width: 5, onCommit() {} };

SettingsCard.displayName = "SettingsCard";

// ? =======================
// ? Helper components
// ? =======================

function EntryWrapper({ entryIndex, onCommit, ...rest }) {
  const specificOnCommit = useCallback(
    (...args) => onCommit(entryIndex, args),
    [entryIndex]
  );
  return <SettingsEntry onCommit={specificOnCommit} {...rest} />;
}

EntryWrapper.propTypes = {
  entryIndex: PropTypes.number.isRequired,
  onCommit: PropTypes.func.isRequired
};

EntryWrapper.displayName = "EntryWrapper";
