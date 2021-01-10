const setDomain = (cf, accountId) => async (domainName) => {
  const { success, result: domainResult } = await cf.zones.add({
    name: domainName,
    account: {
      id: accountId,
    },
    type: 'full',
  })
  if (!success) {
    throw new Error('Failed Request')
  }
  return domainResult
}

const checkDomain = (cf) => async (zoneId) => {
  const {
    result: { status: preListStatus, paused: preListPaused },
  } = await cf.zones.read(zoneId)
  const checkResult = {
    active: preListStatus === 'active',
    paused: preListPaused,
  }

  if (checkResult.active) {
    return checkResult
  }

  const { success: activationSuccess } = await cf.zones
    .activationCheck(zoneId)
    .catch(() => ({ success: false }))

  if (activationSuccess) {
    const {
      result: { status: postListStatus, paused: postListPaused },
    } = await cf.zones.read(zoneId)
    checkResult.active = postListStatus === 'active'
    checkResult.paused = postListPaused
  } else {
    checkResult.active = false
  }
  return checkResult
}

const dnsDomain = (cf) => async (
  zoneId,
  { type = 'A', name, content, ttl = 1, proxied = true } = {}
) => {
  const { success, result: dnsResult } = await cf.dnsRecords.add(zoneId, {
    type,
    name,
    content,
    ttl,
    proxied,
  })
  if (!success) {
    throw new Error('Failed Request')
  }
  return dnsResult
}

const deleteDomain = (cf) => async (zoneId) => {
  const { success, result: domainResult } = await cf.zones.del(zoneId)
  if (!success) {
    throw new Error('Failed Request')
  }
  return domainResult
}

module.exports = (cf, accountId) => ({
  setDomain: setDomain(cf, accountId),
  checkDomain: checkDomain(cf),
  dnsDomain: dnsDomain(cf),
  deleteDomain: deleteDomain(cf),
})
