import Sidebar from 'components/layout/Sidebar';
import Subnav from 'components/layout/Subnav';
import PageTitle from 'components/layout/PageTitle';
import Pagination from 'components/basic/Pagination';
import Modal from 'components/basic/Modal';

const Components = {
  Sidebar,
  Subnav,
  PageTitle,
  Pagination,
  Modal
};

export default function(Vue) {
  var keys = Object.keys(Components);
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    Vue.component(key.toLowerCase(), Components[key]);
  }
}
