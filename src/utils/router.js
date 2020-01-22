import path from 'path';
import { isExternal } from '@/utils/validate';

export function filterRoutes(routes, root = '/') {
  return routes.reduce((pre, cur) => {
    if (cur.hidden) return pre;
    if (!cur.name) {
      if (!cur.redirect) return pre;
      return pre.concat(filterRoutes(cur.children, path.resolve(root, cur.path)));
    }
    const target = Object.assign({}, cur);
    if (!isExternal(target.path)) target.path = path.resolve(root, target.path);
    if (cur.children) {
      target.children = filterRoutes(cur.children, target.path);
    }
    pre.push(target);
    return pre;
  }, []);
}

export default {};