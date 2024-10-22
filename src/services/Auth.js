import Client from './api'

export const SignInUser = async (data) => {
  try {
    const res = await Client.post('/auth/signIn', data)
    // Set the current signed in users token to localStorage
    localStorage.setItem('token', res.data.token)
    console.log(res.data.user)
    return res.data.user
    
  } catch (error) {
    throw error
  }
}

export const RegisterUser = async (formData) => {
  try {
    // const formData = new FormData()
    // formData.append('image', formValues.image)
    // console.log(formData.get('image'))
    // console.log(formData)

    

    const res = await Client.post('/auth/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return res.data
  } catch (error) {
    throw error
  }
}

export const CheckSession = async () => {
  try {
    // Checks if the current token if it exists is valid
    const res = await Client.get('/auth/session')
    console.log('CHECK SESSION: ', res.data)
    return res.data
  } catch (error) {
    throw error
  }
}
