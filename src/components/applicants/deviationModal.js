import React, {Fragment} from 'react';
import {Tooltip, Button} from 'shards-react';

const DeviationModal = ({ deviations }) => (
<Fragment>
  {!deviations[0].jobTitle ? (<div>Jobtitle</div>) : null}
  {!deviations[0].branch ? (<div>branch</div>) : null}
  {!deviations[0].education ? (<div>education</div>) : null}
  {!deviations[0].experience ? (<div>experience</div>) : null}
  {!deviations[0].weekHours ? (<div>weekHours</div>) : null}
    <h1>Deviations</h1>
    <Fragment>

    </Fragment>
  </Fragment>
);

export default DeviationModal;
