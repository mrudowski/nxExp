import {Input, Text} from '@mantine/core';
import {useClickOutside} from '@mantine/hooks';
import clsx from 'clsx';
import React, {useState} from 'react';

import styles from './styles.module.scss';

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const EditableText = ({className, value, onChange}: EditableTextProps) => {
  const [editMode, setEditMode] = useState(false);
  const ref = useClickOutside(() => setEditMode(false));

  return (
    <div
      ref={ref}
      className={clsx(styles.editableText, editMode && styles.editMode, className)}
      onDoubleClick={() => {
        setEditMode(true);
      }}
    >
      {editMode ? (
        <Input
          size="xs"
          value={value}
          onChange={e => {
            onChange(e.currentTarget.value);
          }}
          onKeyUp={e => {
            if (e.code === 'Enter' || e.code === 'Escape') {
              setEditMode(false);
            }
          }}
          autoFocus={true}
          maxLength={24}
        />
      ) : (
        <Text component="div" truncate={true}>
          {value}
        </Text>
      )}
    </div>
  );
};

export default EditableText;
