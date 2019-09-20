import React, {} from 'react';
import TooltipHelper from '../tooltip/tooltip';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

class DeviationModal extends React.Component {
  constructor(props) {
    super(props);

      this.state= {
        open:false,
      }
  }

  componentDidMount = async () => {

    const {deviations} = this.props;
    console.log('from cdm',deviations)

    if (deviations) {
      let counter = 6;
      if(!deviations.jobTitle.isDeviated) {
          counter--;
      }
      if(!deviations.branch.isDeviated) {
          counter--;
      }
      if(!deviations.education.isDeviated) {
          counter--;
      }
      if(!deviations.experience.isDeviated) {
          counter--;
      }
      if(!deviations.employmentType.isDeviated) {
          counter--;
      }
      if(!deviations.weekHours.isDeviated) {
          counter--;
      }
      var percentage = parseInt((100 * counter) / 6);
      console.log(percentage);

      this.setState({percentage})
    }
  }

  render() {
    const {deviations} = this.props;
    console.log(deviations);
    const Table = () => (
      <table class="table pr-4">
      <tbody>
      <tr>
        <td>Job title</td>
        <td style={deviations.jobTitle.isDeviated ? { color:'green'} : {color : 'red'} }>
          {deviations.jobTitle.title}
        </td>
      </tr>

      <tr>
        <td>Branch</td>
        <td style={ deviations.branch.isDeviated ? { color:'green'} : {color : 'red'} }>
          {deviations.branch.title}
        </td>
      </tr>

      <tr>
        <td>Education</td>
        <td style={deviations.education.isDeviated ? { color:'green'} : {color : 'red'} }>
            {deviations.education.title}
        </td>
      </tr>

      <tr>
        <td>Experience</td>
        <td style={deviations.experience.isDeviated ? { color:'green'} : {color : 'red'} }>
            {deviations.experience.title}
        </td>
      </tr>

      <tr>
        <td>Employment type</td>
        <td style={deviations.employmentType.isDeviated ? { color:'green'} : {color : 'red'} }>
            {deviations.employmentType.title}
        </td>
      </tr>

      <tr>
        <td>Weekhours</td>
        <td style={ deviations.weekHours.isDeviated ? { color:'green'} : {color : 'red'} }>
            {deviations.weekHours.title}
        </td>
      </tr>
      </tbody>
    </table>
    )
    return (
      <div className="d-flex">
        {deviations ? <Table/> : null}
         <CircularProgressbar className="w-25 pl-4" value={this.state.percentage} text={`${this.state.percentage}%`} />
        </div>
    )
  }
}


export default DeviationModal;
