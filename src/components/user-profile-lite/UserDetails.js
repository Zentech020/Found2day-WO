import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  Button,
} from 'shards-react';
import Circle from '../Animations/Circle';

const UserDetails = function({ account, inviteMember, management, uploadPhoto,uploadIcon, isAdmin, isLoading , isPersonal}) {
  return (
    <Card small className="mb-4 pt-3">
      <CardHeader className="border-bottom text-center">
        <div className="mb-1 mx-auto d-flex flex-column align-items-center">
          {isLoading ? (
            <Circle/>
          ) : (
            <div style={{borderRadius:'50%',height:'125px',width:'125px',backgroundSize:'cover', backgroundPosition:'center', backgroundImage:`url(${isPersonal ? account.photo : account.icon})`}} />
          )}
          {isPersonal ?
            (
            <label style={{textDecoration:'underline', cursor:'pointer'}}>Change avatar
              <input className="d-none" type="file" onChange={uploadPhoto} />
            </label>)
           : (
            <label style={{textDecoration:'underline', cursor:'pointer'}}>{isAdmin ? 'Change avatar' : null}
              <input className="d-none" type="file" onChange={isAdmin ? uploadIcon : uploadPhoto} />
            </label>
           )}


        </div>
        <h4 className="mb-0">{isAdmin ? account.title : account.name}</h4>
        <span className="text-muted d-block mb-2">{account.jobTitle}</span>
        {isAdmin ? (
          <Fragment>
            <Button pill outline size="sm" className="mb-2 mx-1" onClick={inviteMember}>
              <i className="material-icons mr-1">person_add</i> Invite memmber
            </Button>
            <Button pill size="sm" className="mb-2 mx-1" onClick={management}>
              <i className="material-icons mr-1">settings</i> Admin managment
            </Button>
          </Fragment>
        )
        : (null) }
      </CardHeader>
    </Card>
  );
};

UserDetails.propTypes = {
  account: PropTypes.object,
  inviteMember: PropTypes.func,
  management: PropTypes.func,
  uploadPhoto: PropTypes.func,
  uploadIcon: PropTypes.func,
  avatar:PropTypes.String,
  isAdmin:PropTypes.bool,
  isLoading:PropTypes.bool,
  isPersonal:PropTypes.bool
};

UserDetails.defaultProps = {
  account: {
    name: 'Sierra Brooks',
    photo:'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
    avatar: require('./../../images/avatars/0.jpg'),
    jobTitle: 'Project Manager',
    performanceReportTitle: 'Workload',
    performanceReportValue: 74,
    metaTitle: 'Description',
    metaValue:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?'
  }
};

export default UserDetails;
