/* eslint react/prop-types: 0 react/display-name: 0 */
import React from 'react';
import * as PropTypes from 'prop-types';

const { Provider, Consumer } = React.createContext({});
export const withContext = (Comp) => (props) => (
  <Consumer>
    {({ setDrag, setHover }) => (
      <Comp setDrag={setDrag} setHover={setHover} {...props} />
    )}
  </Consumer>
);

export class DragDropProvider extends React.Component {
  static propTypes = {
    onDrop: PropTypes.func,
    children: PropTypes.node,
  };

  state = {
    dragging: null,
    hovering: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.dragging && prevState.dragging) {
      this.props.onDrop({
        dragId: prevState.dragging,
        dropId: this.state.hovering,
      });
    }
  }

  setDrag = (dragging) => this.setState({ dragging });

  setHover = (hovering) => this.setState({ hovering });

  render() {
    return (
      <Provider value={{ setDrag: this.setDrag, setHover: this.setHover }}>
        {this.props.children}
      </Provider>
    );
  }
}
