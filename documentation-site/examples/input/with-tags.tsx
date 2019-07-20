import * as React from 'react';
import {styled} from 'baseui';
import {Block} from 'baseui/block';
import {Input, StyledInput, SIZE} from 'baseui/input';
import {Tag, VARIANT as TAG_VARIANT} from 'baseui/tag';

const ValueWrapper = styled('div', {
  flex: '1 1 0%',
  flexWrap: 'wrap',
  display: 'flex',
  alignItems: 'center',
});

const InputReplacement = ({tags, removeTag, ...restProps}: any) => {
  return (
    <ValueWrapper>
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
    </ValueWrapper>
  );
};

class TagSelect extends React.Component<
  {},
  {value: string; tags: string[]}
> {
  state = {value: '', tags: ['hello']};

  handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.keyCode === 13) {
      if (!this.state.value) return;

      this.addTag(this.state.value);
      this.setState({value: ''});
    }

    if (event.keyCode === 8) {
      if (this.state.value || !this.state.tags.length) return;

      this.removeTag(this.state.tags[this.state.tags.length - 1]);
    }
  };

  addTag = (tag: string) => {
    this.setState({tags: [...this.state.tags, tag]});
  };

  removeTag = (tag: string) => {
    this.setState({tags: this.state.tags.filter(t => t !== tag)});
  };

  render() {
    return (
      <React.Fragment>
        <Block>
          Type a word and press enter to create a tag. Use backspace
          to remove tags.
        </Block>
        <Input
          size={SIZE.compact}
          value={this.state.value}
          onChange={e =>
            this.setState({
              value: (e.target as HTMLInputElement).value,
            })
          }
          overrides={{
            Input: {
              style: {width: 'auto', flexGrow: 1},
              component: InputReplacement,
              props: {
                tags: this.state.tags,
                removeTag: this.removeTag,
                onKeyDown: this.handleKeyDown,
              },
            },
          }}
        />
      </React.Fragment>
    );
  }
}

export default TagSelect;
