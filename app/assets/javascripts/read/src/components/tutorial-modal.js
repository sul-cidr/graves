import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import { Button, Modal } from 'react-bootstrap';
import classNames from 'classnames';

import * as actions from '../actions/tutorial';

import Component from './component';


@connect(

  state => ({
    show: state.tutorial.showTutorialModal,
  }),

  actions

)
export default class extends Component {

  static propTypes = {
    show: PropTypes.bool.isRequired,
  };

  /**
   * Close the tutorial modal.
   */
  onHide() {
    this.props.closeTutorialModal();
    sessionStorage.setItem('tutorialModal', false);
  }

  render() {
    return (
      <div>
        <Modal
          show={this.props.show}
          onHide={this.onHide.bind(this)}
          className="tutorial-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Exploring Chinese Grave Relocation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>1. The Chinese Deathscape features an augmented narrative platform. Anytime you see an underlined passage of text, you can click on it to reposition the map to the location relevant to the narrative.</p>
            <img className="tutorial-image centered" src="/images/tutorial/underlined_text.png" />

            <p>2. At any time you can turn on or off map options by toggling the button on the top left of the map. This opens a dropdown menu featuring a variety of demographic and historic map layers. You can choose different combinations of base layers, demographic overlays, or historic overlays, and then cancel them out by clicking the gray X. Please note that, depending upon your location and zoom level in the map, not every historic map or demographic overlay will show up clearly.</p>
            <div className="flex-container-images">
              <img className="tutorial-image" src="/images/tutorial/map_options_slider.png" />
              <img className="tutorial-image" src="/images/tutorial/map_options_menus.png" />
            </div>

            <p>3. At any time you can return to the overview map by clicking on the reset sign on the top right.</p>
            <img className="tutorial-image centered" src="/images/tutorial/reset_button.png" />

            <p>4. Each grave relocation event is assigned a circle of a different diameter. The map key on the bottom left explains what these diameters mean. In certain cases, the number of relocated graves is unknown. In those cases, the relocation is assigned a smaller, dark-blue circle.</p>
            <img className="tutorial-image centered" src="/images/tutorial/grave_size_legend.png" />

            <p>5.  In addition to clicking on the text, you can interact with the map directly by clicking on the grave relocation circles. When you click on a circle, a window is opened containing further information about this relocation.</p>
            <img className="tutorial-image centered" src="/images/tutorial/single_circle.png" />

            <p>6. Because many grave relocations have taken place in geographic proximity to one another, you will often find overlapping circles. When you click on a collection of overlapping circles, the pop-up menu will include a list of “Graves Nearby,” listing other relocations in that geographic area.</p>
            <img className="tutorial-image centered" src="/images/tutorial/overlapping_circles.png" />

            <p>7. You can also navigate the dataset using the time slider, which can be turned on using the toggle in the top left of the map. There are two ways to interact with the time slider. To filter the data according to a specific time span, simply click and drag your mouse on the time slider to indicate whatever date range you wish. Once you have created a time range, you can also animate the map by clicking and dragging the time range left or right. At any time, you can adjust the start and end dates of your filter by adjusting the time slider handles.</p>
            <div className="flex-container-images">
              <img className="tutorial-image" src="/images/tutorial/time_slider.png" />
              <img className="tutorial-image" src="/images/tutorial/timeline.png" />
            </div>

            <p>8. If you would like to cite or share a specific map state (i.e., a geographic location, along with specific demographic layers, historic maps, or other features), click on the bookmark icon on the top right. When you click on this icon, the URL in your browser will update to include all relevant information of that map state. Simply highlight and copy this URL, which you can then send or cite. Anyone who navigates to that URL will find the same map state as when you clicked the citation icon.</p>
            <img className="tutorial-image centered" src="/images/tutorial/bookmark_button.png" />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.onHide.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
