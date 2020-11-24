import planConfig from '../config/plans.json'

const planSilver = process.env.NEXT_PUBLIC_PABBLY_PLAN_SILVER
const planGold = process.env.NEXT_PUBLIC_PABBLY_PLAN_GOLD

export default function getPlanDetails(planKey) {
  let plan = {}
  switch (planKey) {
    case planSilver:
      plan = { ...planConfig.silver }
      break
    case planGold:
      plan = { ...planConfig.gold }
      break
    default:
      plan = { ...planConfig.free }
      break
  }
  return plan
}
