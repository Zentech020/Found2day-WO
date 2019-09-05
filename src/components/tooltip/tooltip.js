import React from "react";
import PropTypes from "prop-types";
import {Tooltip, Button} from "shards-react";



class TooltipHelper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  render() {
    const { content, className, tooltipTarget, icon, hasButton } = this.props;
    return (
      <div className={className}>
        {hasButton ?  (
        <Button id={tooltipTarget} className="mr-2">
          <i className="material-icons">{icon}</i>
        </Button>
        ) : (
           <i id={tooltipTarget} className="material-icons">{icon}</i>
        ) }
        <Tooltip
          open={this.state.open}
          target={`#${tooltipTarget}`}
          toggle={() => this.setState({open:!this.state.open})}
        >
           {content}
        </Tooltip>
      </div>
    );
  }
}

TooltipHelper.propTypes = {
  content: PropTypes.string,
  toggle:PropTypes.func,
  open:PropTypes.bool,
  className:PropTypes.string,
  hasButton:PropTypes.bool
};

TooltipHelper.defaultProps = {
  content: "This is an tooltip helper",
  className:"",
  tooltipTarget:"",
  open:false,
  icon:'info',
  hasButton:false
};

export default TooltipHelper;
