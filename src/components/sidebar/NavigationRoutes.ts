export interface INavigationRoute {
  name: string
  displayName: string
  meta: { icon: string }
  children?: INavigationRoute[]
}

export default {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home',
  },
  routes: [
    {
      name: 'dashboard',
      displayName: 'Dashboard',
      meta: {
        icon: 'vuestic-iconset-dashboard',
      },
    },
    {
      name: 'luggage-types',
      displayName: 'Luggages Type',
      meta: {
        icon: 'luggage',
      },
    },
    {
      name: 'colors',
      displayName: 'Colors',
      meta: {
        icon: 'folder_shared',
      },
    },
     {
      name: 'driver',
      displayName: 'Drivers',
      meta: {
        icon: 'folder_shared',
      },
    },
  ] as INavigationRoute[],
}
