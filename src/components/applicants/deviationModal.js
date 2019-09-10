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
  render() {
    const {deviations} = this.props;
    let counter = 6;

      if(!deviations[0].jobTitle) {
          counter--;
      }
      if(!deviations[0].branch) {
          counter--;
      }
      if(!deviations[0].education) {
          counter--;
      }
      if(!deviations[0].experience) {
          counter--;
      }
      if(!deviations[0].employementType) {
          counter--;
      }
      if(!deviations[0].weekHours) {
          counter--;
      }
      console.log(counter);
      var percentage = parseInt((100 * counter) / 6);
      console.log(percentage);
    return (
      <div className="d-flex">
         <CircularProgressbar value={percentage} text={`${percentage}%`} />
          {!deviations[0].jobTitle ?
            (
            <div>
            <TooltipHelper
                className="ml-2"
                icon="pie_chart"
                tooltipTarget="jobTitle"
                content="Job title"
                hasButton={true}
              />
            </div>
            )
          : null}
          {!deviations[0].branch ? (<div>
            <TooltipHelper
                className="ml-2"
                icon="pie_chart"
                tooltipTarget="branch"
                content="Branch"
                hasButton={true}
              />
            </div>
            ) : null}
          {!deviations[0].education ? (
            <div>
              <TooltipHelper
                className="ml-2"
                icon="school"
                tooltipTarget="education"
                content="Education"
                hasButton={true}
              />
            </div>
            ) : null}
          {!deviations[0].experience ? (
          <div>
              <TooltipHelper
                className="ml-2"
                icon="format_list_bulleted"
                tooltipTarget="expierence"
                content="Experience"
                hasButton={true}
              />
            </div>
            ) : null}
            {!deviations[0].employementType ? (
            <div>
              <TooltipHelper
                className="ml-2"
                icon="description"
                tooltipTarget="employementType"
                content="Employement type"
                hasButton={true}
              />
            </div>
            ) : null}

          {!deviations[0].weekHours ? (
          <div>
              <TooltipHelper
                className="ml-2"
                icon="calendar_today"
                tooltipTarget="weekHours"
                content="Week hours"
                hasButton={true}
              />
            </div>
            ): null}

        </div>
    )
  }
}


export default DeviationModal;
