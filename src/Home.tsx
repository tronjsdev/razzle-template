import React from 'react';
import styled from '@emotion/styled';

import logo from './react.svg';

import './Home.css';

const Title = styled.div`
  color: red;
`;

function Home() {
  return (
    <div className="Home">
      <div className="Home-header">
        <img src={logo} className="Home-logo" alt="logo" />
        <h2>Welcome to Razzles</h2>
      </div>
      <p className="Home-intro">
        To get started, edit <code>src/App.tsx</code> or <code>src/Home.tsx</code> and
        save to reload.
      </p>
      <Title>YOR Health</Title>
      <ul className="Home-resources">
        <li>
          <a href="https://github.com/jaredpalmer/razzle">Docs</a>
        </li>
        <li>
          <a href="https://github.com/jaredpalmer/razzle/issues">Issues</a>
        </li>
        <li>
          <a href="https://palmer.chat">Community Slack</a>
        </li>
      </ul>
    </div>
  );
}

export default Home;
