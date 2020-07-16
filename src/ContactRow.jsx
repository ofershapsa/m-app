import React, { Component } from "react"

export default class ContactRow extends Component {

  constructor(props) {
    super(props);

    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this)
  }
  handleEdit = () => {
    const { contact } = this.props
    this.props.handleEdit(contact.id)
  }
  handleDelete = () => {
    const { contact } = this.props
    this.props.handleDelete(contact.id)
  }

  render() {

    const contact = this.props.contact
    return (

      <tr>

        <td>{contact.id}</td>
        <td>{contact.name}</td>
        <td>
          {contact.age}
        </td>
        <button
          className="button is-danger"
          onClick={this.handleDelete}
        >
          Delete
                </button>
        <button className="button is-info" onClick={this.handleEdit}>
          Update
          </button>

      </tr>
    )

  }

}



