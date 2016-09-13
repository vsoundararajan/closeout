import 'react-date-picker/index.css';

import { DateField, Calendar } from 'react-date-picker';

const onChange = (dateString, { dateMoment, timestamp }) => {
  console.log(dateString)
}

let date = '2017-04-24';


ReactDOM.render(
    <Calendar dateFormat="YYYY-MM-DD"
  date={date}
  onChange={onChange} />,
    document.getElementById('content')
);

