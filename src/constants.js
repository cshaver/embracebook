export const PROJECT_LIST_PATH = '/projects'
export const PROJECT_DETAIL_PATH = ':projectname'
export const ACCOUNT_PATH = '/account'
export const LOGIN_PATH = '/login'
export const TERMS_PATH = '/terms'

export const ACCOUNT_FORM_NAME = 'account'
export const LOGIN_FORM_NAME = 'login'
export const NEW_PROJECT_FORM_NAME = 'newProject'
export const NEW_TODO_FORM_NAME = 'newTodo'

export const formNames = {
  account: ACCOUNT_FORM_NAME,
  login: LOGIN_FORM_NAME,
  newTodo: NEW_TODO_FORM_NAME
}

export const paths = {
  account: ACCOUNT_PATH,
  projectList: PROJECT_LIST_PATH,
  projectDetail: PROJECT_DETAIL_PATH,
  login: LOGIN_PATH
}

export default { paths, formNames }
