import '../../css/weekGrid.css'
import HoursBar from './HoursBar';
import OneDay from './OneDay';
import { useSelector } from 'react-redux';
function WeekGrid() {

  const selectDate = useSelector((state) => state.dateReducer.selectDate);

  return (
    <div className='weekGrid'>
<HoursBar/>
<OneDay date={selectDate}/>
    </div>
  )
}

export default WeekGrid