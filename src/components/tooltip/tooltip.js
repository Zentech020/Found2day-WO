import React from "react";
import PropTypes from "prop-types";
import {Tooltip} from "shards-react";


class TooltipHelper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  render() {
    const { content, toggle, open, className, tooltipTarget } = this.props;
    return (
      <div className={className}>
        <i id={tooltipTarget} className="material-icons">info</i>{' '}
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
};

TooltipHelper.defaultProps = {
  content: "This is an tooltip helper",
  className:"",
  tooltipTarget:"",
  open:false,

};

export default TooltipHelper;
