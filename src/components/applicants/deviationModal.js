import React, {Fragment} from 'react';
import TooltipHelper from '../tooltip/tooltip';
class DeviationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      open:false,
    }
  }
  render() {
    const {deviations} = this.props;
    return (
      <div className="d-flex justify-content-center mx-auto">
          {!deviations[0].jobTitle ?
            (<div>
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
