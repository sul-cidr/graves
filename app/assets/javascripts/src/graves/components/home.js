

import React, { Component } from 'react';


export default class extends Component {


  /**
   * Render the splash screen.
   */
  render() {
    return (
      <div className="home">

        <h1 className="logo">Chinese Graves</h1>
        <p className="byline">By Tom Mullaney and CIDR</p>

        <p className="blurb">The Chinese Graves Project is a digital humanities initiative based at Stanford that examines the phenomenon of grave relocation in modern China, a campaign that has led to the exhumation and reburial of 10 million corpses in the past decade alone, and has transformed China’s graveyards into sites of acute personal, social, political, and economic contestation.</p>

      </div>
    );
  }


}
