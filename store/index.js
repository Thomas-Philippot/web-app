export const state = () => ({
  user: {}
})

export const mutations = {
  registerUser (state, user) {
    state.user = user
  }
}
