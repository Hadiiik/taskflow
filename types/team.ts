import { SubscriptionType } from "./pricing"

export type team = {
    team_name : string|number,
    creator_id : string|number,
    team_type : SubscriptionType,
    company_name : string

}