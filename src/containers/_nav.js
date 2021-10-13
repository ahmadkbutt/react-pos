const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Categories',
    route: '/categories',
    icon: 'cil-list',
    to: '/categories'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Products',
    route: '/products',
    icon: 'cil-spreadsheet',
    to: '/products'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Customers',
    route: '/customers',
    icon: 'cil-user',
    to: '/customers'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Sales',
    route: '/sales',
    icon: 'cil-spreadsheet',
    to: '/sales'
  },{
    _tag: 'CSidebarNavDropdown',
    name: 'Reports',
    icon: 'cil-file',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Ledger',
        to: '/reports/ledger',
      },
    ],
  },
]

export default _nav
