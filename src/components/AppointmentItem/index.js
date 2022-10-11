// Write your code here

import './index.css'

const AppointmentItem = props => {
  const {eachList, onStarClick} = props
  const {id, title, date, isStarred} = eachList

  const resultImage = isStarred ? (
    <img
      src="https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
      alt="star"
    />
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png"
      alt="star"
    />
  )

  const onClickStar = () => {
    onStarClick(id)
  }

  return (
    <li className="listItem">
      <div className="titleImg">
        <p className="title">{title}</p>
        <button type="button" testid="star" onClick={onClickStar}>
          {resultImage}
        </button>
      </div>
      <p className="formatDate">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
