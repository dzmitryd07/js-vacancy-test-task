import { routeUtil } from 'utils';

import create from './actions/create';
import list from './actions/list';
import remove from './actions/remove';
import uploadPhoto from './actions/upload-photo';

const publicRoutes = routeUtil.getRoutes([]);

const privateRoutes = routeUtil.getRoutes([create, remove, list, uploadPhoto]);

const adminRoutes = routeUtil.getRoutes([create, list, remove]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
