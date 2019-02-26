import React from 'react';
import styled from 'styled-components';
import Highlight from 'react-highlight-js';

// components
import Base from './Base';
import {Row, Col, Modal, Button} from 'app-components';

const snippet = `
import { Modal } from 'app-components';

const MyComp = ({ modalOpen, toggleOpen }) => (
  <div>
    ...
    <Modal
      open={modalOpen}
      toggleOpen={toggleOpen}
      size="medium"
      title="Modal Example"
      buttons={[
      	{ type: 'secondary', label: 'cancel', onClick: toggleOpen},
      	{ label: 'submit', onClick: doSomething}
      ]}
    >
      ...
    </Modal>
  </div>
);
`;

export default class ModalDoc extends React.Component {
  state = {
    modalOpen: false,
    size: 'small'
  };

  toggleOpen = () =>
    this.setState(prevState => ({ modalOpen: !prevState.modalOpen }));

  openModal = size => () => this.setState({ size }, this.toggleOpen);

  render() {
    const { modalOpen, size } = this.state;
    const title = 'modal';
    const description =
      'Dialogs inform users about a task and can contain critical information, require decisions, or involve multiple tasks.';

    return (
      <Base title={title} description={description} name="Modal">
        <Modal
          size={size}
          open={modalOpen}
          toggleOpen={this.toggleOpen}
          title="Modal Example"
          buttons={[
            { type: 'secondary', label: 'cancel', onClick: null },
            { label: 'submit', onClick: null }
          ]}
        >
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores et
            exercitationem ratione saepe sit. Alias consectetur delectus dolore
            ducimus ea eveniet hic neque praesentium reiciendis ut? Accusantium
            ad consequuntur fugiat.
          </Text>
        </Modal>
        <Row align="stretch">
          <Col>
            <Highlight language="javascript">{snippet}</Highlight>
          </Col>
          <Col>
            <Box>
              <StyledButton onClick={this.openModal('small')}>
                Small modal
              </StyledButton>
              <StyledButton onClick={this.openModal('medium')}>
                Medium modal
              </StyledButton>
              <StyledButton onClick={this.openModal('large')}>
                Large modal
              </StyledButton>
              <StyledButton onClick={this.openModal('full')}>
                Full-screen modal
              </StyledButton>
            </Box>
          </Col>
        </Row>
      </Base>
    );
  }
}

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 4px;
  justify-content: center;
  background: ${({ theme }) => theme.p50};
  flex-direction: column;
`;

const Text = styled.div`
  ${({ theme }) => theme.text.sm};
  font-size: 14px;
  line-height: 18px;
`;

const StyledButton = styled(Button)`
  margin: 5px 0;
  width: 120px;
`;
