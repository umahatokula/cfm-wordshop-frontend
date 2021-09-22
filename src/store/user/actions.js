export function setUser (context, user) {
  context.commit('setUser', user)
}

export function setAccessToken (context, token) {
  context.commit('setAccessToken', token)
}

export function unSetUser (context) {
  context.commit('unSetUser')
}

export function unSetAccessToken (context) {
  context.commit('unSetAccessToken')
}
