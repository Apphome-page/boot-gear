import getPlanDetails from '../../../utils/getPlanDetails'

export default async function keyValidate(
  firebase,
  appKey,
  { userId = firebase.auth().currentUser.uid } = {}
) {
  const storagePath = `public/${appKey}/index.html`
  const databasePathPrefix = `users/${userId}`

  const storageInst = firebase.storage()
  const databaseInst = firebase.database()

  // 1. User Limit
  const userSitesPromise = await databaseInst
    .ref(databasePathPrefix)
    .once('value')
  const { plan_id: planId, sites: userSites = {} } =
    userSitesPromise.val() || {}
  const userWebsite = (userSites || {})[appKey] || {}
  const { webLimit } = getPlanDetails(planId)
  if (userSites) {
    delete userSites[appKey]
  }

  // EXIT: Already owns 1 Website
  if (Object.keys(userSites).length >= webLimit) {
    return {
      status: false,
      text: `You already have ${webLimit} websites hosted.`,
    }
  }

  // 2. Path is accessible || User Owns Path
  let freeWebsitePath = true
  try {
    const {
      customMetadata: { owner },
    } = await storageInst.ref(storagePath).getMetadata()
    freeWebsitePath = !owner || owner === userId
  } catch (e) {
    // Path Does not exist
  }

  // Exit: Path is inaccessible
  if (!(freeWebsitePath || userWebsite.timestamp)) {
    return {
      status: false,
      text: `${appKey} is already taken`,
    }
  }

  return {
    status: true,
    data: userWebsite,
  }
}
