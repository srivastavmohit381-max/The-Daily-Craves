// The Daily Craves - Official Menu Dataset
// Replicated with exact pricing and categories from official menu card

const RESTAURANT_INFO = {
  name: "The Daily Craves",
  tagline: "Good Food. Good Mood. Every Day!",
  subTagline: "Crave it. Love it. Everyday! ❤️",
  phone: "8795412956",
  displayPhone: "+91 8795412956",
  instagram: "the.daily.craves",
  instagramUrl: "https://instagram.com/the.daily.craves",
  minOrderDelivery: 350,
  deliveryFee: 0,
  orderNote: "Served with love & spicy happiness ❤️",
  features: [
    { icon: "🌱", title: "Fresh Ingredients", desc: "Hand-picked, high quality & fresh daily" },
    { icon: "🌶️", title: "Bold Flavours", desc: "Signature spicy dips & authentic recipes" },
    { icon: "❤️", title: "Made with Love", desc: "Crafted fresh on order with utmost passion" },
    { icon: "✨", title: "Hygienic & Safe", desc: "Clean food cart & spotless preparation" }
  ]
};

const CATEGORIES = [
  { id: "all", name: "All Items", icon: "✨" },
  { id: "momos", name: "Momos", icon: "🥟", note: "Served with spicy schezwan chutney & creamy mayo" },
  { id: "snacks", name: "Snacks", icon: "🍟", note: "Crispy, hot & freshly made" },
  { id: "cold-coffee", name: "Cold Coffee", icon: "☕", note: "Rich brew, creamy & perfectly chilled" },
  { id: "milkshakes", name: "Milk Shakes", icon: "🥤", note: "Thick, luscious & indulgence in every sip" },
  { id: "mojitos", name: "Mojitos", icon: "🍹", note: "Refreshing fizzy coolers crafted with fresh mint & lemon" }
];

const MENU_ITEMS = [
  // =================== MOMOS ===================
  {
    id: "momo-veg-steamed",
    name: "Veg Steamed Momo",
    category: "momos",
    diet: "veg",
    desc: "Soft steamed dumplings stuffed with finely chopped seasoned fresh vegetables.",
    popular: true,
    badge: "Bestseller",
    portions: [
      { name: "Half", price: 50 },
      { name: "Full", price: 90 }
    ]
  },
  {
    id: "momo-paneer-steamed",
    name: "Paneer Steamed Momo",
    category: "momos",
    diet: "veg",
    desc: "Delicate steamed momos packed with tender spiced malai paneer filling.",
    popular: false,
    portions: [
      { name: "Half", price: 60 },
      { name: "Full", price: 110 }
    ]
  },
  {
    id: "momo-chicken-steamed",
    name: "Chicken Steamed Momo",
    category: "momos",
    diet: "non-veg",
    desc: "Juicy minced chicken infused with herbs & garlic in a thin steamed wrapper.",
    popular: true,
    badge: "Chef's Pick",
    portions: [
      { name: "Half", price: 60 },
      { name: "Full", price: 110 }
    ]
  },
  {
    id: "momo-veg-fried",
    name: "Veg Fried Momo",
    category: "momos",
    diet: "veg",
    desc: "Golden crispy fried dumplings loaded with savory vegetables.",
    popular: false,
    portions: [
      { name: "Half", price: 60 },
      { name: "Full", price: 100 }
    ]
  },
  {
    id: "momo-paneer-fried",
    name: "Paneer Fried Momo",
    category: "momos",
    diet: "veg",
    desc: "Crispy golden fried momos with juicy spiced cottage cheese inside.",
    popular: false,
    portions: [
      { name: "Half", price: 70 },
      { name: "Full", price: 120 }
    ]
  },
  {
    id: "momo-chicken-fried",
    name: "Chicken Fried Momo",
    category: "momos",
    diet: "non-veg",
    desc: "Crunchy fried dumplings filled with aromatic seasoned chicken.",
    popular: true,
    portions: [
      { name: "Half", price: 70 },
      { name: "Full", price: 120 }
    ]
  },
  {
    id: "momo-veg-kurkure",
    name: "Veg Kurkure Momo",
    category: "momos",
    diet: "veg",
    desc: "Super crunchy coating with spiced vegetable core, served piping hot.",
    popular: true,
    badge: "Must Try",
    portions: [
      { name: "Half", price: 70 },
      { name: "Full", price: 130 }
    ]
  },
  {
    id: "momo-paneer-kurkure",
    name: "Paneer Kurkure Momo",
    category: "momos",
    diet: "veg",
    desc: "Paneer dumplings battered in signature crispy flakes for an extra crunch.",
    popular: true,
    badge: "Crowd Favorite",
    portions: [
      { name: "Half", price: 80 },
      { name: "Full", price: 150 }
    ]
  },
  {
    id: "momo-chicken-kurkure",
    name: "Chicken Kurkure Momo",
    category: "momos",
    diet: "non-veg",
    desc: "Juicy chicken momos in an irresistible ultra-crunchy spiced kurkure crust.",
    popular: true,
    badge: "Bestseller",
    portions: [
      { name: "Half", price: 80 },
      { name: "Full", price: 150 }
    ]
  },
  {
    id: "momo-veg-creamy",
    name: "Veg Creamy Momo",
    category: "momos",
    diet: "veg",
    desc: "Tossed in rich velvety white cream & aromatic herbs with a mild spice punch.",
    popular: false,
    portions: [
      { name: "Half", price: 70 },
      { name: "Full", price: 130 }
    ]
  },
  {
    id: "momo-paneer-creamy",
    name: "Paneer Creamy Momo",
    category: "momos",
    diet: "veg",
    desc: "Soft paneer momos drenched in decadent garlic cream sauce & seasoning.",
    popular: true,
    portions: [
      { name: "Half", price: 80 },
      { name: "Full", price: 150 }
    ]
  },
  {
    id: "momo-chicken-creamy",
    name: "Chicken Creamy Momo",
    category: "momos",
    diet: "non-veg",
    desc: "Tender chicken momos smothered in rich silky cream and exotic spice blend.",
    popular: true,
    badge: "Top Rated",
    portions: [
      { name: "Half", price: 80 },
      { name: "Full", price: 150 }
    ]
  },

  // =================== SNACKS ===================
  {
    id: "snack-regular-fries",
    name: "Regular French Fries",
    category: "snacks",
    diet: "veg",
    desc: "Golden salted crispy potato fries, perfectly crispy outside and fluffy inside.",
    popular: false,
    portions: [
      { name: "Half", price: 70 },
      { name: "Full", price: 110 }
    ]
  },
  {
    id: "snack-peri-peri-fries",
    name: "Peri Peri French Fries",
    category: "snacks",
    diet: "veg",
    desc: "Crispy french fries generously dusted with zesty, fiery African peri-peri spices.",
    popular: true,
    badge: "Bestseller",
    portions: [
      { name: "Half", price: 80 },
      { name: "Full", price: 120 }
    ]
  },
  {
    id: "snack-spring-roll",
    name: "Spring Roll",
    category: "snacks",
    diet: "veg",
    desc: "Golden fried crispy rolls stuffed with stir-fried Chinese veggies & noodles.",
    popular: true,
    portions: [
      { name: "Half", price: 50 },
      { name: "Full", price: 90 }
    ]
  },
  {
    id: "snack-chicken-nuggets",
    name: "Chicken Nuggets",
    category: "snacks",
    diet: "non-veg",
    desc: "Bite-sized tender seasoned chicken coated in golden breadcrumbs, served with dips.",
    popular: true,
    badge: "Snack Favorite",
    portions: [
      { name: "Half", price: 100 },
      { name: "Full", price: 180 }
    ]
  },

  // =================== COLD COFFEE ===================
  {
    id: "coffee-classic",
    name: "Classic Cold Coffee",
    category: "cold-coffee",
    diet: "veg",
    desc: "The timeless thick cold brew blended smoothly with chilled milk and sweetness.",
    popular: true,
    badge: "Classic",
    portions: [
      { name: "Small", price: 60 },
      { name: "Medium", price: 70 },
      { name: "Large", price: 80 }
    ]
  },
  {
    id: "coffee-premium",
    name: "Premium Cold Coffee",
    category: "cold-coffee",
    diet: "veg",
    desc: "Creamy cold coffee loaded with rich choco chips and a scoop of vanilla ice cream.",
    popular: true,
    badge: "Signature",
    portions: [
      { name: "Small", price: 70 },
      { name: "Medium", price: 80 },
      { name: "Large", price: 90 }
    ]
  },
  {
    id: "coffee-chocolate",
    name: "Chocolate Cold Coffee",
    category: "cold-coffee",
    diet: "veg",
    desc: "Espresso meets creamy milk and luscious dark chocolate syrup drizzle.",
    popular: false,
    portions: [
      { name: "Small", price: 60 },
      { name: "Medium", price: 80 },
      { name: "Large", price: 90 }
    ]
  },
  {
    id: "coffee-hazelnut",
    name: "Hazelnut Cold Coffee",
    category: "cold-coffee",
    diet: "veg",
    desc: "Nutty roasted hazelnut flavour combined with smooth cold coffee.",
    popular: true,
    portions: [
      { name: "Small", price: 60 },
      { name: "Medium", price: 80 },
      { name: "Large", price: 90 }
    ]
  },
  {
    id: "coffee-vanilla",
    name: "Vanilla Cold Coffee",
    category: "cold-coffee",
    diet: "veg",
    desc: "Infused with smooth French vanilla essence for an aromatic, sweet kick.",
    popular: false,
    portions: [
      { name: "Small", price: 60 },
      { name: "Medium", price: 80 },
      { name: "Large", price: 90 }
    ]
  },
  {
    id: "coffee-caramel",
    name: "Caramel Cold Coffee",
    category: "cold-coffee",
    diet: "veg",
    desc: "Sweet buttery caramel swirl perfectly balancing the bold roast coffee.",
    popular: false,
    portions: [
      { name: "Small", price: 60 },
      { name: "Medium", price: 80 },
      { name: "Large", price: 90 }
    ]
  },
  {
    id: "coffee-irish-cream",
    name: "Irish Cream Coffee",
    category: "cold-coffee",
    diet: "veg",
    desc: "Rich Irish cream notes paired with chilled espresso.",
    popular: false,
    portions: [
      { name: "Small", price: 60 },
      { name: "Medium", price: 80 },
      { name: "Large", price: 90 }
    ]
  },
  {
    id: "coffee-kitkat",
    name: "Kit Kat Cold Coffee",
    category: "cold-coffee",
    diet: "veg",
    desc: "Crushed chocolate wafer Kit Kat blended into creamy coffee with chunky bits.",
    popular: true,
    badge: "Must Try",
    portions: [
      { name: "Small", price: 80 },
      { name: "Medium", price: 90 },
      { name: "Large", price: 110 }
    ]
  },
  {
    id: "coffee-oreo",
    name: "Oreo Cold Coffee",
    category: "cold-coffee",
    diet: "veg",
    desc: "Crunchy Oreo cookies blended into thick cold coffee with chocolate swirls.",
    popular: true,
    badge: "Bestseller",
    portions: [
      { name: "Small", price: 80 },
      { name: "Medium", price: 90 },
      { name: "Large", price: 110 }
    ]
  },

  // =================== MILK SHAKES ===================
  {
    id: "shake-vanilla",
    name: "Vanilla Milk Shake",
    category: "milkshakes",
    diet: "veg",
    desc: "Silky smooth vanilla ice cream shake crafted to sweet perfection.",
    popular: false,
    portions: [
      { name: "Medium", price: 80 },
      { name: "Large", price: 100 }
    ]
  },
  {
    id: "shake-strawberry",
    name: "Strawberry Milk Shake",
    category: "milkshakes",
    diet: "veg",
    desc: "Berry sweet and fruity strawberry puree whipped with rich creamy milk.",
    popular: false,
    portions: [
      { name: "Medium", price: 80 },
      { name: "Large", price: 100 }
    ]
  },
  {
    id: "shake-black-currant",
    name: "Black Currant Milk Shake",
    category: "milkshakes",
    diet: "veg",
    desc: "Tangy-sweet purple black currant shake loaded with fruity bliss.",
    popular: false,
    portions: [
      { name: "Medium", price: 80 },
      { name: "Large", price: 100 }
    ]
  },
  {
    id: "shake-hazelnut",
    name: "Hazelnut Milk Shake",
    category: "milkshakes",
    diet: "veg",
    desc: "Nutty roasted hazelnut delight infused in thick dairy goodness.",
    popular: false,
    portions: [
      { name: "Medium", price: 80 },
      { name: "Large", price: 100 }
    ]
  },
  {
    id: "shake-rasmalai",
    name: "Rasmalai Milk Shake",
    category: "milkshakes",
    diet: "veg",
    desc: "Royal fusion shake with saffron, cardamom, and authentic desi rasmalai flavours.",
    popular: true,
    badge: "Special Fusion",
    portions: [
      { name: "Medium", price: 80 },
      { name: "Large", price: 100 }
    ]
  },
  {
    id: "shake-butterscotch",
    name: "Butterscotch Milk Shake",
    category: "milkshakes",
    diet: "veg",
    desc: "Crunchy butterscotch praline blended with rich caramel cream.",
    popular: false,
    portions: [
      { name: "Medium", price: 80 },
      { name: "Large", price: 100 }
    ]
  },
  {
    id: "shake-chocolate",
    name: "Chocolate Milk Shake",
    category: "milkshakes",
    diet: "veg",
    desc: "Double chocolate thick shake for all hardcore chocolate lovers.",
    popular: true,
    portions: [
      { name: "Medium", price: 90 },
      { name: "Large", price: 110 }
    ]
  },
  {
    id: "shake-kitkat",
    name: "Kit Kat Milk Shake",
    category: "milkshakes",
    diet: "veg",
    desc: "Loaded with crunchy Kit Kat pieces and whipped chocolate cream.",
    popular: true,
    badge: "Bestseller",
    portions: [
      { name: "Medium", price: 90 },
      { name: "Large", price: 110 }
    ]
  },
  {
    id: "shake-oreo",
    name: "Oreo Milk Shake",
    category: "milkshakes",
    diet: "veg",
    desc: "Super thick cookies and cream milkshake with real Oreo crumble.",
    popular: true,
    badge: "Crowd Favorite",
    portions: [
      { name: "Medium", price: 90 },
      { name: "Large", price: 110 }
    ]
  },

  // =================== MOJITOS ===================
  {
    id: "mojito-virgin",
    name: "Virgin Mojito",
    category: "mojitos",
    diet: "veg",
    desc: "Fresh muddled mint leaves, zesty lemon wedges and sparkling soda.",
    popular: true,
    badge: "Classic Cooler",
    portions: [
      { name: "Medium", price: 60 },
      { name: "Large", price: 70 }
    ]
  },
  {
    id: "mojito-blood-orange",
    name: "Blood Orange Mojito",
    category: "mojitos",
    diet: "veg",
    desc: "Tangy sweet blood orange citrus splash with fresh mint and soda.",
    popular: false,
    portions: [
      { name: "Medium", price: 60 },
      { name: "Large", price: 70 }
    ]
  },
  {
    id: "mojito-blueberry",
    name: "Blueberry Mojito",
    category: "mojitos",
    diet: "veg",
    desc: "Wild blueberry infusion over ice cubes and fresh minty fizz.",
    popular: true,
    portions: [
      { name: "Medium", price: 60 },
      { name: "Large", price: 70 }
    ]
  },
  {
    id: "mojito-green-apple",
    name: "Green Apple Mojito",
    category: "mojitos",
    diet: "veg",
    desc: "Crisp tart green apple syrup layered with soda and refreshing lime.",
    popular: true,
    badge: "Refreshing",
    portions: [
      { name: "Medium", price: 60 },
      { name: "Large", price: 70 }
    ]
  },
  {
    id: "mojito-blue-lagoon",
    name: "Blue Lagoon Mojito",
    category: "mojitos",
    diet: "veg",
    desc: "Electric blue curacao flavor topped with sparkling ice and lemon mint.",
    popular: true,
    badge: "Bestseller",
    portions: [
      { name: "Medium", price: 60 },
      { name: "Large", price: 70 }
    ]
  },
  {
    id: "mojito-kala-khatta",
    name: "Kala Khatta Mojito",
    category: "mojitos",
    diet: "veg",
    desc: "Desi nostalgic tangy blackberry & cumin rock salt punch in fizzy soda.",
    popular: true,
    badge: "Desi Twist",
    portions: [
      { name: "Medium", price: 60 },
      { name: "Large", price: 70 }
    ]
  },
  {
    id: "mojito-merry-berry",
    name: "Merry Berry Mojito",
    category: "mojitos",
    diet: "veg",
    desc: "Juicy mixed forest berries burst with ice-cold sparkling bubbles.",
    popular: false,
    portions: [
      { name: "Medium", price: 60 },
      { name: "Large", price: 70 }
    ]
  },
  {
    id: "mojito-cranberry",
    name: "Cranberry Mojito",
    category: "mojitos",
    diet: "veg",
    desc: "Tart cranberry notes muddled with mint and topped with crisp fizz.",
    popular: false,
    portions: [
      { name: "Medium", price: 60 },
      { name: "Large", price: 70 }
    ]
  },
  {
    id: "mojito-strawberry",
    name: "Strawberry Mojito",
    category: "mojitos",
    diet: "veg",
    desc: "Sweet strawberry essence paired with zesty lime and chilled soda.",
    popular: false,
    portions: [
      { name: "Medium", price: 60 },
      { name: "Large", price: 70 }
    ]
  },
  {
    id: "mojito-tropical-fruit-beer",
    name: "Tropical Fruit Beer Mojito",
    category: "mojitos",
    diet: "veg",
    desc: "Non-alcoholic malted fruit fizz with tropical island flavours.",
    popular: true,
    badge: "Unique",
    portions: [
      { name: "Medium", price: 60 },
      { name: "Large", price: 70 }
    ]
  },
  {
    id: "mojito-bubblegum",
    name: "Bubblegum Mojito",
    category: "mojitos",
    diet: "veg",
    desc: "Fun playful bubblegum aroma with bubbly iced soda and mint.",
    popular: false,
    portions: [
      { name: "Medium", price: 60 },
      { name: "Large", price: 70 }
    ]
  },
  {
    id: "mojito-lavender",
    name: "Lavender Mojito",
    category: "mojitos",
    diet: "veg",
    desc: "Aromatic floral lavender syrup with fresh lemon spritz and mint.",
    popular: false,
    portions: [
      { name: "Medium", price: 60 },
      { name: "Large", price: 70 }
    ]
  },
  {
    id: "mojito-pineapple",
    name: "Pineapple Mojito",
    category: "mojitos",
    diet: "veg",
    desc: "Tropical sweet tangy pineapple splash shaken over ice and mint.",
    popular: false,
    portions: [
      { name: "Medium", price: 60 },
      { name: "Large", price: 70 }
    ]
  },
  {
    id: "mojito-watermelon",
    name: "Watermelon Mojito",
    category: "mojitos",
    diet: "veg",
    desc: "Juicy hydrating watermelon splash with crisp garden mint and lemon.",
    popular: true,
    badge: "Summer Cooler",
    portions: [
      { name: "Medium", price: 60 },
      { name: "Large", price: 70 }
    ]
  }
];
