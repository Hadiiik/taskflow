// types/pricing.d.ts

export type SubscriptionType = "beginner" | "basic" | "pro"; // أنواع أسماء الاشتراكات

export type PlanDetails = {
  "plan-name":SubscriptionType
  "table-conts": number;
  "members-count": number;
  price: number;
};

export type Pricing = {
  [key in SubscriptionType]: PlanDetails;
};

export const getSubType =(sub:string):SubscriptionType=>{
  if(sub==="مجاني") return "beginner"
  if(sub==="اساسي") return "basic"
  if(sub==="محترف") return "pro"
  return "beginner"
}