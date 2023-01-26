export enum AppRoute {
  Root = '/',
  Login = '/login',
  MyList = '/myList',
  Player = '/player/:id',
  AddReview = 'review',
  Films = 'films',
  Film = ':id',
  NotFound = '*'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum Tabs {
  Overview = 'overview',
  Details = 'details',
  Reviews = 'reviews'
}

export enum APIRoutes {
  Films = '/films',
  Login = '/login',
  Logout = '/logout'
}

export const Ratings = ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1', '0'];

