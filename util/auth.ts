import router from 'next/router'
import Cookies from 'js-cookie'
import cookie from 'cookie'

export const isLoggedIn = () => {
  // if we don't have request cookies, get the cookie from client
  return !!Cookies.get('isUserLoggedIn');
}

export const logIn = () => {
  Cookies.set('isUserLoggedIn', 'true', {expires: 86400, sameSite: 'lax'})

  router.push('/')
}

export const logOut = () => {
  if (typeof window !== 'undefined') {
    // remove logged in user's cookie and redirect to login page
    Cookies.remove('isUserLoggedIn', {expires: 86400, sameSite: 'lax'})

    router.push('/login')
  }
}
