import { AiFillStar } from "react-icons/ai";
import WebsiteName from "../WebsiteName";
const cards = [
  {
    id: 1,
    name: "Thomas Christopher",
    image: Two,
    country: "United Kingdom",
    testimonial: (
      <>
        <WebsiteName />
        's trading technology and trading tools are continually updated and
        improved to provide you with the most reliable and secure platform
        possible in day-to-day operations.
      </>
    ),
  },
  {
    id: 2,
    name: "Shila Ree",
    country: "Mexico",
    image: Five,
    testimonial: (
      <>
        I've been using <WebsiteName /> for over a year now, and it has
        completely changed the way I manage my finances. It's so easy to use and
        has helped me save time and stay on top of my accounts. Highly
        recommend!
      </>
    ),
  },
  {
    id: 3,
    name: "Corey Shyna",
    country: "Mexico",
    image:
      "https://harnishdesign.net/demo/react/simone/demo/images/profile.jpg",
    testimonial: (
      <>
        I've been a customer of <WebsiteName /> for several years, and I must
        say they provide excellent service. Their online banking platform is
        user-friendly, and the customer support team is always helpful and
        responsive. Highly recommended!
      </>
    ),
  },
  // Add more objects for additional clients
];

export default cards;
import Glasses from "./Glasses.png";
import Smith from "./Smith.png";
import Tylor from "./Tylor.png";
import One from "./1.png";
import Ten from "./10.png";
import Three from "./3.png";
import Five from "./5.png";
import Two from "./2.png";
export { Smith, Tylor, Glasses, One, Ten, Three, Five, Two };
