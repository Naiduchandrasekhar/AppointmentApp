// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem/index'
import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    date: '',
    appointmentArray: [],
    isFilterActive: false,
  }

  onAddSubmitValue = event => {
    event.preventDefault()
    const {titleInput, date} = this.state
    const formatDate = date ? format(new Date(date), 'dd MMMM yyyy, EEEE') : ''
    const newAppointmentObject = {
      id: uuidv4(),
      title: titleInput,
      date: formatDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentArray: [...prevState.appointmentArray, newAppointmentObject],
      titleInput: '',
      date: '',
    }))
  }

  onStarClick = id => {
    this.setState(prevState => ({
      appointmentArray: prevState.appointmentArray.map(eachOne => {
        if (eachOne.id === id) {
          return {...eachOne, isStarred: !eachOne.isStarred}
        }
        return eachOne
      }),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state

    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  onInputValue = event => {
    this.setState({titleInput: event.target.value})
  }

  onDateValue = event => {
    this.setState({date: event.target.value})
  }

  getFilteredAppointmentList = () => {
    const {appointmentArray, isFilterActive} = this.state
    if (isFilterActive) {
      return appointmentArray.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentArray
  }

  render() {
    const {titleInput, date, isFilterActive} = this.state
    const classFilterBtn = isFilterActive ? 'active' : 'not-active'
    const filterArray = this.getFilteredAppointmentList()
    return (
      <div className="bg-container">
        <div className="main-container">
          <div className="card-container">
            <div>
              <h1 className="heading">Add Appointment</h1>
              <form onSubmit={this.onAddSubmitValue}>
                <label className="label">
                  TITLE
                  <br />
                  <input
                    type="text"
                    className="textInput"
                    onChange={this.onInputValue}
                    placeholder="Title"
                    value={titleInput}
                  />
                </label>
                <br />
                <label className="label">
                  DATE
                  <br />
                  <input
                    type="date"
                    className="textInput"
                    onChange={this.onDateValue}
                    value={date}
                  />
                </label>
                <br />
                <button className="addButton" type="submit">
                  Add
                </button>
              </form>
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="image"
              />
            </div>
          </div>
          <hr />
          <div className="second-container">
            <div className="appointmentContainer">
              <h1 className="Appointments">Appointments</h1>
              <button
                className={`StarredBtn ${classFilterBtn}`}
                type="button"
                onClick={this.onFilter}
              >
                Starred
              </button>
            </div>
            <ul className="unorderList">
              {filterArray.map(eachList => (
                <AppointmentItem
                  key={eachList.id}
                  eachList={eachList}
                  onStarClick={this.onStarClick}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
