import Sidebar from 'components/layout/Sidebar';
import Subnav from 'components/layout/Subnav';
import PageTitle from 'components/layout/PageTitle';
import Modal from 'components/basic/Modal';
import DSwitch from 'components/basic/DSwitch';
import tabsimage from 'components/forms/TabsImageUpload';
import Datepicker from 'components/forms/Datepicker';
import Tip from 'components/basic/Tip';

const Components = {
  Sidebar,
  Subnav,
  PageTitle,
  Datepicker,
  tabsimage,
  Modal,
  Tip,
  DSwitch
};

export default function(Vue) {
  var keys = Object.keys(Components);
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    Vue.component(key.toLowerCase(), Components[key]);
  }
}
