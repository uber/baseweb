import * as React from 'react';
import {useStyletron} from 'baseui';
import {Input, StyledInput} from 'baseui/input';
import {Tag, VARIANT as TAG_VARIANT} from 'baseui/tag';

const InputReplacement = ({tags, removeTag, ...restProps}: any) => {
  const [css] = useStyletron();
  return (
    <div
      className={css({
        flex: '1 1 0%',
        flexWrap: 'wrap',
        display: 'flex',
        alignItems: 'center',
      })}
    >
      {tags.map((tag: string, index: number) => (
        <Tag
          variant={TAG_VARIANT.solid}
          onActionClick={() => removeTag(tag)}
          key={index}
        >
          {tag}
        </Tag>
      ))}
      <StyledInput {...restProps} />
    </div>
  );
};

export default () => {
  const [value, setValue] = React.useState('');
  const [tags, setTags] = React.useState(['hello']);
  const addTag = (tag: string) => {
    setTags([...tags, tag]);
  };
  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    switch (event.keyCode) {
      // Enter
      case 13: {
        if (!value) return;
        addTag(value);
        setValue('');
        return;
      }
      // Backspace
      case 8: {
        if (value || !tags.length) return;
        removeTag(tags[tags.length - 1]);
        return;
      }
    }
  };
  return (
    <Input
      value={value}
      onChange={e => setValue(e.currentTarget.value)}
      overrides={{
        Input: {
          style: {width: 'auto', flexGrow: 1},
          component: InputReplacement,
          props: {
            tags: tags,
            removeTag: removeTag,
            onKeyDown: handleKeyDown,
          },
        },
      }}
    />
  );
};
