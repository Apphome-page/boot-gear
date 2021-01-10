const fetch = require('cross-fetch')

// PABBLY APIs
const PABBLY_API_CREATE_CUSTOMER = (auth) => async (displayName, email) => {
  let resBody = {}
  const response = await fetch('https://payments.pabbly.com/api/v1/customer', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: auth,
    },
    body: JSON.stringify({
      first_name: 'User',
      last_name: displayName,
      email_id: email,
    }),
  })
  resBody = await response.json()
  if (response.status >= 400 || resBody.status === 'error') {
    throw new Error(
      `Something Went Wrong.${resBody}` && resBody.message
        ? ` ${resBody.message}`
        : ''
    )
  }
  return resBody
}

const PABBLY_API_GET_CUSTOMER_PLANS = (auth) => async (customerId) => {
  let resBody = {}
  if (!customerId) {
    throw new Error('No customerId')
  }
  const response = await fetch(
    `https://payments.pabbly.com/api/v1/subscriptions/${customerId}`,
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: auth,
      },
    }
  )
  resBody = await response.json()
  if (response.status >= 400 || resBody.status === 'error') {
    throw new Error(
      `Something Went Wrong.${resBody}` && resBody.message
        ? ` ${resBody.message}`
        : ''
    )
  }
  return resBody
}

const PABBLY_API_UPDATE_CUSTOMER = (auth) => async (
  customerId,
  customerDetails = {}
) => {
  const response = await fetch(
    `https://payments.pabbly.com/api/v1/customer/${customerId}`,
    {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: auth,
      },
      body: JSON.stringify(customerDetails),
    }
  )
  resBody = await response.json()
  if (response.status >= 400 || resBody.status === 'error') {
    throw new Error(
      `Something Went Wrong.${resBody}` && resBody.message
        ? ` ${resBody.message}`
        : ''
    )
  }
  return resBody
}

const PABBLY_API_VERIFYHOSTED = (auth) => async (hostedpage) => {
  const response = await fetch(
    'https://payments.pabbly.com/api/v1/verifyhosted',
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: auth,
      },
      body: JSON.stringify({
        hostedpage,
      }),
    }
  )
  const resBody = await response.json()
  if (response.status >= 400) {
    throw new Error('Something Went Wrong.')
  }
  return resBody
}

module.exports = ({ auth } = {}) => ({
  PABBLY_API_CREATE_CUSTOMER: PABBLY_API_CREATE_CUSTOMER(auth),
  PABBLY_API_GET_CUSTOMER_PLANS: PABBLY_API_GET_CUSTOMER_PLANS(auth),
  PABBLY_API_UPDATE_CUSTOMER: PABBLY_API_UPDATE_CUSTOMER(auth),
  PABBLY_API_VERIFYHOSTED: PABBLY_API_VERIFYHOSTED(auth),
})
