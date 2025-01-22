class MenuComponent extends HTMLElement {
  //default configuration with class name for various elements

  defaultConfig = {
    containerclass: 'menu-container',
    backgroundClass: 'menu-background',
    headerClass: 'menu-header',
    titleClass: 'menu-title',
    subtitleClass: 'menu-subtitle',
    cataName: 'cataName',
    categoryClass: 'category-name',
    subcategoryClass: 'subcategory-name',
    specialitemClass: 'special-item',
    cocktailitemsClass: 'cocktail-item',
    borders: ['border1', 'border2']
  };
  //default data
  defaultData = {
    images: [
      { "src": "IMG/glass1.png", "class": "img1", "alt": "img1" },
      { "src": "IMG/glass2.png", "class": "img2", "alt": "img2" },
      { "src": "IMG/leafcut1.png", "class": "img3", "alt": "img3" },
      { "src": "IMG/leafcut2.png", "class": "img4", "alt": "img4" },
      { "src": "IMG/sparkle.png", "class": "img5", "alt": "img5" },
      { "src": "IMG/sparkle.png", "class": "img6", "alt": "img6" },
      { "src": "IMG/sparkle.png", "class": "img7", "alt": "img7" },
      { "src": "IMG/sparkle.png", "class": "img8", "alt": "img8" },
      { "src": "IMG/sparkle.png", "class": "img9", "alt": "img9" },
      { "src": "IMG/sparkle.png", "class": "img10", "alt": "img10"}
    ],

    title: "Drinks",
    subtitle: "menu",
    category: "Specials",
    subcategory: "Cocktails",
    specialitems: [
      { name: "Special Orange Ice", price: "$3.99" },
      { name: "Special Blue Cocktail", price: "$3.99" },
      { name: "Special Kiwi Fruit Ice", price: "$4.50" },
      { name: "Special Iced Lemon", price: "$6.00" },
      { name: "Special Iced Tea", price: "$7.50" }
    ],
    cocktailitems: [
      { name: "Classic Mojito", price: "$3.99" },
      { name: "Royal Martini", price: "$3.99" },
      { name: "Raspberry Mojito", price: "$4.50" },
      { name: "Retro Margarita", price: "$6.00" },
      { name: "Classic Margarita", price: "$7.50" }
    ]
  };

  constructor() {
    super();
    this.config = this.defaultConfig;
    this.data = this.defaultData;
    // Attach a shadow root
    const shadow = this.attachShadow({ mode: "open" });

    //Load External CSS File
    const linkElement = document.createElement("link");
    linkElement.setAttribute('rel', 'StyleSheet');
    linkElement.setAttribute('href', 'drink.css');
    shadow.appendChild(linkElement);

    //Create container for the menu card
    this.container = document.createElement('div');
    shadow.appendChild(this.container);
  }



  static get observedAttributes() {
    return ["config", "data"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === 'config' && newValue) {
        try {
          const customConfig = JSON.parse(newValue);
          this.config = { ...this.defaultConfig, ...customConfig } //merge the default config with the custom config.
        } catch (e) {
          console.error('invalid config JSON:', e)
        }
      }
      this.render()
    }
  }
  connectedCallback() {
    this.render();
  }
  render() {
    this.container.innerHTML = ''; // clear previous content

    //use the provided config and data, otherwise fallback to defaults
    const config = this.config || this.defaultConfig;
    const data = this.data || this.defaultData;

    //apply the container class
    this.container.classList.add(config.containerclass);

    //background 
    const background = document.createElement('div');
    background.classList.add(config.backgroundClass);
    this.container.appendChild(background);

    //border1
    const border1 = document.createElement('div');
    border1.classList.add('border1');
    background.appendChild(border1);

    //border2
    const border2 = document.createElement('div');
    border2.classList.add('border2');
    background.appendChild(border2);

    //header
    const header = document.createElement('div');
    header.classList.add(config.headerClass);

    //add Title
    const title = document.createElement('h1');
    title.textContent = data.title || this.defaultData.title;
    title.classList.add(config.titleClass);
    header.appendChild(title);
    //add subtitle
    const subtitle = document.createElement('h2');
    subtitle.textContent = data.subtitle || this.defaultData.subtitle; //fallback to default subtitle
    subtitle.classList.add(config.subtitleClass);
    header.appendChild(subtitle);

    //category 1 div
    const cataName = document.createElement('div');
    cataName.classList.add(config.cataName)
    header.appendChild(cataName)

    //add special category name
    const category = document.createElement('div');
    category.classList.add(config.categoryClass);
    cataName.appendChild(category);
    
    
    const specialsDiv = document.createElement('div');
    specialsDiv.textContent = data.category ||this.defaultData.category;
    specialsDiv.classList.add('specials'); // Adjust class name as needed
    category.appendChild(specialsDiv);




    //add cocktail category name
    const subcategory = document.createElement('div');
    subcategory.classList.add(config.subcategoryClass);
    cataName.appendChild(subcategory);

    const cocktailsDiv = document.createElement('div');
    cocktailsDiv.textContent = data.subcategory ||this.defaultData.subcategory;
    cocktailsDiv.classList.add('cocktails'); // Adjust class name as needed
    subcategory.appendChild(cocktailsDiv);


    background.appendChild(header);


    // Add items in special menu

    const specialitemsContainer = document.createElement('div');
    specialitemsContainer.classList.add(config.specialitemClass);
    (data.specialitems || this.defaultData.specialitems).forEach(item => {
      const specialItem = document.createElement('p');

      // Create a span for item name
      const nameSpan = document.createElement('div');
      nameSpan.textContent = item.name;
      nameSpan.classList.add('item-name1'); // Add class for further styling

      // Create a span for item price
      const priceSpan = document.createElement('div');
      priceSpan.textContent = item.price;
      priceSpan.classList.add('item-price1'); // Add class for further styling

      // Append nameSpan and priceSpan to specialItem
      specialItem.appendChild(nameSpan);
      specialItem.appendChild(priceSpan);
      specialitemsContainer.appendChild(specialItem);
    });
    category.appendChild(specialitemsContainer);



    // Add items in cocktail menu
    const cocktailitemsContainer = document.createElement('div');
    cocktailitemsContainer.classList.add(config.cocktailitemsClass);
    (data.cocktailitems || this.defaultData.cocktailitems).forEach(item => {
      const cocktailItem = document.createElement('p');
      // Create a span for item name
      const nameSpan = document.createElement('div');
      nameSpan.textContent = item.name;
      nameSpan.classList.add('item-name2'); // Add class for further styling

      // Create a span for item price
      const priceSpan = document.createElement('div');
      priceSpan.textContent = item.price;
      priceSpan.classList.add('item-price2'); // Add class for further styling

      // Append nameSpan and priceSpan to specialItem
      cocktailItem.appendChild(nameSpan);
      cocktailItem.appendChild(priceSpan);
      cocktailitemsContainer.appendChild(cocktailItem);
    });
    subcategory.appendChild(cocktailitemsContainer);

    //image container
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');
    (data.images || this.defaultData.images).forEach(imgData => {
      const imgElement = document.createElement('img');
      imgElement.src = imgData.src;
      imgElement.alt = imgData.alt;
      imgElement.classList.add(imgData.class);
      imageContainer.appendChild(imgElement);
    });
    background.appendChild(imageContainer);
  }
}

// Define the custom element
customElements.define("menu-component", MenuComponent);
