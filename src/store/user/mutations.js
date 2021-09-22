export function setUser (state, user) {
  state.user = user
}

export function setAccessToken (state, token) {
  state.token = token
}

export function unSetUser (state) {
  state.user = {}
}

export function unSetAccessToken (state) {
  state.token = ''
}
