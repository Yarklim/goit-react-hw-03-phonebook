import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { ContactList } from './ContactList';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

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
      </Container>
    );
  }
}
