import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { ContactList } from './ContactList';
import { EmergencyBtn } from './EmergencyBtn';
import { Modal } from './Modal';
import { EmergencyContent } from './EmergencyContent';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
    showModal: false,
  };

  componentDidUpdate(prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));

    if (contacts) {
      this.setState({ contacts });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const id = nanoid();
    const name = e.target.elements.name.value;
    const number = e.target.elements.number.value;
    const item = this.state.contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (item) {
      alert(`${name} is alredy in contacts`);
    } else {
      this.setState(prevState => ({
        ...prevState,
        contacts: prevState.contacts.concat({
          name,
          id,
          number,
        }),
      }));
    }
    e.target.reset();
  };

  handleDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleChangeInput = str => {
    this.setState(prevState => ({
      filter: str,
    }));
  };

  handleFiltered = () => {
    const filterContactsList = this.state.contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .includes(this.state.filter.toLowerCase());
    });

    return filterContactsList;
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.handleSubmit} />
        <h2>Contacts</h2>
        <Filter
          filter={this.state.filter}
          onChangeInput={this.handleChangeInput}
        />
        <ContactList
          onSubmit={this.handleSubmit}
          contacts={this.handleFiltered()}
          onDelete={this.handleDelete}
        />
        <EmergencyBtn onClick={this.toggleModal} title="EMERGENCY NUMBERS!!!" />
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            {<EmergencyContent onClose={this.toggleModal} />}
          </Modal>
        )}
      </Container>
    );
  }
}
