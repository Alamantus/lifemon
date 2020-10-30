import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import localforage from 'localforage';
import stringHash from '@sindresorhus/string-hash';

const VIEWS = { DAY: 0, LONGTERM: 1 };

class Tasks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: VIEWS.DAY,
      loadedToday: false,
      day: props.day ? new Date(props.day) : new Date(),
      list: [],
      newPlanInput: '',
    };

    this.store = localforage.createInstance({ name: 'plans' });
  }

  componentDidMount() {
    if (!this.state.loadedToday) {
      this.setState({ loadedToday: true }, () => this.setDay(this.state.day));
    }
  }

  get input() {
    return this.state.newPlanInput.trim();
  }

  getDayFormat(date) {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().length < 2 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1).toString();
    const day = date.getDate().toString().length < 2 ? '0' + date.getDate() : date.getDate().toString();
    return `${year}-${month}-${day}`;
  }

  setDay(date) {
    const day = this.getDayFormat(date);
    this.store.getItem(day).then(value => {
      this.setState({
        day: new Date(day + ' 00:00:00'),
        list: value ? value : [],
      }, () => document.getElementById('newPlan').focus());
    });
  }

  addPlan(event) {
    event.preventDefault();
    if (this.input.length > 0) {
      const list = this.state.list.slice();
      list.unshift({
        text: this.input,
        complete: false,
        created: new Date().toString(),
      });
      const date = this.getDayFormat(this.state.day);
      this.setState({
        newPlanInput: '',
        list,
      }, () => {
        this.store.setItem(date, this.state.list);
      });
    }
  }

  setPlanStatus(index, checked) {
    const list = this.state.list.slice();
    list[index].complete = checked;
    const date = this.getDayFormat(this.state.day);
    this.setState({ list }, () => this.store.setItem(date, this.state.list));
  }

  deletePlan(index) {
    const list = this.state.list.slice();
    list.splice(index, 1);
    const date = this.getDayFormat(this.state.day);
    this.setState({ list }, () => this.store.setItem(date, this.state.list));
  }
  
  render() {
    return <article className="container">
      <header className="nav nav-pills nav-fill">
        <button className={ `nav-item nav-link${this.state.view === VIEWS.LONGTERM ? ' active' : ''}` }>
          Long Term
        </button>
        <button className={ `nav-item nav-link${this.state.view === VIEWS.DAY ? ' active' : ''}` }>
          Daily
        </button>
      </header>
      <section>
        <header className="my-2 text-center">
          <DatePicker value={ this.state.day } onChange={value => this.setDay(value) } />
        </header>
        <form className="mb-2 mx-2" onSubmit={event => this.addPlan(event)}>
          <div className="form-group position-relative">
            <label for="newPlan" className="sr-only">New Plan</label>
            <input type="text" className="form-control pr-5" id="newPlan" placeholder="New Plan"
              value={ this.state.newPlanInput }
              onInput={ event => this.setState({ newPlanInput: event.target.value }) }
            />
            <button type="submit" className="btn btn-success" aria-label="Add Plan"
              style={{ position: 'absolute', top: 0, right: 0, }}
              onClick={event => this.addPlan(event)}>
              <span>+</span>
            </button>
          </div>
        </form>
        <div className="container">
          {
            this.state.list.map((plan, index) => {
              const key = plan.created;
              return (
                <article key={ key } class="mb-2 p-2 border">
                  <label for={`checkbox${key}`} className="sr-only">Mark Complete</label>
                  <input type="checkbox" id={ `checkbox${key}` } className="p-1"
                    defaultChecked={ plan.complete } onChange={event => this.setPlanStatus(index, event.target.checked)}
                  /> &nbsp;
                  <span title={`Created ${plan.created}`} className={ plan.completed ? 'text-muted' : 'font-weight-bold' }>{ plan.text }</span>
                  <button type="button" className="btn btn-danger btn-sm float-right" aria-label="Delete"
                    onClick={() => this.deletePlan(index)}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </article>
              )
            })
          }
        </div>
      </section>
    </article>;
  }
}

export default Tasks;