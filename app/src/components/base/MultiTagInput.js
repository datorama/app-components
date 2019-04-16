import React, { Component } from 'react';
import { func, string, bool } from 'prop-types';
import styled from 'styled-components';
import { without } from 'lodash/fp';

import Close from '../icons/Close.icon';

class MultiTagInput extends Component {
  state = {
    tags: [],
    text: ''
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tags !== this.state.tags) {
      this.props.onChange(this.state.tags);
    }
  }

  handleKeyPress = event => {
    if (
      (event.key === 'Enter' || event.key === ',' || event.key === ';') &&
      (this.props.validate !== undefined
        ? this.props.validate(event.target.value)
        : true)
    ) {
      this.setState({
        tags: [...this.state.tags, event.target.value],
        text: ''
      });
    }
  };

  removeTag = tag =>
    this.setState({
      tags: without([tag], this.state.tags)
    });

  render() {
    return (
      <TextSelectWrapper>
        <Tags>
          {(this.state.tags || []).map(tag => (
            <Tag key={tag} large={this.props.large}>
              <Text>{tag}</Text>
              <Remove onClick={() => this.removeTag(tag)} />
            </Tag>
          ))}
        </Tags>
        <Input
          large={this.props.large}
          placeholder={this.props.placeholder}
          onKeyPress={this.handleKeyPress}
          onChange={event =>
            this.setState({
              text: event.target.value
            })
          }
          value={this.state.text}
        />
      </TextSelectWrapper>
    );
  }
}

MultiTagInput.propTypes = {
  onChange: func,
  validate: func,
  placeholder: string,
  large: bool
};

const TextSelectWrapper = styled.div`
  width: calc(100% - 30px);
  box-sizing: border-box;
  padding: 0 10px;
  border: 1px solid ${({ theme }) => theme.p200};
  background: ${({ theme }) => theme.p0};
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 300ms;
  user-select: none;
  margin: 20px 0 0 25px;
  max-height: 200px;
  overflow: auto;
`;

const Input = styled.input`
  border: none;
  width: 100%;
  font-size: 14px;
  background: ${({ theme }) => theme.p0};
  ${({ theme }) => theme.text.p};
  height: ${({ theme, large }) =>
    large ? theme.size.LARGE : theme.size.MEDIUM};
`;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Text = styled.div`
  margin-right: 10px;
`;

const Remove = styled(Close)`
  cursor: pointer;
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.a400};
  display: flex;
  color: #fff;
  margin: 3px 3px 0 0;
  height: ${({ theme, large }) =>
    large ? theme.size.LARGE : theme.size.MEDIUM};
  border-radius: 5px;
  font-size: 14px;
  padding: 0 10px;
  align-items: center;
`;

export default MultiTagInput;
