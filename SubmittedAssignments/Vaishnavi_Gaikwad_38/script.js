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
      subcategoryClass: 'subcategory-name ',
      specialitemClass: 'special-item',
      cocktailitemsClass: 'cocktail-item',
      classbox : 'box1'

    };
    defaultData = {
      images: [
        { src: 'img/background1.jpeg' },
        { src: 'IMG/img11.png',  class: 'img11', alt: 'img11' },
        { src: 'IMG/img12.png',  class: 'img12', alt: 'img12' },
        { src: 'IMG/img13.png', class: 'img13', alt: 'img13' },
        { src: "IMG/img14.png", class: "img14", alt: "img14" },
        { src: "IMG/img15.png", class: "img15", alt: "img15" },
        { src: "IMG/img16.png", class: "img16", alt: "img16" },
        { src: "IMG/img16.png", class: "img16", alt: "img16" },
        { src: "IMG/img17.png", class: "img17", alt: "img17" },
        { src: "IMG/img18.png", class: "img18", alt: "img18" },
        { src: "IMG/img19.png", class: "img19", alt: "img19" },
        { src: "IMG/img20.png", class: "img20", alt: "img20" },
        { src: "IMG/img21.png", class: "img21", alt: "img21" },
        { src: "IMG/img22.png", class: "img22", alt: "img22" },





      ],
      restaurant: 'PIZZA',
      discription: 'MENU',
      category: '+4536373863',
      subcategory: 'www.pizzahub.com',
      specialitems: [
        { "name": "Pan Pizza.....", "price": "$50" },
        { "name": "Beef Pizza......", "price": "$70" },
        { "name": "Chile Pizza.......", "price": "$40" },
        { "name": "Detroit Pizza......", "price": "$60" },
        { "name": "Chicken Pizza.....", "price": "$50" },
        { "name": "Mushroom Pizza.....", "price": "$30" }
      ],
      cocktailitems: [
        { "name": "Pan Pizza.....", "price": "$50" },
        { "name": "Beef Pizza......", "price": "$70" },
        { "name": "Chile Pizza.......", "price": "$40" },
        { "name": "Detroit Pizza......", "price": "$60" },
        { "name": "Chicken Pizza.....", "price": "$50" },
        { "name": "Mushroom Pizza.....", "price": "$30" }
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
      linkElement.setAttribute('href', 'style.css');
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
  


      // //box
      // const backgroundDiv = document.createElement('div');
      // // backgroundDiv.appendChild(this.createElement('div'));
      // backgroundDiv.classList.add(config.backgroundDiv);
      // wrapper.appendChild(backgroundDiv);

  
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


      // // cardno
      // cardElement.classList.add("card-no");
      // document.getElementById("container").appendChild(cardElement);

  
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
  