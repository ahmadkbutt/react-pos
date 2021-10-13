import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

const CategoriesList = React.lazy(() => import('./views/pages/categories/list'));
const AddCategory = React.lazy(() => import('./views/pages/categories/add'));
const EditCategory = React.lazy(() => import('./views/pages/categories/edit'));

const ProductsList = React.lazy(() => import('./views/pages/products/list'));
const AddProduct = React.lazy(() => import('./views/pages/products/add'));
const EditProduct = React.lazy(() => import('./views/pages/products/edit'));

const CustomersList = React.lazy(() => import('./views/pages/customers/list'));
const AddCustomer = React.lazy(() => import('./views/pages/customers/add'));
const EditCustomer = React.lazy(() => import('./views/pages/customers/edit'));

const SalesList = React.lazy(() => import('./views/pages/sales/list'));
const AddSale = React.lazy(() => import('./views/pages/sales/add'));
const EditSale = React.lazy(() => import('./views/pages/sales/edit'));
const ViewSale = React.lazy(() => import('./views/pages/sales/view'));

const LedgerReport = React.lazy(() => import('./views/pages/reports/LedgerReport/ledgerReport'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/categories', name: 'Categories', component: CategoriesList, exact: true },
  { path: '/categories/add', name: 'Add', component: AddCategory, exact: true },
  { path: '/categories/:id/edit', name: 'Edit', component: EditCategory, exact: true },
  { path: '/products', name: 'Products', component: ProductsList, exact: true },
  { path: '/products/add', name: 'Add', component: AddProduct, exact: true },
  { path: '/products/:id/edit', name: 'Edit', component: EditProduct, exact: true },
  { path: '/customers', name: 'Customers', component: CustomersList, exact: true },
  { path: '/customers/add', name: 'Add', component: AddCustomer, exact: true },
  { path: '/customers/:id/edit', name: 'Edit', component: EditCustomer, exact: true },
  { path: '/sales', name: 'Sales', component: SalesList, exact: true },
  { path: '/sales/add', name: 'Add', component: AddSale, exact: true },
  { path: '/sales/:id/edit', name: 'Edit', component: EditSale, exact: true },
  { path: '/sales/:id/view', name: 'View', component: ViewSale, exact: true },
  { path: '/reports/ledger', name: 'Ledger Report', component: LedgerReport, exact: true },
];

export default routes;
