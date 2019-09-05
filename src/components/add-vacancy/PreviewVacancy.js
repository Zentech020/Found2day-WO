import React, {Fragment} from 'react';
import checkIcon from '../../images/add-vacancy/check.svg';

const PreviewVacancy = ({ title, description , image, company, icon }) => (
  <Fragment>
    <div class="card v-card d-flex flex-row" style={{height:'22rem'}}>
    <div className="v-card__left p-4" style={{flex:2}}>
      <div className="v-card__header d-flex align-items-start">
        <div className="v-card__logo">
          <img src={icon} alt="icon" />
        </div>
        <div className="v-card__content">
        <h2 className="ml-4 h4">{title} bij <b>{company}</b></h2>
        <div class="v-card__info d-flex ml-4">
          <div className="v-card__match">
            <p>90% Match</p>
            </div>
          <div className="ml-4 d-flex align-items-center v-card__verified"><p>Verified by Found2day</p> <img className="ml-1" src={checkIcon} alt="check"/></div>
        </div>
        <div className="ml-4 mt-2 v-card__desc">
          <p>{description}</p>
        </div>
        <div className="ml-4 mt-4 d-flex">
          <span class="px-4 py-2 mr-2 badge badge-pill badge-light">32-20 Uur</span>
          <span class="px-4 py-2 ml-2 badge badge-pill badge-light">Bij werkgever</span>
          <span class="px-4 py-2 ml-2 badge badge-pill badge-light">HBO/Bachelor</span>
        </div>
        </div>
      </div>
    </div>
    <div className="v-card__right" style={{flex:1,backgroundImage:`url(${image})`, backgroundSize:'cover', backgroundPosition:'center'}}></div>
    </div>
</Fragment>
);

export default PreviewVacancy;
