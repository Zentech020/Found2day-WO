import React, {Fragment} from 'react';
import {Tooltip, Button} from 'shards-react';

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
      <div className="d-flex justify-content-center">
          {!deviations[0].jobTitle ?
            (<div>
              <Button id="jobTitle" className="mr-2">
               Job title
              </Button>
              <Tooltip
                open={this.state.top}
                target="#jobTitle"
                toggle={() => this.setState({open:!this.state.open})}
              >
              {deviations[0].jobTitle}
              </Tooltip>
            </div>
            )
          : null}
          {!deviations[0].branch ? (<div>
              <Button id="jobTitle" className="mr-2">
                Branch
              </Button>
              <Tooltip
                open={this.state.top}
                target="#jobTitle"
                toggle={() => this.setState({open:!this.state.open})}
              >
              <i className="material-icons">pie_chart</i>{' '}
              </Tooltip>
            </div>
            ) : null}
          {!deviations[0].education ? (<div>
              <Button id="jobTitle" className="mr-2">
                <i className="material-icons">school</i>{' '}
              </Button>
              <Tooltip
                open={this.state.top}
                target="#jobTitle"
                toggle={() => this.setState({open:!this.state.open})}
              >
                Education
              </Tooltip>
            </div>
            ) : null}
          {!deviations[0].experience ? (<div>
              <Button id="jobTitle" className="mr-2">
                <i className="material-icons">format_list_bulleted</i>
              </Button>
              <Tooltip
                open={this.state.top}
                target="#jobTitle"
                toggle={() => this.setState({open:!this.state.open})}
              >
                Experience
              </Tooltip>
            </div>
            ) : null}
            {!deviations[0].employementType ? (<div>
              <Button id="jobTitle" className="mr-2">
                <i className="material-icons">description</i>
              </Button>
              <Tooltip
                open={this.state.top}
                target="#jobTitle"
                toggle={() => this.setState({open:!this.state.open})}
              >
                Employement Type
              </Tooltip>
            </div>
            ) : null}

          {!deviations[0].weekHours ? (<div>
              <Button id="jobTitle" className="mr-2">
                <i className="material-icons">calendar_today</i>
              </Button>
              <Tooltip
                open={this.state.top}
                target="#jobTitle"
                toggle={() => this.setState({open:!this.state.open})}
              >
              {deviations[0].weekHours}
              </Tooltip>
            </div>
            ): null}
        </div>
    )
  }
}


export default DeviationModal;
