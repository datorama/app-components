import React, { Fragment, useCallback, useState, createContext } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import Highlighter from 'react-highlight-words';
import { extendTheme } from './components/utils';
import { AppTheme } from './components/index';
import { debounce } from 'lodash/fp';

import ThemePreview from './components/base/ThemePreview';

// notifications
import { lightTheme, TextInput, darkTheme } from './components/index';
import { NotificationsProvider } from './components/base/Notifications';

// docs
import Home from './docs/Home.doc';
import GettingStarted from './docs/GettingStarted';

import Colors from './docs/Colors.doc';
import Layout from './docs/Layout.doc';
import Datepicker from './docs/Datepicker.doc';
import ClickOut from './docs/ClickOut.doc';
import Typography from './docs/Typography.doc';
import Theme from './docs/Theme.doc';
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
import TextInputDoc from './docs/TextInput.doc';
import DragDrop from './docs/DragDrop.doc';
import Tag from './docs/Tags.doc';
import Range from './docs/Range.doc';
import Notifications from './docs/Notifications.doc';
import Tabs from './docs/Tabs.doc';
import Tooltip from './docs/Tooltip.doc';
import Stepper from './docs/Stepper.doc';
import Collapse from './docs/Collapse.doc';
import ErrorPage from './docs/ErrorPage.doc';
import Sticky from './docs/Sticky.doc';
import SnailChart from './docs/SnailChart.doc';
import Ellipsis from './docs/Ellipsis.doc';
import Table from './docs/Table.doc';
import Gauge from './docs/Gauge.doc';
import GoalsChart from './docs/GoalsChart';
import Filters from './docs/Filters.doc';
import Tornado from './docs/Tornado.doc';
import IllustratedMessage from './docs/IllustratedMessage.doc';

const list = [
  {
    key: 'getting-started',
    label: 'Getting Started',
    path: 'getting-started'
  },

  { key: 'style', label: 'Style', type: 'title' },
  { key: 'animations', label: 'Animations', path: 'animations' },
  { key: 'colors', label: 'Colors', path: 'colors' },
  { key: 'layout', label: 'Layout', path: 'layout' },
  { key: 'typography', label: 'Typography', path: 'typography' },
  { key: 'theme', label: 'Theme Customization', path: 'theme' },

  { key: 'components', label: 'Components', type: 'title' },
  { key: 'button', label: 'Button', path: 'button' },
  { key: 'card', label: 'Card', path: 'card' },
  { key: 'carousel', label: 'Carousel', path: 'carousel' },
  { key: 'collapse', label: 'Collapse', path: 'collapse' },
  { key: 'date-picker', label: 'Date Picker', path: 'datepicker' },
  { key: 'ellipsis', label: 'Ellipsis', path: 'ellipsis' },
  { key: 'modal', label: 'Modal', path: 'modal' },
  { key: 'notifications', label: 'Notifications', path: 'notifications' },
  { key: 'pagination', label: 'Pagination', path: 'pagination' },
  { key: 'progress', label: 'Progress', path: 'progress' },
  { key: 'range-input', label: 'Range Input', path: 'range' },
  { key: 'select', label: 'Select', path: 'select' },
  { key: 'spinner', label: 'Spinner', path: 'spinner' },
  { key: 'stepper', label: 'Stepper', path: 'stepper' },
  { key: 'sticky', label: 'Sticky', path: 'sticky' },
  { key: 'table', label: 'Table', path: 'table' },
  { key: 'tabs', label: 'Tabs', path: 'tabs' },
  { key: 'tag', label: 'Tag', path: 'tag' },
  { key: 'text-input', label: 'Text Input', path: 'text-input' },
  { key: 'toggles', label: 'Toggles', path: 'toggles' },
  { key: 'tooltip', label: 'Tooltip', path: 'tooltip' },
  { key: 'filters', label: 'Filters', path: 'filters' },

  { key: 'charts', label: 'Charts', type: 'title' },
  { key: 'goals-chart', label: 'Goals Chart', path: 'goals-chart' },
  { key: 'gauge', label: 'Gauge Chart', path: 'gauge' },
  { key: 'snail-chart', label: 'Snail Chart', path: 'snail-chart' },
  { key: 'tornado', label: 'Tornado', path: 'tornado' },

  { key: 'pages', label: 'Pages', type: 'title' },
  { key: 'error-page', label: 'Error Page', path: 'error-page' },
  {
    key: 'illustrated-message',
    label: 'Illustrated Message',
    path: 'illustrated-message'
  },

  { key: 'utils', label: 'Utils', type: 'title' },
  { key: 'click-out', label: 'Click Out', path: 'click-out' },
  { key: 'drag-drop', label: 'Drag and Drop', path: 'drag-drop' }
];

const Navigation = ({ list, history, location, onClick }) => {
  const [term, setTerm] = useState('');

  return (
    <Fragment>
      <Header>
        <Title onClick={() => history.push('/')}>Apps design system</Title>
        <Version>0.40.3</Version>
        <StyledTextInput
          placeholder="search..."
          onChange={e => setTerm(e.target.value)}
        />
      </Header>

      <Menu>
        {list
          .filter(
            ({ label, type }) =>
              label.toLowerCase().includes(term) || type === 'title'
          )
          .map(({ key, label, type, path }) => (
            <MenuItem
              key={key}
              type={type}
              onClick={() => {
                history.push(`/${path}`);
                onClick();
              }}
              selected={`/${path}` === location.pathname}
              disabled={!path}
              highlight={term && type !== 'title'}
            >
              <MenuLine visible={`/${path}` === location.pathname} />
              {term && type !== 'title' ? (
                <Highlighter
                  searchWords={[term]}
                  autoEscape={true}
                  textToHighlight={label}
                />
              ) : (
                label
              )}
            </MenuItem>
          ))}
      </Menu>
    </Fragment>
  );
};

const ConnectedNavigation = withRouter(Navigation);

export const Context = createContext();

const App = () => {
  const [themeConfig, setThemeConfig] = useState({
    scale: 1
  });
  const [theme, setTheme] = useState(lightTheme);

  const updateConfig = useCallback(
    debounce(500, options => {
      const newTheme = options.dark ? darkTheme : lightTheme;

      setThemeConfig(options);
      setTheme(extendTheme({ theme: newTheme, options }));
    }),
    []
  );

  const afterNavigate = useCallback(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <Router>
      <AppTheme provider={ThemeProvider} theme={theme}>
        <Context.Provider
          value={{ config: themeConfig, setConfig: setThemeConfig }}
        >
          <NotificationsProvider>
            <Container>
              <StyledPreview onChange={updateConfig} />
              <Sidebar background={theme.p0}>
                <ConnectedNavigation list={list} onClick={afterNavigate} />
              </Sidebar>

              <Content background={theme.p0}>
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
                <Route exact path="/theme" component={Theme} />

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
                <Route exact path="/text-input" component={TextInputDoc} />
                <Route exact path="/tag" component={Tag} />
                <Route exact path="/range" component={Range} />
                <Route exact path="/notifications" component={Notifications} />
                <Route exact path="/tabs" component={Tabs} />
                <Route exact path="/tooltip" component={Tooltip} />
                <Route exact path="/stepper" component={Stepper} />
                <Route exact path="/collapse" component={Collapse} />
                <Route exact path="/filters" component={Filters} />
                <Route exact path="/tornado" component={Tornado} />
                <Route exact path="/sticky" component={Sticky} />
                <Route exact path="/error-page" component={ErrorPage} />
                <Route
                  exact
                  path="/illustrated-message"
                  component={IllustratedMessage}
                />
                <Route exact path="/snail-chart" component={SnailChart} />
                <Route exact path="/goals-chart" component={GoalsChart} />
                <Route exact path="/ellipsis" component={Ellipsis} />
                <Route exact path="/table" component={Table} />
                <Route exact path="/gauge" component={Gauge} />

                <Route exact path="/click-out" component={ClickOut} />
                <Route exact path="/drag-drop" component={DragDrop} />
              </Content>
            </Container>
          </NotificationsProvider>
        </Context.Provider>
      </AppTheme>
    </Router>
  );
};

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
  background: ${({ background }) => background};
  box-sizing: border-box;
  border-right: 1px solid ${({ theme }) => theme.p100};
  padding: 40px;
`;

const Content = styled.div`
  width: calc(100vw - 300px);
  min-height: 100vh;
  box-sizing: border-box;
  background: ${({ background }) => background};
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

const Version = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.p300};
  font-weight: 600;
`;

const StyledTextInput = styled(TextInput)`
  margin-top: 10px;
  width: 100%;
`;

const StyledPreview = styled(ThemePreview)`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10;
`;
