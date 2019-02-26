import React, { Component, Fragment } from 'react';
import styled, {
  css,
  ThemeProvider,
  createGlobalStyle
} from 'styled-components';
import { isEmpty } from 'lodash/fp';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import CustomColor from './generators/CustomColor';

// notifications
import { ToastsProvider, lightTheme, darkTheme } from 'app-components';

// docs
import Home from './docs/Home.doc';
import GettingStarted from './docs/GettingStarted';

import Colors from './docs/Colors.doc';
import Layout from './docs/Layout.doc';
import Datepicker from './docs/Datepicker.doc';
import ClickOut from './docs/ClickOut.doc';
import Typography from './docs/Typography.doc';
import Button from './docs/Button.doc';
import Animations from './docs/Animations.doc';
import Card from './docs/Card.doc';
import Select from './docs/Select.doc';
import Modal from './docs/Modal.doc';
import Toggles from './docs/Toggles.doc';
import Progress from './docs/Progress.docs';
import Carousel from './docs/Carousel.doc';
import Spinner from './docs/Spinner.doc';
import Pagination from './docs/Pagination.doc';
import TextInput from './docs/TextInput.doc';
import Draggable from './docs/Draggable.doc';
import Tag from './docs/Tags.doc';
import Range from './docs/Range.doc';
import Toast from './docs/Toast.doc';
import Tabs from './docs/Tabs.doc';
import Tooltip from './docs/Tooltip.doc';
import Stepper from './docs/Stepper.doc';
import Collapse from './docs/Collapse.doc';
import Widget from './docs/Widget.doc';

const Navigation = ({ list, history, location, onClick }) => (
  <Fragment>
    <Header>
      <Title onClick={() => history.push('/')}>Apps design system</Title>
    </Header>
    <Menu>
      {list.map(({ key, label, type, path }) => (
        <MenuItem
          key={key}
          type={type}
          onClick={() => {
            history.push(`/${path}`);
            onClick();
          }}
          selected={`/${path}` === location.pathname}
          disabled={!path}
        >
          <MenuLine visible={`/${path}` === location.pathname} />
          {label}
        </MenuItem>
      ))}
    </Menu>
  </Fragment>
);

const ConnectedNavigation = withRouter(Navigation);

class App extends Component {
  state = {
    light: true,
    colorsOpen: false,
    customTheme: {}
  };

  toggleTheme = () => this.setState(prevState => ({ light: !prevState.light }));

  updateTheme = customTheme =>
    this.setState({
      customTheme: {
        ...this.state.customTheme,
        ...customTheme
      }
    });

  afterNavigate = () => {
    window.scroll(0, 0);
    this.setState({ colorsOpen: false });
  };

  render() {
    const { light, colorsOpen, customTheme } = this.state;
    let theme = light ? lightTheme : darkTheme;

    if (!isEmpty(customTheme)) {
      if (light) {
        theme = {
          ...theme,
          ...customTheme
        };
      } else {
        theme = {
          ...theme,
          a100: customTheme.a800,
          a200: customTheme.a700,
          a300: customTheme.a600,
          a350: customTheme.a500,
          a400: customTheme.a400,
          a500: customTheme.a350,
          a600: customTheme.a300,
          a700: customTheme.a200,
          a800: customTheme.a100
        };
      }
    }

    const list = [
      {
        key: 'getting-started',
        label: 'getting started',
        path: 'getting-started'
      },
      { key: 'guidelines', label: 'app guidelines' },

      { key: 'style', label: 'style', type: 'title' },
      { key: 'colors', label: 'colors', path: 'colors' },
      { key: 'typography', label: 'typography', path: 'typography' },
      { key: 'layout', label: 'layout', path: 'layout' },
      { key: 'animations', label: 'animations', path: 'animations' },

      { key: 'components', label: 'components', type: 'title' },
      { key: 'button', label: 'button', path: 'button' },
      { key: 'card', label: 'card', path: 'card' },
      { key: 'modal', label: 'modal', path: 'modal' },
      { key: 'toggles', label: 'toggles', path: 'toggles' },
      { key: 'progress', label: 'progress', path: 'progress' },
      { key: 'spinner', label: 'spinner', path: 'spinner' },
      { key: 'text-input', label: 'text-input', path: 'text-input' },
      { key: 'tag', label: 'tag', path: 'tag' },
      { key: 'select', label: 'select', path: 'select' },
      { key: 'carousel', label: 'carousel', path: 'carousel' },
      { key: 'pagination', label: 'pagination', path: 'pagination' },

      { key: 'toasts', label: 'toasts', path: 'toasts' },
      { key: 'stepper', label: 'stepper', path: 'stepper' },
      { key: 'tooltip', label: 'tooltip', path: 'tooltip' },
      { key: 'range-input', label: 'range input', path: 'range' },
      { key: 'tabs', label: 'tabs', path: 'tabs' },
      { key: 'collapse', label: 'collapse', path: 'collapse' },
      { key: 'date-picker', label: 'date picker', path: 'datepicker' },
      { key: 'widget', label: 'widget', path: 'widget' },
      { key: 'navbar', label: 'navbar' },
      { key: 'table', label: 'table' },

      { key: 'utils', label: 'utils', type: 'title' },
      { key: 'click-out', label: 'click out', path: 'click-out' },
      { key: 'draggable', label: 'draggable', path: 'draggable' }
    ];

    return (
      <Router>
        <ThemeProvider theme={theme}>
          <ToastsProvider>
            <CustomColor
              open={colorsOpen}
              theme={theme}
              light={light}
              updateTheme={this.updateTheme}
            />
            <Container>
              <GlobalStyle light={light} />

              <Sidebar light={light}>
                <ConnectedNavigation list={list} onClick={this.afterNavigate} />
              </Sidebar>

              <ThemeButton selected={!light} onClick={this.toggleTheme}>
                <ContrastIcon />
              </ThemeButton>

              <ColorsButton
                selected={colorsOpen}
                onClick={() =>
                  this.setState({ colorsOpen: !this.state.colorsOpen })
                }
              >
                <DropIcon />
              </ColorsButton>

              <Content light={light}>
                <Route exact path="/" component={Home} />
                <Route
                  exact
                  path="/getting-started"
                  component={GettingStarted}
                />

                <Route exact path="/colors" component={Colors} />
                <Route exact path="/typography" component={Typography} />
                <Route exact path="/layout" component={Layout} />
                <Route exact path="/animations" component={Animations} />

                <Route exact path="/button" component={Button} />
                <Route exact path="/datepicker" component={Datepicker} />
                <Route exact path="/card" component={Card} />
                <Route exact path="/select" component={Select} />
                <Route exact path="/modal" component={Modal} />
                <Route exact path="/toggles" component={Toggles} />
                <Route exact path="/progress" component={Progress} />
                <Route exact path="/carousel" component={Carousel} />
                <Route exact path="/spinner" component={Spinner} />
                <Route exact path="/pagination" component={Pagination} />
                <Route exact path="/text-input" component={TextInput} />
                <Route exact path="/tag" component={Tag} />
                <Route exact path="/range" component={Range} />
                <Route exact path="/toasts" component={Toast} />
                <Route exact path="/tabs" component={Tabs} />
                <Route exact path="/tooltip" component={Tooltip} />
                <Route exact path="/stepper" component={Stepper} />
                <Route exact path="/collapse" component={Collapse} />
                <Route exact path="/widget" component={Widget} />

                <Route exact path="/click-out" component={ClickOut} />
                <Route exact path="/draggable" component={Draggable} />
              </Content>
            </Container>
          </ToastsProvider>
        </ThemeProvider>
      </Router>
    );
  }
}

export default App;

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
  user-select: none;
`;

const Sidebar = styled.div`
  width: 300px;
  background: #fff;
  box-sizing: border-box;
  border-right: 1px solid #eeeeee;
  padding: 40px;

  ${({ light }) =>
    !light &&
    css`
      background: #272727;
      border-color: #404040;
    `};
`;

const Content = styled.div`
  width: calc(100vw - 300px);
  min-height: 100vh;
  box-sizing: border-box;
  background: #fff;

  ${({ light }) =>
    !light &&
    css`
      background: #272727;
    `};
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 30px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.p400};
  cursor: pointer;
`;

const Menu = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled.div`
  width: 100%;
  font-size: 14px;
  position: relative;
  font-weight: 400;
  color: ${({ theme }) => theme.p300};
  margin: 5px 0;
  text-transform: capitalize;
  cursor: pointer;

  ${({ type }) =>
    type === 'title' &&
    css`
      font-weight: 700;
      color: ${({ theme }) => theme.p600};
      margin: 20px 0 5px 0;
      cursor: default;
      pointer-events: none;
    `}

  &:hover {
    color: ${({ theme }) => theme.a400};
  }

  ${({ selected }) =>
    selected &&
    css`
      color: ${({ theme }) => theme.a400};
    `};

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
      opacity: 0.5;
    `};
`;

const MenuLine = styled.div`
  position: absolute;
  top: -8px;
  left: -40px;
  width: 3px;
  height: 30px;
  background: ${({ theme }) => theme.a400};
  transition: all 300ms;
  opacity: 0;

  ${({ visible }) =>
    visible &&
    css`
      opacity: 1;
    `}
`;

const ThemeButton = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.p300};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: sll 500ms;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0);
  opacity: 0.3;

  ${({ selected }) =>
    selected &&
    css`
      opacity: 0.7;
    `};

  &:hover {
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  }
`;

const DropIcon = styled.div`
  width: 30px;
  height: 30px;
  background: url(${require('./docs/assets/drop.svg')}) no-repeat;
  background-size: contain;
`;

const ContrastIcon = styled.div`
  width: 22px;
  height: 22px;
  background: url(${require('./docs/assets/dark-light.svg')}) no-repeat;
  background-size: contain;
`;

const GlobalStyle = createGlobalStyle`
	pre {
		margin: 0 !important;
		width: 100%;
	}

	.hljs {
		background: ${({ theme }) => theme.p50} !important;
		border-radius: 4px;
		box-sizing: border-box;
		padding: 20px !important;
	}

	@import url('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.5/styles/atom-one-light.min.css');
	
	${({ light }) =>
    !light &&
    css`
      @import url('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.5/styles/atom-one-dark.min.css');
    `};
`;

const ColorsButton = styled(ThemeButton)`
  right: 70px;
`;
