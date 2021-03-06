import React from 'react';
import { connect } from 'react-redux';
import { Row } from '../styles';

import { Button, Modal, ModalHeader, ModalFooter } from '../styles';
import { LoginModal, RegisterModal } from '../components';
import { hideSessionModal } from '../actions';

class SessionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedModal: '',
      modalTitle: '',
      cta: '',
      nestedModal: false,
      closeAll: false
    };

    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
  }

  componentDidMount() {
    this.setState({
      selectedModal: 'login',
      modalTitle: 'Sign in.',
      cta: 'I need an account.'
    })
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isLoggedIn && this.props.isLoggedIn) {
      this.props.hideSessionModal();
    }
  }

  toggle() {
    this.props.hideSessionModal();
  }

  toggleNested() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: false
    });
  }

  toggleAll() { 
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: true
    });
  }

  toggleSelectedModal() {
    let { selectedModal, modalTitle, cta } = this.state;
    if (selectedModal === 'register') {
      selectedModal = 'login';
      modalTitle = 'Sign In';
      cta = 'I need an account';
    } else {
      selectedModal = 'register';
      modalTitle = 'Sign Up';
      cta = 'I have an account.';
    }
    this.setState({
      selectedModal,
      modalTitle,
      cta,
    });
  }

  render() {
    return (
      <Modal isOpen={this.props.showingSessionModal} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>
          {this.state.modalTitle}
          <Button color="primary" onClick={this.toggleSelectedModal.bind(this)}>{this.state.cta}</Button>{' '}
        </ModalHeader>
        <ModalSelector selectedModal={this.state.selectedModal} />
      </Modal>
    );
  }
}

const ModalSelector = (props) => {
  return props.selectedModal === 'login'
    ? <LoginModal />
    : <RegisterModal />;
};

const mapStateToProps = (state) => {
  return {
    showingSessionModal: state.modals.showingSessionModal,
    isLoggedIn: state.session.isLoggedIn,
  }
}

export default connect(mapStateToProps, { hideSessionModal })(SessionModal);