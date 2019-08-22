import React, {Component} from 'react';

import SideMenu from './SideMenu';

import { Drawer, Container } from 'native-base';
export default class DrawerNative extends Component {
  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };

  render() {
    return (
        <Drawer
          ref={(ref) => { this.drawer = ref; }}
          content={<SideMenu />}
          onClose={() => this.closeDrawer()} >
        </Drawer>
    );
  }
}
