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
  
  // Theme & Dress Code (Baby Boy Motif)
  dressCodeTitle: "Pastel Blue, White & Soft Earth Tones",
  dressCodeDescription: "Guests are warmly encouraged to wear pastel blue, white, cream, or neutral pastel colors.",
  palette: [
    { name: "Dusty Blue", hex: "#5585b5" },
    { name: "Baby Sky", hex: "#a4c5e8" },
    { name: "Soft Cloud", hex: "#f0f6fc" },
    { name: "Warm Cream", hex: "#fbf8f2" },
    { name: "Champagne Gold", hex: "#dfba73" }
  ],

  // Amazon Baby Registry Link
  amazonRegistryUrl: "https://www.amazon.com/baby-reg/",
  amazonRegistryNote: "Our official baby registry is hosted on Amazon. Simply click the link below to view the items curated for Baby Boy's arrival!",

  // Amazon Top Wishlist Highlights
  registryItems: [
    {
      id: "reg-1",
      name: "Ergonomic Baby Carrier & Wrap",
      category: "travel",
      price: "Amazon Registry",
      image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=600&q=80",
      storeName: "Amazon",
      storeLink: "https://www.amazon.com/baby-reg/",
      notes: "Breathable mesh fabric, ergonomic support for newborn to toddler"
    },
    {
      id: "reg-2",
      name: "Baby Bottle Steam Sterilizer & Dryer",
      category: "feeding",
      price: "Amazon Registry",
      image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80",
      storeName: "Amazon",
      storeLink: "https://www.amazon.com/baby-reg/",
      notes: "Electric countertop baby bottle steam sterilizer and quick dryer"
    },
    {
      id: "reg-3",
      name: "Organic Muslin Swaddle Blankets",
      category: "nursery",
      price: "Amazon Registry",
      image: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=600&q=80",
      storeName: "Amazon",
      storeLink: "https://www.amazon.com/baby-reg/",
      notes: "Ultra-soft, breathable 100% organic cotton swaddles"
    },
    {
      id: "reg-4",
      name: "Diaper Caddy Organizer & Travel Bag",
      category: "diapering",
      price: "Amazon Registry",
      image: "https://images.unsplash.com/photo-1584839404283-936666eb8948?auto=format&fit=crop&w=600&q=80",
      storeName: "Amazon",
      storeLink: "https://www.amazon.com/baby-reg/",
      notes: "Portable felt organizer for diapers, wipes, and nursery essentials"
    },
    {
      id: "reg-5",
      name: "Smart Baby Sound Machine & Night Light",
      category: "nursery",
      price: "Amazon Registry",
      image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600&q=80",
      storeName: "Amazon",
      storeLink: "https://www.amazon.com/baby-reg/",
      notes: "Soothing white noise sound machine with customizable ambient light"
    },
    {
      id: "reg-6",
      name: "High-Contrast Newborn Sensory Flash Cards & Toys",
      category: "toys",
      price: "Amazon Registry",
      image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=600&q=80",
      storeName: "Amazon",
      storeLink: "https://www.amazon.com/baby-reg/",
      notes: "Brain development sensory cards & soft rattle toys for 0-6 months"
    }
  ],

  // Cash / Diaper Fund Info (E-Transfer / Bank / Digital)
  cashFund: {
    title: "Diaper & Future Fund 🍼",
    description: "For family and friends from Canada and afar who wish to send their blessings electronically:",
    gcash: {
      accountName: "Charlene (GCash / Remit)",
      accountNumber: "0917-123-4567"
    },
    maya: {
      accountName: "Onin (Maya / Remit)",
      accountNumber: "0918-987-6543"
    },
    bank: {
      bankName: "BDO Bank (Wire / Remitly / Wise)",
      accountName: "Onin & Charlene",
      accountNumber: "0012-3456-7890"
    }
  },

  // Program / Schedule
  schedule: [
    { time: "2:00 PM", title: "Arrival & Welcome Drinks", description: "Find your seats, grab a welcome drink, and sign the guestbook!" },
    { time: "2:30 PM", title: "Opening Remarks & Welcome", description: "A short, heartfelt welcome from future parents Onin and Charlene." },
    { time: "3:00 PM", title: "Baby Shower Games! 🎉", description: "Guess the Baby Food, Baby Trivia, Daddy Tummy Measure, and fun prizes!" },
    { time: "4:00 PM", title: "Buffet Snacks & Refreshments", description: "Enjoy delicious treats, coffee, desserts, and casual mingling." },
    { time: "4:45 PM", title: "Opening of Gifts & Well Wishes", description: "Unwrapping gifts from the Amazon registry and sharing advice for the parents-to-be." },
    { time: "5:30 PM", title: "Photos & Parting Favors", description: "Commemorative photos with Onin & Charlene and baby shower souvenirs!" }
  ],

  // Initial Sample Wishes
  initialWishes: [
    {
      name: "Aunt Grace & Uncle Ben",
      relationship: "Family (Vancouver, Canada)",
      message: "We cannot wait to meet Baby Boy! Wishing your growing family endless health, joy, and blessings. So excited to finally learn his name! Lots of love, Onin & Charlene!",
      date: "2026-10-24"
    },
    {
      name: "Clarisse & Friends",
      relationship: "Best Friends (Toronto, Canada)",
      message: "So beyond excited for you both! Baby Boy is already so loved across the miles. Can't wait for all the baby cuddles and visits! Huge congratulations Onin & Charlene!",
      date: "2026-10-25"
    }
  ],

  // Initial Sample Name Guesses
  initialNameGuesses: [
    { guesser: "Marc", nameGuess: "Liam", date: "2026-10-25" },
    { guesser: "Jenny", nameGuess: "Noah", date: "2026-10-25" },
    { guesser: "Dave", nameGuess: "Ethan", date: "2026-10-25" }
  ]
};
