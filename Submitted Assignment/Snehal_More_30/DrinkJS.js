class MenuComponent extends HTMLElement {
  // Default configuration and data
  defaultConfig = {
    wrapperClass: 'menu-wrapper',
    backgroundClass: 'menu-background',
    contentClass: 'menu-content',
    headerClass: 'menu-header',
    restaurantClass: 'restaurant-name',
    discriptionClass: 'restaurant-description',
    cataName: 'cataName',
    categoryClass: 'category-name',
    subcategoryClass: 'subcategory-name',
    specialitemClass: 'special-item',
    cocktailitemsClass: 'cocktail-item'
  };
  defaultData = {
    images: [
      { src: 'IMG/glass1.png', class: 'img1', alt: 'img1' },
      { src: 'IMG/glass2.png', class: 'img2', alt: 'img2' },
      { src: 'IMG/leafcut1.png', class: 'img3', alt: 'img3' },
      { src: 'IMG/leafcut2.png', class: 'img4', alt: 'img4' },
      { src: 'IMG/sparkle.png', class: 'img5', alt: 'img5' },
      { src: 'IMG/sparkle.png', class: 'img6', alt: 'img6' },
    ],
    restaurant: 'Drinks',
    discription: 'menu',
    category: 'Specials',
    subcategory: 'Cocktails',
    specialitems: [
      { name: 'Special Orange Ice', price: '$3.99' },
      { name: 'Special Blue Cocktail', price: '$3.99' },
      { name: 'Special Kiwi Fruit Ice', price: '$4.50' },
      { name: 'Special Iced Lemon', price: '$6.00' },
      { name: 'Special Iced Tea', price: '$7.50' },
    ],
    cocktailitems: [
      { name: 'Classic Mojito', price: '$3.99' },
      { name: 'Royal Martini', price: '$3.99' },
      { name: 'Raspberry Mojito', price: '$4.50' },
      { name: 'Retro Margarita', price: '$6.00' },
      { name: 'Classic Margarita', price: '$7.50' },
    ],
  };

  constructor() {
    super();
    this.config = this.defaultConfig;
    this.data = this.defaultData;

    // Attach a shadow root
    const shadow = this.attachShadow({ mode: 'open' });

    // Load external CSS file
    const linkElement = document.createElement('link');
    linkElement.setAttribute('rel', 'stylesheet');
    linkElement.setAttribute('href', 'drink.css');
    shadow.appendChild(linkElement);

    // wrapper div created  for the menu card
    this.wrapper = document.createElement('div');
    shadow.appendChild(this.wrapper); 
  }

  static get observedAttributes() {
    return ['config', 'data'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      try {
        if (name === 'config') {
          this.config = { ...this.defaultConfig, ...JSON.parse(newValue) };
        }
        if (name === 'data') {
          this.data = { ...this.defaultData, ...JSON.parse(newValue) };
        }
      } catch (e) {
        console.error(`Invalid JSON for ${name}:`, e);
      }
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.wrapper.innerHTML = ''; // Clear previous content
    const config = this.config || this.defaultConfig;
    const data = this.data || this.defaultData;

    // Apply wrapper class
    this.wrapper.classList.add(config.wrapperClass);  // class define in config

    // Background
    const background = document.createElement('div');
    background.classList.add(config.backgroundClass);
    this.wrapper.appendChild(background);


    
    // Images empty div
    const imageContainer = document.createElement('div');
    data.images.forEach((img) => {
        const imgElement = document.createElement('img');
        imgElement.src = img.src;
        imgElement.alt = img.alt;
        imgElement.classList.add(img.class);
        imageContainer.appendChild(imgElement);
    });
    background.appendChild(imageContainer);


    // Created Menu Content div
    const content = document.createElement('div');
    content.classList.add(config.contentClass);
    this.wrapper.appendChild(content);


    // Header
    const header = document.createElement('div');
    header.classList.add(config.headerClass);

    // Title and subtitle
    const restaurant = document.createElement('h1');
    restaurant.textContent = data.restaurant;
    restaurant.classList.add(config.restaurantClass);
    header.appendChild(restaurant);

    const discription = document.createElement('h2');
    discription.textContent = data.discription;
    discription.classList.add(config.discriptionClass);
    header.appendChild(discription);

    content.appendChild(header);

    // Categories
    const cataName = document.createElement('div');
    cataName.classList.add(config.cataName);

    const category = document.createElement('div');
    category.classList.add(config.categoryClass);
    category.textContent = data.category;
    cataName.appendChild(category);

    const subcategory = document.createElement('div');
    subcategory.classList.add(config.subcategoryClass);
    subcategory.textContent = data.subcategory;
    cataName.appendChild(subcategory);

    header.appendChild(cataName);

    // Special items
    const specialContainer = document.createElement('div');
    specialContainer.classList.add(config.specialitemClass);
    data.specialitems.forEach((item) => {
        const itemWrapper = document.createElement('div');
        itemWrapper.classList.add('special-item-wrapper');

        const itemName = document.createElement('div');
        itemName.classList.add('special-item-name');
        itemName.textContent = item.name;

        const itemPrice = document.createElement('div');
        itemPrice.classList.add('special-item-price');
        itemPrice.textContent = item.price;

        itemWrapper.appendChild(itemName);
        itemWrapper.appendChild(itemPrice);
        specialContainer.appendChild(itemWrapper);
    });
    content.appendChild(specialContainer);

    // Cocktail items
    const cocktailContainer = document.createElement('div');
    cocktailContainer.classList.add(config.cocktailitemsClass);
    data.cocktailitems.forEach((item) => {
        const itemWrapper = document.createElement('div');
        itemWrapper.classList.add('cocktail-item-wrapper');

        const itemName = document.createElement('div');
        itemName.classList.add('cocktail-item-name');
        itemName.textContent = item.name;

        const itemPrice = document.createElement('div');
        itemPrice.classList.add('cocktail-item-price');
        itemPrice.textContent = item.price;

        itemWrapper.appendChild(itemName);
        itemWrapper.appendChild(itemPrice);
        cocktailContainer.appendChild(itemWrapper);
    });
    content.appendChild(cocktailContainer);
}

}

customElements.define('menu-component', MenuComponent);
