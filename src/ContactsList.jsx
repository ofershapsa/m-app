import React, { Component } from "react"
import ContactRow from "./ContactRow"
import { Columns } from 'react-bulma-components/full'
import axios from "axios"
import { ContantEditor } from "./ContantEditor"
export default class ContactsList extends Component {
  state = {
    contacts: [],
    name: '',
    age: '',
    clientToEdit: null,
    clientToDelete: null,
    editedContant: null,
    clientToAdd: null,
  }

  handleContactChange = contact => {
    this.setState({
      editedContant: contact
    })
    console.log(this.state.editedContant)
  }

  getContantById(id) {
    return this.state.contacts.find(t => t.id === id)
  }
  resetClientToEdit = () => {
    this.setState({
      clientToEdit: null
    })
  }
  resetClientToDelete = () => {
    this.setState({
      clientToDelete: null
    })
  }
  resetClientToAdd = () => {
    this.setState({
      clientToAdd: null
    })
  }
  handleEdit = id => {
    const contact = this.getContantById(id)
    this.setState({
      clientToEdit: contact
    })
    console.log(contact)
  }
  handleDelete = id => {
    const contact = this.getContantById(id)
    this.setState({
      clientToDelete: contact
    })

  }

  deleteClient = event => {
    event.preventDefault();
    const id = this.state.clientToDelete.id

    axios.delete(`http://localhost:8080/delete/${id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.setState({ clientToDelete: null })
      })
  }

  editClient = event => {
    event.preventDefault();
    const id = this.state.editedContant.id
    const { name, age } = this.state.editedContant
    axios.put(`http://localhost:8080/update/${id}/
   ${name}/${age} `

    )
      .then((response) => {
        console.log(response.data);
        console.log(this.state.editedContant)
        this.setState({ clientToEdit: null })

      })
      .catch(function (error) {
        console.log(error);


      });
  }


  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.editClient = this.editClient.bind(this);
    this.deleteClient = this.deleteClient.bind(this)
    this.openAdd = this.openAdd.bind(this);
    this.handleContactChange = this.handleContactChange.bind(this);
    this.getContantById = this.getContantById.bind(this);
  }

  openAdd = () => {

    const { contacts } = this.state

    this.setState({ clientToAdd: contacts })
  }

  handleSubmit = event => {
    event.preventDefault();
    const { name, age } = this.state.editedContant
    axios.post('http://localhost:8080/add', { name: name, age: age }

    )
      .then(res => {
        this.setState({ clientToAdd: null })

      }).catch(res => {
        console.log(res);
        console.log(res.data);
      }
      )
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/getAll`)
      .then(res => {
        const contacts = res.data;
        this.setState({ contacts: contacts });
        console.log(res)


      }).catch(err => console.log(err))
  }

  render() {
    const { clientToEdit, clientToAdd, clientToDelete } = this.state
    return (
      <div className="container">
        <h3>We have {this.state.contacts.length} contacts</h3>
        <div>
          <button className="button is-info" onClick={this.openAdd}>
            Add
          </button>
        </div>
        <table className="table" >
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
            </tr>
          </thead>
          <tbody scope="row" >
            {this.state.contacts.map(item => (
              <ContactRow key={item.id} contact={item} handleEdit={this.handleEdit} handleDelete={this.handleDelete} />
            ))
            }
          </tbody>
          {clientToDelete && (
            <div className="modal is-active">
              <div className="modal-background" />
              <div className="modal-card">
                <section className="modal-card-body">
                  {`Are you sure you want to delete ${clientToDelete.name} ?`}
                </section>
                <footer className="modal-card-foot">
                  <button
                    className="button is-danger"
                    onClick={this.deleteClient}
                  >
                    Delete!
                </button>
                  <button className="button" onClick={this.resetClientToDelete}>
                    Cancel
                </button>
                </footer>
              </div>
              <button className="modal-close is-large" aria-label="close" onClick={this.resetClientToDelete} />
            </div>
          )}
          {clientToAdd && (
            <div className="modal is-active">
              <div className="modal-background" />
              <div className="modal-card">
                <section className="modal-card-body">
                  <ContantEditor
                    contact={clientToAdd}
                    onContantChange={this.handleContactChange}

                  />
                </section>
                <footer className="modal-card-foot">
                  <button className="button is-success" onClick={this.handleSubmit}>

                    Save changes
              </button>
                  <button className="button" onClick={this.resetClientToAdd}>
                    Cancel
              </button>
                </footer>
              </div>
              <button className="modal-close is-large" aria-label="close" onClick={this.resetClientToAdd} />
            </div>
          )}
          {clientToEdit && (
            <div className="modal is-active">
              <div className="modal-background" />
              <div className="modal-card">
                <section className="modal-card-body">
                  <ContantEditor
                    contact={clientToEdit}
                    onContantChange={this.handleContactChange}

                  />
                </section>
                <footer className="modal-card-foot">
                  <button className="button is-success" onClick={this.editClient}>

                    Save changes
              </button>
                  <button className="button" onClick={this.resetClientToEdit}>
                    Cancel
              </button>
                </footer>
              </div>
              <button className="modal-close is-large" aria-label="close" onClick={this.resetClientToEdit} />
            </div>
          )}
        </table>

      </div>

    )
  }
}
