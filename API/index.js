import apisauce from 'apisauce'

let url = 'http://1.179.246.242:8080/api/v1'

const create = (baseURL = url) => {
  const api = apisauce.create({
    baseURL,
    timeout: 100000
  })

  const login = (data) => api.post('/auth/signin', data)
  const signup = (data) => api.post('/auth/signup', data)
  const getProfile = (id) => api.get('/member/'+id)

  const getStatus = () => api.get('/status')
  const getUserLogin = () => api.get('/user/me')
  const updateUser = (data) => api.put('/user/me',data)
  const changePass = (data) => api.post('/user/password/change',data)

  const getMemberPay = (id) => api.get('/member_pay?sort=YPay&where=(member_id,like,'+id+')')
  const getMemberPayTwo = () => api.get('/member_pay_2?limit=2000')

  const getNumPay = () => api.get('/numpay_years?limit=2000')

  return {
    login,
    signup,
    getProfile,
    getStatus,
    getUserLogin,
    updateUser,
    changePass,
    getMemberPay,
    getMemberPayTwo,
    getNumPay,
  }
}

export default {
  create
}