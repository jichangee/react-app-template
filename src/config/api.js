console.log('REACT_APP_ENV', process.env.REACT_APP_ENV)

const host =
  process.env.REACT_APP_ENV === 'prod'
    ? '//example.com' // prod
    : process.env.REACT_APP_ENV === 'preprod'
    ? '//example.com' // preprod
    : process.env.REACT_APP_ENV === 'test'
    ? '//example.com' // test
    : '//example.com' // dev 线上

export const BASE_URL = `${host}/api`
