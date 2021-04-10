export interface Route {
  path: string
  wrapper?: string
  redirect?: string
  component?: string
  menu?: {
    name: string
    icon: string
  }
  layout?: {
    hideNav?: boolean
    hideFooter?: boolean
  }
  routes?: Route[]
  default?: boolean
}

function parsePath(path: string) {
  if (typeof path !== 'string') {
    throw new Error(`Should input a path string, got ${path}`)
  }
  if (path[0] === '@' && path[1] === '/') {
    return path.replace('@/', '../') + '/index.ts'
  }
  return path + '/index.ts'
}
function createRoutes(routes: Route[]): Route[] {
  return routes.map((route) => {
    const _route = { ...route }
    if (_route.wrapper) {
      _route.wrapper = parsePath(_route.wrapper)
    }
    if (_route.component) {
      _route.component = parsePath(_route.component)
    }
    if (_route.routes) {
      _route.routes = createRoutes(_route.routes)
    }
    return _route
  })
}

const routes: Route[] = [
  {
    path: '/',
    wrapper: '@/components/renders/Auth',
    redirect: '/issue',
  },
  {
    path: '/getting-started',
    component: '@/pages/getting-started',
  },
  {
    path: '/issue',
    component: '@/pages/issue',
    wrapper: '@/components/renders/Auth',
    // layout
    menu: {
      name: '问题',
      icon: 'icon-ohbug-error-warning-line',
    },
    routes: [
      {
        path: '/issue/:issue_id/event/:event_id',
        component: '@/pages/event',
        wrapper: '@/components/renders/Auth',
      },
    ],
  },
  {
    path: '/event/:target',
    component: '@/pages/event',
    wrapper: '@/components/renders/Auth',
  },
  {
    path: '/settings',
    component: '@/pages/settings',
    wrapper: '@/components/renders/Auth',
    redirect: '/settings/notification_rules',
    // layout
    menu: {
      name: '设置',
      icon: 'icon-ohbug-settings-3-line',
    },
    routes: [
      {
        path: 'notification_rules',
        component: '@/pages/settings/Notification/Rules',
      },
      {
        path: 'notification_setting',
        component: '@/pages/settings/Notification/Setting',
      },
      {
        path: 'sourcemap',
        component: '@/pages/settings/SourceMap',
      },
    ],
  },
  {
    default: true,
    path: '/404',
    component: '@/pages/not-found',
    layout: {
      hideNav: true,
      hideFooter: true,
    },
  },
  {
    path: '/403',
    component: '@/pages/not-authorized',
    layout: {
      hideNav: true,
      hideFooter: true,
    },
  },
]

export default createRoutes(routes)
