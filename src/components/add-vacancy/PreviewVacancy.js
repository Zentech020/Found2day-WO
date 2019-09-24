import React, {Fragment} from 'react';
import checkIcon from '../../images/add-vacancy/check.svg';
import TooltipHelper from '../tooltip/tooltip';

const PreviewVacancy = ({ title, description , image, company, icon }) => (
    <div className="card v-card d-flex flex-column flex-lg-row" key={1}>
      <div className="v-card__left p-4">
        <div className="v-card__header d-flex align-items-start">
          <div className="v-card__logo">
            <img
              src={icon}
            />
          </div>
          <div className="v-card__content">
              <h2 className="ml-4 h4">{title}{` bij ${company}`}</h2>
            <div className="v-card__info d-flex ml-4">
              <div className="v-card__match">
                <span>88% Match</span>
              </div>
              <div className="ml-4 d-flex align-items-center v-card__verified">
                <span>Verified by Found2day</span>{" "}
                <img className="ml-1" src={checkIcon} />
              </div>
            </div>
            <div className="ml-4 mt-2 v-card__desc">
              <p>{description}</p>
            </div>
            <div className="mt-2 ml-4">
              <a
                href="#"
                className="btn btn-primary"
              >
                Solliciteer nu
              </a>
            </div>


            <div className="ml-4 mt-4 d-flex flex-column flex-sm-row">
              <div className="d-flex align-items-center">
              <p className="mb-0">Deviations</p>
              <TooltipHelper
                className="pl-2"
                content="When the switch is turned on, the vacancy is active and there can be applied on. Turn the switch off and the vacancy won’t be enabled."
                tooltipTarget="hideorshow"
              />
              </div>
              <div className="ml-sm-4">

                  <span className="px-4 py-2 mr-2 badge badge-pill badge-light text-danger">
                    HBO/ Bachelor
                  </span>

                </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="v-card__right"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition:'center'
        }}
      ></div>
    </div>
);

export default PreviewVacancy;
