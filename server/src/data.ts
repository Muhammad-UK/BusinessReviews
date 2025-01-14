import { v4 as uuidv4 } from "uuid";
import type { Business, Member, Review } from "./backendTypes";

export const data: {
  members: Member[];
  businesses: Business[];
} = {
  members: [
    {
      id: uuidv4(),
      username: "moe",
      password: "moe123",
    },
    {
      id: uuidv4(),
      username: "lucy",
      password: "lucy123",
    },
    {
      id: uuidv4(),
      username: "ethyl",
      password: "ethyl123",
    },
    {
      id: uuidv4(),
      username: "curly",
      password: "curly123",
    },
    {
      id: uuidv4(),
      username: "sally",
      password: "sally123",
    },
    {
      id: uuidv4(),
      username: "sue",
      password: "sue123",
    },
    {
      id: uuidv4(),
      username: "joe",
      password: "joe123",
    },
    {
      id: uuidv4(),
      username: "jane",
      password: "jane123",
    },
    {
      id: uuidv4(),
      username: "kate",
      password: "kate123",
    },
    {
      id: uuidv4(),
      username: "lisa",
      password: "lisa123",
    },
    {
      id: uuidv4(),
      username: "laura",
      password: "laura123",
    },
    {
      id: uuidv4(),
      username: "sarah",
      password: "sarah123",
    },
    {
      id: uuidv4(),
      username: "sophie",
      password: "sophie123",
    },
    {
      id: uuidv4(),
      username: "emma",
      password: "emma123",
    },
    {
      id: uuidv4(),
      username: "olivia",
      password: "olivia123",
    },
  ],
  businesses: [
    {
      id: uuidv4(),
      name: "Apple",
      description:
        "Apple is a leading provider of consumer electronics, software, and online services",
      city: "San Francisco",
      photo_url:
        "https://www.thelogocreative.co.uk/wp-content/uploads/2017/08/wFSbHvw-1024x640.jpg",
    },
    {
      id: uuidv4(),
      name: "Samsung",
      description:
        "Samsung is a Korean multinational conglomerate corporation specializing in designing, manufacturing and selling electronic devices, homes appliances, and mobile communication devices",
      city: "Seoul",
      photo_url:
        "https://www.simplilearn.com/ice9/free_resources_article_thumb/How_Samsung_Marketing_Strategy_Solidifies_Its_Brand_Value.jpg",
    },
    {
      id: uuidv4(),
      name: "Google",
      description:
        "Google is an American multinational technology company that specializes in Internet-related services and products, which include searching, advertising, cloud computing, and products including Google Chrome, Android, YouTube, and Google Maps",
      city: "Mountain View",
      photo_url:
        "https://www.logodesignteam.com/blog/wp-content/uploads/2017/07/Google_Logo.jpg",
    },
    {
      id: uuidv4(),
      name: "Facebook",
      description:
        "Facebook is a social media company offering online social networking services and a social networking platform where users can connect with friends, family, co-workers, and other people from their interests or affinities",
      city: "Menlo Park",
      photo_url:
        "https://d1lss44hh2trtw.cloudfront.net/assets/article/2022/10/04/facebook-reportedly-walks-away-from-110m-park-ave-lease-featured_feature.jpg",
    },
    {
      id: uuidv4(),
      name: "Tesla",
      description:
        "Tesla, Inc. is an American electric vehicle and clean energy company based in Palo Alto, California. The company designs, manufactures, and sells electric vehicles and clean energy products",
      city: "Palo Alto",
      photo_url:
        "https://techmonitor.ai/wp-content/uploads/sites/4/2017/03/shutterstock_1140629366.webp",
    },
    {
      id: uuidv4(),
      name: "Microsoft",
      description:
        "Microsoft Corporation is an American multinational technology company that produces computer software, consumer electronics, personal computers, and semiconductors",
      city: "Redmond",
    },
    {
      id: uuidv4(),
      name: "Amazon",
      description:
        "Amazon.com, Inc. is an American multinational technology company based in Seattle, Washington. It focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence",
      city: "Seattle",
    },
    {
      id: uuidv4(),
      name: "Nvidia",
      description:
        "NVIDIA Corporation is an American multinational technology company based in Santa Clara, California. It is a part of the NVIDIA Corporation family of companies",
      city: "Santa Clara",
    },
    {
      id: uuidv4(),
      name: "Intel",
      description:
        "Intel Corporation is an American multinational technology company that designs, develops, and sells microprocessors, semiconductors, and other electronic components",
      city: "Santa Clara",
    },
    {
      id: uuidv4(),
      name: "AMD",
      description:
        "AMD is an American multinational technology company based in Santa Clara, California. It is a part of the AMD Corporation family of companies",
      city: "Santa Clara",
    },
    {
      id: uuidv4(),
      name: "Qualcomm",
      description:
        "Qualcomm Corporation is an American multinational technology company based in Santa Clara, California. It is a part of the Qualcomm Corporation family of companies",
      city: "Santa Clara",
    },
    {
      id: uuidv4(),
      name: "Oracle",
      description:
        "Oracle Corporation is an American multinational technology company based in Redwood Shores, California. It is a part of the Oracle Corporation family of companies",
      city: "Redwood Shores",
    },
    {
      id: uuidv4(),
      name: "IBM",
      description:
        "IBM Corporation is an American multinational technology company based in Armonk, New York. It is a part of the IBM Corporation family of companies",
      city: "Armonk",
    },
    {
      id: uuidv4(),
      name: "HP",
      description:
        "Hewlett-Packard Company is an American multinational technology company based in Palo Alto, California. It is a part of the Hewlett-Packard Company family of companies",
      city: "Palo Alto",
    },
    {
      id: uuidv4(),
      name: "Yahoo",
      description:
        "Yahoo! Inc. is an American multinational technology company based in Seattle, Washington. It is a part of the Yahoo! Inc. family of companies",
      city: "Seattle",
    },
    {
      id: uuidv4(),
      name: "Coca-Cola",
      description:
        "Coca-Cola Company is an American multinational soft drink company based in Atlanta, Georgia. It is a part of the Coca-Cola Company family of companies",
      city: "Atlanta",
    },
    {
      id: uuidv4(),
      name: "Pepsi",
      description:
        "PepsiCo, Inc. is an American multinational soft drink company based in Atlanta, Georgia. It is a part of the PepsiCo, Inc. family of companies",
      city: "Atlanta",
    },
    {
      id: uuidv4(),
      name: "Starbucks",
      description:
        "Starbucks Corporation is an American multinational coffeehouse chain based in Seattle, Washington. It is a part of the Starbucks Corporation family of companies",
      city: "Seattle",
    },
    {
      id: uuidv4(),
      name: "Caterpillar",
      description:
        "Caterpillar, Inc. is an American multinational construction company based in Seattle, Washington. It is a part of the Caterpillar, Inc. family of companies",
      city: "Seattle",
    },
    {
      id: uuidv4(),
      name: "Dell",
      description:
        "Dell Corporation is an American multinational technology company based in Redmond, Washington. It is a part of the Dell Corporation family of companies",
      city: "Redmond",
    },
  ],
};
export const reviewsData: Review[] = [
  {
    id: uuidv4(),
    member_id: data.members[0].id,
    business_id: data.businesses[0].id,
    rating: 5,
    comment: "I love this place!",
  },
  {
    id: uuidv4(),
    member_id: data.members[1].id,
    business_id: data.businesses[1].id,
    rating: 3,
    comment: "Worth the money.",
  },
  {
    id: uuidv4(),
    member_id: data.members[2].id,
    business_id: data.businesses[2].id,
    rating: 4,
    comment: "Could be better.",
  },
  {
    id: uuidv4(),
    member_id: data.members[3].id,
    business_id: data.businesses[3].id,
    rating: 2,
    comment: "Not worth the price.",
  },
  {
    id: uuidv4(),
    member_id: data.members[0].id,
    business_id: data.businesses[10].id,
    rating: 4,
    comment: "Great customer service.",
  },
  {
    id: uuidv4(),
    member_id: data.members[1].id,
    business_id: data.businesses[3].id,
    rating: 5,
    comment: "Perfect product.",
  },
  {
    id: uuidv4(),
    member_id: data.members[2].id,
    business_id: data.businesses[9].id,
    rating: 3,
    comment: "Worth the investment.",
  },
  {
    id: uuidv4(),
    member_id: data.members[2].id,
    business_id: data.businesses[3].id,
    rating: 1,
    comment: "Beware of scams.",
  },
  {
    id: uuidv4(),
    member_id: data.members[0].id,
    business_id: data.businesses[11].id,
    rating: 5,
    comment: "Exceptional support.",
  },
  {
    id: uuidv4(),
    member_id: data.members[1].id,
    business_id: data.businesses[2].id,
    rating: 4,
    comment: "Excellent product.",
  },
  {
    id: uuidv4(),
    member_id: data.members[2].id,
    business_id: data.businesses[6].id,
    rating: 3,
    comment: "Good quality.",
  },
  {
    id: uuidv4(),
    member_id: data.members[3].id,
    business_id: data.businesses[0].id,
    rating: 2,
    comment: "Not recommended.",
  },
  {
    id: uuidv4(),
    member_id: data.members[7].id,
    business_id: data.businesses[1].id,
    rating: 5,
    comment: "I love this place!",
  },
  {
    id: uuidv4(),
    member_id: data.members[1].id,
    business_id: data.businesses[5].id,
    rating: 3,
    comment: "Worth the money.",
  },
];
