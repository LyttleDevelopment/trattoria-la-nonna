export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  dineInPrice: number;
  takeawayPrice?: number;
  takeawayRestricted?: boolean;
  category: string;
  image?: string;
};

export type MenuSection = {
  name: string;
  items: MenuItem[];
  note?: string;
};

export const menuSections: MenuSection[] = [
  {
    name: "Aperitiefhapjes",
    items: [
      {
        id: "pane-olio",
        name: "Pane & olio",
        description: "Freshly baked bread, extra virgin olive oil and balsamic vinegar.",
        dineInPrice: 4.5,
        takeawayPrice: 3.5,
        category: "Aperitiefhapjes",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=480&q=85",
      },
      {
        id: "focaccia-casa",
        name: "Focaccia della casa",
        description: "Warm focaccia, olive oil, sea salt, rosemary and ricotta.",
        dineInPrice: 9.5,
        takeawayPrice: 7.5,
        category: "Aperitiefhapjes",
        image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=480&q=85",
      },
      {
        id: "brushetta-classico",
        name: "Brushetta classico",
        description: "Tomato, basil, garlic and extra virgin olive oil.",
        dineInPrice: 9.5,
        takeawayPrice: 7.5,
        category: "Aperitiefhapjes",
        image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=480&q=85",
      },
      {
        id: "antipasto-della-nonna",
        name: "Antipasto Della Nonna",
        description: "Prosciutto, mortadella, saltufo, olives and cheeses.",
        dineInPrice: 24,
        takeawayPrice: 22,
        category: "Aperitiefhapjes",
      },
    ],
  },
  {
    name: "Antipasti – voorgerechten",
    items: [
      {
        id: "burrata-pugliese",
        name: "Burrata pugliese",
        description: "Burrata, roasted cherry tomatoes, basil oil, pistachios and focaccia.",
        dineInPrice: 15.5,
        takeawayPrice: 13.5,
        category: "Antipasti",
        image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=480&q=85",
      },
      {
        id: "vitello-tonnato",
        name: "Vitello Tonnato",
        description: "Thinly sliced veal, tuna cream, caper berries and arugula.",
        dineInPrice: 16.5,
        takeawayPrice: 14.5,
        category: "Antipasti",
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=480&q=85",
      },
      {
        id: "carpaccio-di-manzo",
        name: "Carpaccio di manzo",
        description: "Beef carpaccio, parmesan, arugula, pine nuts and balsamic.",
        dineInPrice: 17.5,
        takeawayPrice: 15.5,
        category: "Antipasti",
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=480&q=85",
      },
      {
        id: "arancini-siciliani",
        name: "Arancini siciliani",
        description: "Crispy risotto balls, warm tomato sauce, parmesan and basil.",
        dineInPrice: 14.5,
        takeawayPrice: 12.5,
        category: "Antipasti",
        image: "https://images.unsplash.com/photo-1609501676725-7186f017a4b7?auto=format&fit=crop&w=480&q=85",
      },
    ],
  },
  {
    name: "Pasta",
    items: [
      {
        id: "spaghetti-bolognese",
        name: "Spaghetti alla bolognese",
        description: "Homemade ragù and parmesan.",
        dineInPrice: 18.5,
        takeawayPrice: 16.5,
        category: "Pasta",
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=480&q=85",
      },
      {
        id: "spaghetti-vongole",
        name: "Spaghetti alla vongole",
        description: "Clams, garlic, white wine, parsley and chili.",
        dineInPrice: 22.5,
        takeawayPrice: 20.5,
        category: "Pasta",
        image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=480&q=85",
      },
      {
        id: "linguini-frutti-di-mare",
        name: "Linguini frutti di mare",
        description: "Mussels, clams, scampi, squid, tomato and white wine.",
        dineInPrice: 23.5,
        takeawayPrice: 21.5,
        category: "Pasta",
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=480&q=85",
      },
      {
        id: "cacio-e-pepe",
        name: "Cacio é pepe",
        description: "Pecorino Romano and black pepper.",
        dineInPrice: 17.5,
        takeawayPrice: 15.5,
        category: "Pasta",
        image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=480&q=85",
      },
      {
        id: "pasta-salmone",
        name: "Pasta al salmone",
        description: "Smoked salmon, cream, lemon and dill.",
        dineInPrice: 20.5,
        takeawayPrice: 18.5,
        category: "Pasta",
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=480&q=85",
      },
      {
        id: "spaghetti-carbonara",
        name: "Spaghetti alla carbonara",
        description: "Guanciale, pecorino Romano, egg and black pepper.",
        dineInPrice: 19.5,
        takeawayPrice: 17.5,
        category: "Pasta",
        image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=480&q=85",
      },
      {
        id: "rigatone-tartufo",
        name: "Rigatone al tartufo",
        description: "Rigatoni, truffle cream, mushrooms and parmesan.",
        dineInPrice: 21.5,
        takeawayPrice: 19.5,
        category: "Pasta",
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=480&q=85",
      },
      {
        id: "lasagne-della-nonna",
        name: "Lasagne della nonna",
        dineInPrice: 20.5,
        takeawayPrice: 18.5,
        category: "Pasta",
        image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=480&q=85",
      },
      {
        id: "lasagne-vegetariana",
        name: "Lasagne vegetariana",
        dineInPrice: 18.5,
        takeawayPrice: 16.5,
        category: "Pasta",
        image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=480&q=85",
      },
    ],
  },
  {
    name: "Secondi – hoofdgerechten",
    note: "Main courses can be served with bread, fries, (saffron) risotto or roasted baby potatoes. Extra portion €3.50.",
    items: [
      {
        id: "tagliata-di-manzo",
        name: "Tagliata di manzo",
        description: "Grilled entrecôte, arugula, parmesan, balsamic, roasted cherry tomatoes and baby potatoes.",
        dineInPrice: 29.5,
        takeawayRestricted: true,
        category: "Secondi",
      },
      {
        id: "pollo-alla-milanese",
        name: "Pollo alla milanese",
        description: "Crispy breaded chicken, lemon, arugula, parmesan and saffron rice.",
        dineInPrice: 22.5,
        takeawayRestricted: true,
        category: "Secondi",
      },
      {
        id: "saltimbocca-alla-romana",
        name: "Saltimbocca alla romana",
        description: "Veal, prosciutto, sage, white wine, roasted potatoes and cherry tomatoes.",
        dineInPrice: 24.5,
        takeawayRestricted: true,
        category: "Secondi",
      },
      {
        id: "branzino-mediterranea",
        name: "Branzino alla mediterranea",
        description: "Sea bass, olives, capers, lemon, roasted baby potatoes and cherry tomatoes.",
        dineInPrice: 27.5,
        takeawayRestricted: true,
        category: "Secondi",
      },
      {
        id: "ossocuco-alla-milanese",
        name: "Ossocuco alla milanese",
        description: "Slow-cooked veal shank, gremolata and saffron risotto.",
        dineInPrice: 26.5,
        takeawayPrice: 24.5,
        category: "Secondi",
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=480&q=85",
      },
    ],
  },
  {
    name: "Desserts – Dolci",
    items: [
      {
        id: "tiramisu-della-nonna",
        name: "Tiramisu Della Nonna",
        dineInPrice: 8,
        category: "Dolci",
      },
      {
        id: "panna-cotta-amarena",
        name: "Panna cotta all’amarena",
        dineInPrice: 7.5,
        category: "Dolci",
      },
      {
        id: "cannoli-siciliani",
        name: "Cannoli siciliani",
        dineInPrice: 7.5,
        category: "Dolci",
      },
      {
        id: "limone-ripieno",
        name: "Limone ripieno – Gevulde citroen",
        dineInPrice: 6.5,
        takeawayRestricted: true,
        category: "Dolci",
      },
      {
        id: "affogato",
        name: "Affogato",
        description: "Vanilla ice cream and espresso.",
        dineInPrice: 6.5,
        takeawayRestricted: true,
        category: "Dolci",
      },
    ],
  },
];

export const drinkSections = [
  {
    name: "Aperitivi",
    items: [
      { id: "prosecco", name: "Prosecco", price: 9 },
      { id: "picon-vin-blanc", name: "Picon vin blanc", price: 8 },
      { id: "aperol-spritz", name: "Aperol spritz", price: 9 },
      { id: "limoncello-spritz", name: "Limoncello spritz", price: 9 },
      { id: "gin-mare-tonic", name: "Gin mare – tonic", price: 13 },
      { id: "negroni", name: "Negroni", price: 11 },
      { id: "americano", name: "Americano", price: 10 },
      { id: "martini", name: "Martini bianco/rosso", price: 7.5 },
      { id: "alcohol-free-cocktail", name: "Alcohol-free cocktail: spritz or mojito", price: 7 },
    ],
  },
  {
    name: "Frisdranken",
    items: [
      { id: "coca-cola", name: "Coca cola/zero", price: 3 },
      { id: "sprite", name: "Sprite", price: 3 },
      { id: "fuze-tea", name: "Fuze tea", price: 3.2 },
      { id: "san-pellegrino", name: "San Pellegrino", price: 4 },
      { id: "plat-water", name: "Plat water", price: 3 },
      { id: "bruiswater", name: "Bruiswater", price: 3 },
      { id: "karaf-water", name: "Karaf water", price: 4 },
    ],
  },
  {
    name: "Bieren",
    items: [
      { id: "stella-artois", name: "Stella Artois", price: 3.5 },
      { id: "duvel", name: "Duvel", price: 4.5 },
    ],
  },
  {
    name: "Wijnen",
    note: "To be discussed.",
    items: [],
  },
  {
    name: "Koffie",
    items: [
      { id: "espresso", name: "Espresso", price: 3 },
      { id: "koffie-deca", name: "Koffie/deca", price: 3.5 },
      { id: "cappuccino", name: "Cappuccino", price: 4.5 },
      { id: "latte-macchiato", name: "Latte Macchiato", price: 6.5 },
      { id: "italian-coffee", name: "Italian coffee", price: 9.5 },
    ],
  },
  {
    name: "Digestieven",
    items: [
      { id: "limoncello", name: "Limoncello", price: 6 },
      { id: "amaretto", name: "Amaretto", price: 6 },
      { id: "sambuca", name: "Sambuca", price: 6 },
      { id: "grappa", name: "Grappa", price: 6.5 },
      { id: "licor-43", name: "Licor 43", price: 6.5 },
    ],
  },
];

export type TakeawayMenuItem = MenuItem & { takeawayPrice: number };

export const takeawayItems: TakeawayMenuItem[] = menuSections
  .flatMap((section) => section.items)
  .filter(
    (item): item is TakeawayMenuItem =>
      item.takeawayPrice !== undefined && item.takeawayRestricted !== true,
  );
