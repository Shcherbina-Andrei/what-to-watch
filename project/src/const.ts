export enum AppRoute {
  Root = '/',
  Login = '/login',
  MyList = '/myList',
  Player = '/player/:id',
  AddReview = 'review',
  Films = 'films',
  Film = ':id'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}
