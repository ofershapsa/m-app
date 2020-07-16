import React from "react"

export class ContantEditor extends React.Component {
  state = {
    contact: {}
  }
  componentDidMount() {
    this.setState({ contact: { ...this.props.contact } })
  }
  handleFieldChange = fieldName => event => {
    const contact = { ...this.state.contact }
    contact[fieldName] = event.target.value
    this.setState({ contact })
    this.props.onContantChange(contact)
    console.log(this.state.contact)
  }

  render() {
    const { contact } = this.state
    return (
      <div>
        <h2 className="title">Edit contant details</h2>
        <div className="field">
          <label htmlFor="" className="label" >
            Name
            </label>
          <div className="control" >
            <div>
            </div>
            <input
              className="input"
              type="text"
              placeholder="Name"
              value={contact.name}
              onChange={this.handleFieldChange("name")}
            />
          </div>
          <div className="field">
            <label htmlFor="" className="label">
              Age
          </label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Age"
                value={contact.age}
                onChange={this.handleFieldChange("age")}
              />
            </div>
          </div>

        </div>

      </div>
    )
  }
}
