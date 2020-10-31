import React, { Component } from 'react';

class Plan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      text: props.entry.text,
    };
  }

  updateText(event) {
    if (event) event.preventDefault();

    const text = this.state.text.trim();

    if (text.length > 0) {
      const plan = Object.assign({}, this.props.entry, { text });
      this.setState({ editing: false }, () => this.props.update(plan));
    } else {
      this.props.delete();
    }
  }

  render() {
    const { complete, created } = this.props.entry;
    const updateId = 'UpdatePlan_' + created;
    if (this.state.editing) {
      return (
        <form className="form-inline" onSubmit={event => this.updateText(event)}>
          <label className="sr-only" htmlFor={ updateId }>Edit Plan Text</label>
          <input type="text" value={ this.state.text } className="form-control" id={ updateId }
            onInput={event => this.setState({ text: event.target.value })}
            onBlur={() => this.updateText()}
          />
        </form>
      )
    }
    return (
      <article className="mb-2 p-2 border">
        <label htmlFor={`checkbox${created}`} className="sr-only">Mark Complete</label>
        <input type="checkbox" id={ `checkbox${created}` } className="p-1"
          defaultChecked={ complete } onChange={event => this.props.setStatus(event.target.checked)}
        /> &nbsp;
        <button title="Click to edit" className={ `btn btn-link ${complete ? 'text-muted' : 'text-body font-weight-bold'}` }
          onClick={() => this.setState({ editing: true }, () => document.getElementById(updateId).focus())}>
          { this.state.text }
        </button>
        <button type="button" className="btn btn-danger btn-sm float-right" aria-label="Delete"
          onClick={() => this.props.delete()}>
          <span aria-hidden="true">&times;</span>
        </button>
      </article>
    )
  }
}

export default Plan;