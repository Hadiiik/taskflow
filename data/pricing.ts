import { Pricing } from "@/types/pricing";

export const pricing:Pricing = {
    "beginner":{
        "table-conts":2,
        "members-count":3,
        "price":0,
        "plan-name":"beginner"
    },
    "basic":{
        "table-conts":7,
        "members-count":15,
        "price":5.4,
        "plan-name":"basic"
    },
    "pro":{
        "table-conts":25,
        "members-count":70,
        "price":17,
        "plan-name":"pro"
    }
} as const 