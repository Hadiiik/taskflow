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
