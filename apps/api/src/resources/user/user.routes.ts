import { routeUtil } from 'utils';

import remove from './actions/remove';
import update from './actions/update';

const publicRoutes = routeUtil.getRoutes([]);

const privateRoutes = routeUtil.getRoutes([]);

const adminRoutes = routeUtil.getRoutes([update, remove]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
