import EmployeeInfo from '../../EmployeeInfo/EmployeeInfo'
import './Profile.css'

export default function Profile() {
  return (
    <div className='profile'>
      <h2 className='profile__title'>ИПР сотрудников</h2>
      <EmployeeInfo />
    </div>
  )
}
