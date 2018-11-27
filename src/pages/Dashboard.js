import React from 'react';

const Header = () => (
  <div className="header">
    <div className="header__container">
      <div className="header__row">
        <div className="header__title">withmoney</div>
        <div className="menu-user">
          <div className="menu-user__name">David Costa</div>
          <img className="menu-user__avatar" src="/static/img/avatar.jpg" alt="avatar" />
        </div>
      </div>
    </div>
  </div>
);

const Content = () => (
  <div className="page-content">
    content
  </div>
);

const Dashboard = () => (
  <div>
    <Header />
    <Content />
  </div>
);

export default Dashboard;
