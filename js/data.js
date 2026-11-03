/**
 * BABY SHOWER CONFIGURATION & DATA
 * You can edit this file to customize details for Onin & Charlene's Baby Shower!
 */

const EVENT_CONFIG = {
  // Baby & Parents Info
  babyName: "Baby Boy",
  babySubtitle: "A Little Prince is on the Way! 👶💙 (Name is still a secret!)",
  parentsNames: "Onin & Charlene",
  themeTitle: "Baby Shower Celebration",
  bannerImage: "assets/image.jpeg",
  
  // Date & Time (Format: YYYY-MM-DDTHH:MM:SS)
  eventDate: "2026-11-28T14:00:00",
  displayDate: "Saturday, November 28, 2026",
  displayTime: "2:00 PM - 6:00 PM",
  
  // Venue Details
  venueName: "5 Candle Liteway",
  venueAddress: "North York, ON M2R1M6",
  googleMapsUrl: "https://maps.google.com/?q=5+Candle+Liteway,+North+York,+ON+M2R1M6",
  


  // Amazon Baby Registry Link (Amazon Canada)
  amazonRegistryUrl: "https://www.amazon.ca/baby-reg/charleneandonin-watin-january-2027-northyork/KORBLJ5ITJAK?ref_=cm_sw_r_apann_dp_9Z2GRX172C5VAG76J35V&language=en-US",
  amazonRegistryNote: "Our official baby registry is hosted on Amazon Canada. Click the link below to browse and order directly from our curated list for Baby Boy!",

  // Google Sheets Integration (Auto-syncs RSVPs, Wishes, and Claims)
  googleSheetAppUrl: "https://script.google.com/macros/s/AKfycbyUudSe1URXJEzlXalpAbHNQvRVpeuaPVFMJoSpelQqEHDcrIkYSclvtjDbU0SSrZaObg/exec",

  // Amazon Top Wishlist Highlights (Extracted directly from Onin & Charlene's Amazon.ca Registry)
  registryItems: [
    {
      id: "reg-giftcard",
      asin: "B004M5HIQI",
      name: "Amazon.ca eGift Card",
      category: "all",
      price: "Any Amount ($25 - $500)",
      image: "assets/amazon-gift-card.jpg",
      storeName: "Amazon.ca",
      storeLink: "https://www.amazon.ca/dp/B004M5HIQI",
      notes: "Flexible eGift card for Onin & Charlene to purchase any needed essentials for Baby Boy"
    },
    {
      id: "reg-B0HG1ND54D",
      asin: "B0HG1ND54D",
      name: 'WiFi/Local Baby Monitor with 2 Cameras & Crib Mount Clip (5" 1080P)',
      category: "nursery",
      price: "$199.99",
      image: "https://m.media-amazon.com/images/I/416Jw-5qZqL.jpg",
      storeName: "Amazon.ca",
      storeLink: "https://www.amazon.ca/WEMOH-Monitor-Monitoring-Detection-Subscription/dp/B0HG1ND54D?colid=KORBLJ5ITJAK&coliid=I26XP9ZD8CA3LY",
      notes: 'Local FHSS + WiFi app monitoring, cry & motion detection, 5" 1080P split screen with 2 cameras'
    },
    {
      id: "reg-B075R8BXXC",
      asin: "B075R8BXXC",
      name: "The Play Gym by Lovevery",
      category: "toys",
      price: "$223.80",
      image: "https://m.media-amazon.com/images/I/511Tt8FuuXL.jpg",
      storeName: "Amazon.ca",
      storeLink: "https://www.amazon.ca/The-Play-Gym-by-Lovevery/dp/B075R8BXXC?colid=KORBLJ5ITJAK&coliid=I2469GBBL4TLBA",
      notes: "Stage-based developmental activity gym & play mat for baby's whole first year"
    },
    {
      id: "reg-B0DJ28NMHK",
      asin: "B0DJ28NMHK",
      name: "Momcozy KleanPal Pro Baby Bottle Washer, Sterilizer & Dryer",
      category: "feeding",
      price: "$389.99",
      image: "https://m.media-amazon.com/images/I/31h5zvTfVhL.jpg",
      storeName: "Amazon.ca",
      storeLink: "https://www.amazon.ca/Momcozy-KleanPal-Bottle-Washer-Sterilizer/dp/B0DJ28NMHK?colid=KORBLJ5ITJAK&coliid=I2BYS6LFLK8TQK",
      notes: "All-in-one automatic cleaning, sterilizing & drying machine for bottles and pump parts"
    },
    {
      id: "reg-B0BHZPXJGV",
      asin: "B0BHZPXJGV",
      name: "Maxi-Cosi Kori 2-in-1 Rocker (Sand Horizon)",
      category: "nursery",
      price: "$199.99",
      image: "https://m.media-amazon.com/images/I/41NkzuZ-9AL.jpg",
      storeName: "Amazon.ca",
      storeLink: "https://www.amazon.ca/Maxi-Cosi-Kori-Rocker-Sand-Horizon/dp/B0BHZPXJGV?colid=KORBLJ5ITJAK&coliid=I2N5A9PV8W8T9",
      notes: "2-in-1 stationary seat and rocker, ultra-lightweight and folds flat for easy storage"
    },
    {
      id: "reg-B0CGXHSW1J",
      asin: "B0CGXHSW1J",
      name: "Momcozy Ergonomic Lightweight Baby Carrier (Grey)",
      category: "travel",
      price: "$64.97",
      image: "https://m.media-amazon.com/images/I/41xoUzNfq6L.jpg",
      storeName: "Amazon.ca",
      storeLink: "https://www.amazon.ca/Momcozy-Lightweight-Distribution-Hands-Free-Parenting%EF%BC%8C7-45lbs/dp/B0CGXHSW1J?colid=KORBLJ5ITJAK&coliid=IJM8I4T48J95K",
      notes: "Easy-to-wear baby carrier with 3D lumbar support and even weight distribution (7-45 lbs)"
    },
    {
      id: "reg-B09VY84NDV",
      asin: "B09VY84NDV",
      name: "Huggies Little Snugglers Disposable Diapers (Size 1, 84 Count)",
      category: "diapering",
      price: "$59.99",
      image: "https://m.media-amazon.com/images/I/51wl6-lNZyL.jpg",
      storeName: "Amazon.ca",
      storeLink: "https://www.amazon.ca/Huggies-Little-Snugglers-Baby-Diapers/dp/B09VY84NDV?colid=KORBLJ5ITJAK&coliid=I3RH9V0IC4I6JP",
      notes: "GentleAbsorb liner, hypoallergenic diapers designed for sensitive newborn skin"
    },
    {
      id: "reg-B07VY9KHY5",
      asin: "B07VY9KHY5",
      name: "Huggies Little Snugglers Diapers (Size 3, 136 Count)",
      category: "diapering",
      price: "$43.99",
      image: "https://m.media-amazon.com/images/I/51uFtqEO5iL.jpg",
      storeName: "Amazon.ca",
      storeLink: "https://www.amazon.ca/HUGGIES-Little-Snugglers-Diapers-Packaging/dp/B07VY9KHY5?colid=KORBLJ5ITJAK&coliid=I1DICU8E8B9A1Q",
      notes: "Mega pack diapers (16-28 lbs) with soft pocketed waistband and wetness indicator"
    },
    {
      id: "reg-B0CM4H9CSB",
      asin: "B0CM4H9CSB",
      name: "Huggies Little Snugglers Newborn Diapers (Size 0, 144 Count)",
      category: "diapering",
      price: "$35.00",
      image: "https://m.media-amazon.com/images/I/51zkfOoQIzL.jpg",
      storeName: "Amazon.ca",
      storeLink: "https://www.amazon.ca/Huggies-Newborn-Diapers-Little-Snugglers/dp/B0CM4H9CSB?colid=KORBLJ5ITJAK&coliid=I2WFPB07VE8F6N",
      notes: "Special umbilical cord notch & GentleAbsorb liner for newborns up to 10 lbs"
    },
    {
      id: "reg-B07NC3732S",
      asin: "B07NC3732S",
      name: "Huggies Natural Care Unscented Baby Wipes (1008 Wipes)",
      category: "diapering",
      price: "$29.99",
      image: "https://m.media-amazon.com/images/I/5177w614PDL.jpg",
      storeName: "Amazon.ca",
      storeLink: "https://www.amazon.ca/Huggies-Natural-Unscented-Sensitive-Refill/dp/B07NC3732S?colid=KORBLJ5ITJAK&coliid=I20RDOY58XC4IQ",
      notes: "99% pure water wipes, hypoallergenic, unscented, and plant-based"
    },
    {
      id: "reg-B086PTBQFS",
      asin: "B086PTBQFS",
      name: "Momcozy Baby Hooded Towel & Washcloth Set (8-Piece)",
      category: "diapering",
      price: "$29.99",
      image: "https://m.media-amazon.com/images/I/41j-lgIcOqL.jpg",
      storeName: "Amazon.ca",
      storeLink: "https://www.amazon.ca/Momcozy-Washcloth-Elephant-Newborns-Toddlers/dp/B086PTBQFS?colid=KORBLJ5ITJAK&coliid=I16SXOED0YK43A",
      notes: "Soft absorbent hooded bath towels & washcloth set for newborns and toddlers"
    },
    {
      id: "reg-B0964CHD65",
      asin: "B0964CHD65",
      name: "Philips Avent Natural Baby Bottles (9oz, 4-Pack)",
      category: "feeding",
      price: "$25.63",
      image: "https://m.media-amazon.com/images/I/41GmaqjORvL.jpg",
      storeName: "Amazon.ca",
      storeLink: "https://www.amazon.ca/Philips-Natural-Response-SCY903-04/dp/B0964CHD65?colid=KORBLJ5ITJAK&coliid=IOHR6M5J87X1G",
      notes: "Natural Response nipples with anti-colic valve, designed like a breast for easy latch"
    },
    {
      id: "reg-B09R165TZX",
      asin: "B09R165TZX",
      name: "Philips Avent Natural Baby Bottles (4oz, 3-Pack)",
      category: "feeding",
      price: "$19.97",
      image: "https://m.media-amazon.com/images/I/4111ygvKknL.jpg",
      storeName: "Amazon.ca",
      storeLink: "https://www.amazon.ca/Philips-Avent-Natural-Bottle-Response/dp/B09R165TZX?colid=KORBLJ5ITJAK&coliid=I7NFY6YYTNDWS",
      notes: "Slow flow stage 2 nipple bottles, ideal for newborn baby feeding"
    },
    {
      id: "reg-B07X3WCKZS",
      asin: "B07X3WCKZS",
      name: "San Francisco Baby 360° Breathable Nursing Cover",
      category: "feeding",
      price: "$17.99",
      image: "https://m.media-amazon.com/images/I/41E0k90g9FL.jpg",
      storeName: "Amazon.ca",
      storeLink: "https://www.amazon.ca/Cotton-Nursing-Cover-Breastfeeding-Built/dp/B07X3WCKZS?colid=KORBLJ5ITJAK&coliid=I34S5IYU7MX7DC",
      notes: "Full coverage privacy breastfeeding blanket with rigid neckline to view baby"
    },
    {
      id: "reg-B0CXCYJBCP",
      asin: "B0CXCYJBCP",
      name: "Momcozy 8000mAh Portable Stroller Fan & Night Light",
      category: "travel",
      price: "$39.99",
      image: "https://m.media-amazon.com/images/I/41Clk23tAyL.jpg",
      storeName: "Amazon.ca",
      storeLink: "https://www.amazon.ca/Momcozy-Ultra-long-Detachable-360%C2%B0Rotate-Rechargeable/dp/B0CXCYJBCP?colid=KORBLJ5ITJAK&coliid=I2FN1WKRRK1TZU",
      notes: "27-hour long battery life, 360° rotation flexible tripod, and built-in LED night light"
    },
    {
      id: "reg-B07PWJQGFD",
      asin: "B07PWJQGFD",
      name: "Momcozy Universal Stroller Organizer with Insulated Cup Holder",
      category: "travel",
      price: "$39.97",
      image: "https://m.media-amazon.com/images/I/411zXQ1QcpL.jpg",
      storeName: "Amazon.ca",
      storeLink: "https://www.amazon.ca/Universal-Stroller-Organizer-Insulated-Momcozy/dp/B07PWJQGFD?colid=KORBLJ5ITJAK&coliid=I1DATHZXU2IV4I",
      notes: "Fits all major strollers with insulated cup holders and detachable wristlet pocket"
    },
    {
      id: "reg-B0BKQDPP1Z",
      asin: "B0BKQDPP1Z",
      name: "Gaiatop Clip-on Rechargeable Mini Stroller Fan",
      category: "travel",
      price: "$23.99",
      image: "https://m.media-amazon.com/images/I/412-OCipCCL.jpg",
      storeName: "Amazon.ca",
      storeLink: "https://www.amazon.ca/Gaiatop-Portable-Stroller-Rechargeable-Treadmill/dp/B0BKQDPP1Z?colid=KORBLJ5ITJAK&coliid=I3J39FCWPN5BHW",
      notes: "Small flexible tripod clip fan, rechargeable battery, perfect for car seats and strollers"
    },
    {
      id: "reg-B09BQSHTQC",
      asin: "B09BQSHTQC",
      name: "KeaBabies Organic Cotton Fitted Crib Sheets (2-Pack, Cloud)",
      category: "nursery",
      price: "$35.93",
      image: "https://m.media-amazon.com/images/I/512c7QrzT6L.jpg",
      storeName: "Amazon.ca",
      storeLink: "https://www.amazon.ca/KeaBabies-Organic-Mattress-Neutral-Breathable/dp/B09BQSHTQC?colid=KORBLJ5ITJAK&coliid=I2YT24HHB1BQQY",
      notes: "Snug-fit 100% organic cotton crib mattress sheets in neutral cloud print"
    }
  ],



  // Initial Wishes (Empty by default)
  initialWishes: [],

  // Initial Sample Name Guesses
  initialNameGuesses: [
    { guesser: "Marc", nameGuess: "Liam", date: "2026-10-25" },
    { guesser: "Jenny", nameGuess: "Noah", date: "2026-10-25" },
    { guesser: "Dave", nameGuess: "Ethan", date: "2026-10-25" }
  ]
};
