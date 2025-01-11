export enum QueryParts {
  ORGANIZATIONS = 'organizations',
  USERS = 'users',
  COMMENTS = 'comments',
  ARTICLES = 'articles'
}

export const queryKeys = {
  getOrganizations: () => [QueryParts.ORGANIZATIONS],
  getOrganization: (id: number | undefined) => [QueryParts.ORGANIZATIONS, id],

  getUsers: () => [QueryParts.USERS],
  getUser: (id: number | undefined) => [QueryParts.USERS, id],

  getArticles: () => [QueryParts.ARTICLES],
  getArticle: (id: number | undefined) => [QueryParts.ARTICLES, id],

  getComments: () => [QueryParts.COMMENTS],
  getComment: (id: number | undefined) => [QueryParts.COMMENTS, id],
};