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
  // domainResult.id
  await cf.zoneSettings.edit(domainResult.id, 'automatic_https_rewrites', {
    value: 'on',
  })
  return domainResult
}

const checkDomain = (cf) => async (zoneId) => {
  const {
    result: {
      id: preListId,
      status: preListStatus,
      paused: preListPaused,
      name: preListHost,
      name_servers: preListNameServers,
    },
  } = await cf.zones.read(zoneId)
  if (!preListId) {
    return null
  }
  const checkResult = {
    active: preListStatus === 'active',
    paused: preListPaused,
    host: preListHost,
    ns: preListNameServers,
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
  // Remove existing Entry
  const { result: existingDNS } = await cf.dnsRecords.browse(zoneId)
  const { id: existingDNSId } =
    existingDNS.find(
      ({ type: eZType, name: eZName, content: eZContent }) =>
        eZType === type &&
        eZContent === content &&
        (name === '@' || eZName === name)
    ) || {}
  if (existingDNSId) {
    await cf.dnsRecords.del(zoneId, existingDNSId)
  }
  // Add new Entry
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
  const domainExists = await cf.zones
    .read(zoneId)
    .then(({ result: { id } }) => !!id)
    .catch((e) => false)
  if (!domainExists) {
    return {}
  }
  const { success, result: domainResult } = await cf.zones.del(zoneId)
  if (!success) {
    throw new Error('Failed Request')
  }
  return domainResult
}

const deleteDomainName = (cf) => async (domainName) => {
  const { result } = await cf.zones.browse({ name: domainName })
  return (result.find(({ name }) => name === domainName) || {}).id
}

const purgeDomain = (cf) => async (zoneId) => {
  const purgeResult = await cf.zones.purgeCache(zoneId)
  return purgeResult
}

module.exports = (cf, accountId) => ({
  setDomain: setDomain(cf, accountId),
  checkDomain: checkDomain(cf),
  dnsDomain: dnsDomain(cf),
  deleteDomain: deleteDomain(cf),
  deleteDomainName: deleteDomainName(cf),
  purgeDomain: purgeDomain(cf),
})
