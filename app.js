// The Daily Craves - Application Logic
// Handles interactive menu, dynamic portions, shopping cart, and WhatsApp checkout

(function() {
  'use strict';

  // State
  let cart = [];
  let selectedPortions = {}; // { itemId: portionIndex }
  let activeCategory = 'all';
  let activeDiet = 'all';
  let searchQuery = '';
  let orderType = 'delivery'; // 'delivery' or 'takeaway'

  // Load cart and details from localStorage
  try {
    const savedCart = localStorage.getItem('tdc_cart');
    if (savedCart) cart = JSON.parse(savedCart);
  } catch (e) {
    console.error('Failed to load cart from storage', e);
  }

  // DOM Elements
  const menuContainer = document.getElementById('menu-container');
  const categoryTabs = document.querySelectorAll('.category-tab-btn');
  const dietPills = document.querySelectorAll('.diet-pill');
  const searchInput = document.getElementById('menu-search');
  const cartDrawerOverlay = document.getElementById('cart-drawer-overlay');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartToggleBtns = document.querySelectorAll('.btn-toggle-cart');
  const cartCloseBtn = document.getElementById('btn-close-cart');
  const cartBadgeHeader = document.getElementById('cart-badge-header');
  const mobileCartCount = document.getElementById('mobile-cart-count');
  const mobileCartTotal = document.getElementById('mobile-cart-total');
  const cartItemsList = document.getElementById('cart-items-list');
  const cartBillSubtotal = document.getElementById('cart-bill-subtotal');
  const cartBillTotal = document.getElementById('cart-bill-total');
  const deliveryMeterText = document.getElementById('delivery-meter-text');
  const deliveryMeterFill = document.getElementById('delivery-meter-fill');
  const btnCheckoutWhatsapp = document.getElementById('btn-checkout-whatsapp');
  const orderTypeBtns = document.querySelectorAll('.order-type-btn');
  const addressGroup = document.getElementById('delivery-address-group');
  const customerNameInput = document.getElementById('cust-name');
  const customerPhoneInput = document.getElementById('cust-phone');
  const customerAddressInput = document.getElementById('cust-address');
  const toastContainer = document.getElementById('toast-container');

  // Load saved customer info
  try {
    if (customerNameInput && localStorage.getItem('tdc_cust_name')) {
      customerNameInput.value = localStorage.getItem('tdc_cust_name');
    }
    if (customerPhoneInput && localStorage.getItem('tdc_cust_phone')) {
      customerPhoneInput.value = localStorage.getItem('tdc_cust_phone');
    }
    if (customerAddressInput && localStorage.getItem('tdc_cust_address')) {
      customerAddressInput.value = localStorage.getItem('tdc_cust_address');
    }
  } catch (e) {}

  // Initialize selected portions default to 0
  MENU_ITEMS.forEach(item => {
    selectedPortions[item.id] = 0;
  });

  // Render Menu
  function renderMenu() {
    if (!menuContainer) return;

    // Filter items
    const filteredItems = MENU_ITEMS.filter(item => {
      const matchesCategory = (activeCategory === 'all') || (item.category === activeCategory);
      const matchesDiet = (activeDiet === 'all') || (item.diet === activeDiet);
      const matchesSearch = !searchQuery || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesDiet && matchesSearch;
    });

    if (filteredItems.length === 0) {
      menuContainer.innerHTML = `
        <div class="empty-search-state" style="text-align: center; padding: 4rem 1rem;">
          <div style="font-size: 3rem; margin-bottom: 0.75rem;">🐼🔍</div>
          <h4 style="font-family: var(--font-heading); font-size: 1.35rem; color: var(--brand-dark); margin-bottom: 0.5rem;">Koi item nahi mila!</h4>
          <p style="color: var(--text-muted); font-size: 0.95rem;">Search query badal kar dekhein ya category filter hata kar dekhein.</p>
          <button id="btn-reset-filters" style="margin-top: 1rem; padding: 0.6rem 1.4rem; background: var(--brand-primary); color: #fff; border-radius: 9999px; font-weight: 600;">Reset Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById('btn-reset-filters');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          activeCategory = 'all';
          activeDiet = 'all';
          searchQuery = '';
          if (searchInput) searchInput.value = '';
          updateTabStates();
          renderMenu();
        });
      }
      return;
    }

    // Group items by category (if showing all, show by category sections)
    let categoriesToDisplay = [];
    if (activeCategory === 'all') {
      categoriesToDisplay = CATEGORIES.filter(cat => cat.id !== 'all');
    } else {
      categoriesToDisplay = CATEGORIES.filter(cat => cat.id === activeCategory);
    }

    let html = '';

    categoriesToDisplay.forEach(cat => {
      const itemsInCat = filteredItems.filter(item => item.category === cat.id);
      if (itemsInCat.length === 0) return;

      html += `
        <div class="category-block" id="cat-${cat.id}">
          <div class="category-header">
            <div class="category-title-group">
              <h3>${cat.icon} ${cat.name}</h3>
              ${cat.note ? `<p class="category-subtitle">${cat.note}</p>` : ''}
            </div>
            <span class="category-badge-count">${itemsInCat.length} ${itemsInCat.length === 1 ? 'dish' : 'items'}</span>
          </div>

          <div class="menu-grid">
            ${itemsInCat.map(item => renderMenuItemCard(item)).join('')}
          </div>
        </div>
      `;
    });

    menuContainer.innerHTML = html;
    attachCardListeners();
  }

  // Render individual item card
  function renderMenuItemCard(item) {
    const selectedIdx = selectedPortions[item.id] || 0;
    const currentPortion = item.portions[selectedIdx] || item.portions[0];
    const cartItem = cart.find(ci => ci.id === item.id && ci.portion === currentPortion.name);
    const inCartQty = cartItem ? cartItem.quantity : 0;

    return `
      <div class="menu-card" data-item-id="${item.id}">
        <div>
          <div class="card-top">
            <div class="diet-indicator ${item.diet}" title="${item.diet === 'veg' ? '100% Pure Vegetarian' : 'Non-Vegetarian'}"></div>
            ${item.badge ? `<span class="item-badge-pill">${item.badge}</span>` : ''}
          </div>

          <h4 class="item-title">${item.name}</h4>
          <p class="item-desc">${item.desc}</p>
        </div>

        <div>
          <!-- Portion selection -->
          <div class="portion-selector-box">
            <div class="portion-label">Select Portion / Size</div>
            <div class="portion-options">
              ${item.portions.map((portion, idx) => `
                <button type="button" 
                  class="portion-btn ${idx === selectedIdx ? 'active' : ''}" 
                  data-portion-idx="${idx}"
                  data-item-id="${item.id}"
                >
                  <span>${portion.name}</span>
                  <span class="portion-price">₹${portion.price}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Bottom Card: Price & Add / Quantity -->
          <div class="card-bottom">
            <div class="current-price-display">
              <span class="price-unit">${currentPortion.name} portion</span>
              <span class="price-amount">₹${currentPortion.price}</span>
            </div>

            <div class="action-wrap">
              ${inCartQty > 0 ? `
                <div class="qty-control">
                  <button class="qty-btn btn-qty-dec" data-item-id="${item.id}" data-portion="${currentPortion.name}">−</button>
                  <span class="qty-value">${inCartQty}</span>
                  <button class="qty-btn btn-qty-inc" data-item-id="${item.id}" data-portion="${currentPortion.name}">+</button>
                </div>
              ` : `
                <button class="btn-add-cart" data-item-id="${item.id}">
                  <span>Add +</span>
                </button>
              `}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Attach card event listeners
  function attachCardListeners() {
    // Portion buttons
    document.querySelectorAll('.portion-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const itemId = btn.dataset.itemId;
        const portionIdx = parseInt(btn.dataset.portionIdx, 10);
        selectedPortions[itemId] = portionIdx;
        
        // Re-render only that card for performance and smooth UX
        const cardEl = document.querySelector(`.menu-card[data-item-id="${itemId}"]`);
        if (cardEl) {
          const item = MENU_ITEMS.find(i => i.id === itemId);
          if (item) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = renderMenuItemCard(item);
            const newCard = tempDiv.firstElementChild;
            cardEl.replaceWith(newCard);
            attachCardListeners();
          }
        }
      });
    });

    // Add to cart buttons
    document.querySelectorAll('.btn-add-cart').forEach(btn => {
      btn.addEventListener('click', () => {
        const itemId = btn.dataset.itemId;
        const item = MENU_ITEMS.find(i => i.id === itemId);
        if (!item) return;

        const portionIdx = selectedPortions[itemId] || 0;
        const portionObj = item.portions[portionIdx];

        addToCart(item, portionObj);
      });
    });

    // Quantity Increment
    document.querySelectorAll('.btn-qty-inc').forEach(btn => {
      btn.addEventListener('click', () => {
        const itemId = btn.dataset.itemId;
        const portion = btn.dataset.portion;
        changeItemQty(itemId, portion, 1);
      });
    });

    // Quantity Decrement
    document.querySelectorAll('.btn-qty-dec').forEach(btn => {
      btn.addEventListener('click', () => {
        const itemId = btn.dataset.itemId;
        const portion = btn.dataset.portion;
        changeItemQty(itemId, portion, -1);
      });
    });
  }

  // Cart Management
  function addToCart(item, portionObj) {
    const existingIndex = cart.findIndex(ci => ci.id === item.id && ci.portion === portionObj.name);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        id: item.id,
        name: item.name,
        portion: portionObj.name,
        price: portionObj.price,
        quantity: 1,
        diet: item.diet,
        category: item.category
      });
    }

    saveCart();
    updateUI();
    showToast(`Added ${item.name} (${portionObj.name}) to cart! 🥟`);
  }

  function changeItemQty(itemId, portion, change) {
    const idx = cart.findIndex(ci => ci.id === itemId && ci.portion === portion);
    if (idx === -1) return;

    cart[idx].quantity += change;

    if (cart[idx].quantity <= 0) {
      cart.splice(idx, 1);
    }

    saveCart();
    updateUI();
  }

  function saveCart() {
    try {
      localStorage.setItem('tdc_cart', JSON.stringify(cart));
    } catch (e) {}
  }

  // Calculate Subtotal & Item Count
  function getCartSummary() {
    let count = 0;
    let total = 0;
    cart.forEach(item => {
      count += item.quantity;
      total += (item.price * item.quantity);
    });
    return { count, total };
  }

  // Update UI Elements
  function updateUI() {
    const { count, total } = getCartSummary();

    // Badges
    if (cartBadgeHeader) cartBadgeHeader.textContent = count;
    if (mobileCartCount) mobileCartCount.textContent = `${count} ${count === 1 ? 'item' : 'items'}`;
    if (mobileCartTotal) mobileCartTotal.textContent = `₹${total}`;

    // Delivery meter
    const minOrder = RESTAURANT_INFO.minOrderDelivery;
    if (deliveryMeterFill && deliveryMeterText) {
      const percentage = Math.min(100, Math.round((total / minOrder) * 100));
      deliveryMeterFill.style.width = `${percentage}%`;

      if (orderType === 'takeaway') {
        deliveryMeterText.innerHTML = `<span>🥡 Cart Pickup / Takeaway Selected</span><span>No Minimum</span>`;
        deliveryMeterFill.classList.add('achieved');
      } else if (total >= minOrder) {
        deliveryMeterText.innerHTML = `<span>🎉 Minimum delivery requirement reached!</span><span>₹${total}/₹${minOrder}</span>`;
        deliveryMeterFill.classList.add('achieved');
      } else {
        const remaining = minOrder - total;
        deliveryMeterText.innerHTML = `<span>🛵 Add <b>₹${remaining}</b> more for delivery</span><span>₹${total}/₹${minOrder}</span>`;
        deliveryMeterFill.classList.remove('achieved');
      }
    }

    // Cart drawer bill
    if (cartBillSubtotal) cartBillSubtotal.textContent = `₹${total}`;
    if (cartBillTotal) cartBillTotal.textContent = `₹${total}`;

    // Render Cart Items in Drawer
    renderCartDrawer();

    // Re-render menu cards to keep quantity counters in sync
    renderMenu();
  }

  // Render Cart Drawer
  function renderCartDrawer() {
    if (!cartItemsList) return;

    if (cart.length === 0) {
      cartItemsList.innerHTML = `
        <div class="empty-cart-state">
          <div class="empty-cart-icon">🐼🥣</div>
          <h4>Aapka Cart Khali Hai!</h4>
          <p>The Daily Craves ke mazedar momos, crispy snacks, cold coffee aur mojitos order karein.</p>
          <button class="btn-primary" onclick="window.closeCartDrawer()">View Menu</button>
        </div>
      `;
      if (btnCheckoutWhatsapp) {
        btnCheckoutWhatsapp.disabled = true;
        btnCheckoutWhatsapp.style.opacity = '0.6';
      }
      return;
    }

    if (btnCheckoutWhatsapp) {
      btnCheckoutWhatsapp.disabled = false;
      btnCheckoutWhatsapp.style.opacity = '1';
    }

    cartItemsList.innerHTML = cart.map(item => `
      <div class="cart-item-row">
        <div class="cart-item-info">
          <div class="cart-item-name">
            <span class="diet-indicator ${item.diet}"></span>
            <span>${item.name}</span>
          </div>
          <div class="cart-item-portion">Size: ${item.portion}</div>
          <div class="cart-item-calc">₹${item.price} × ${item.quantity} = <b>₹${item.price * item.quantity}</b></div>
        </div>

        <div class="qty-control">
          <button class="qty-btn drawer-qty-dec" data-item-id="${item.id}" data-portion="${item.portion}">−</button>
          <span class="qty-value">${item.quantity}</span>
          <button class="qty-btn drawer-qty-inc" data-item-id="${item.id}" data-portion="${item.portion}">+</button>
        </div>
      </div>
    `).join('');

    // Attach listeners in drawer
    cartItemsList.querySelectorAll('.drawer-qty-dec').forEach(btn => {
      btn.addEventListener('click', () => {
        changeItemQty(btn.dataset.itemId, btn.dataset.portion, -1);
      });
    });

    cartItemsList.querySelectorAll('.drawer-qty-inc').forEach(btn => {
      btn.addEventListener('click', () => {
        changeItemQty(btn.dataset.itemId, btn.dataset.portion, 1);
      });
    });
  }

  // Category Tabs Filter
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      activeCategory = tab.dataset.category;
      updateTabStates();
      renderMenu();

      // Scroll to category if specific one chosen
      if (activeCategory !== 'all') {
        const targetEl = document.getElementById(`cat-${activeCategory}`);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  function updateTabStates() {
    categoryTabs.forEach(tab => {
      if (tab.dataset.category === activeCategory) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    dietPills.forEach(pill => {
      if (pill.dataset.diet === activeDiet) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });
  }

  // Diet Filter Pills
  dietPills.forEach(pill => {
    pill.addEventListener('click', () => {
      activeDiet = pill.dataset.diet;
      updateTabStates();
      renderMenu();
    });
  });

  // Search Input Filter
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderMenu();
    });
  }

  // Cart Drawer Open/Close
  function openCartDrawer() {
    if (cartDrawerOverlay) cartDrawerOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCartDrawer() {
    if (cartDrawerOverlay) cartDrawerOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  window.closeCartDrawer = closeCartDrawer;

  cartToggleBtns.forEach(btn => {
    btn.addEventListener('click', openCartDrawer);
  });

  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCartDrawer);

  if (cartDrawerOverlay) {
    cartDrawerOverlay.addEventListener('click', (e) => {
      if (e.target === cartDrawerOverlay) closeCartDrawer();
    });
  }

  // Order Type Selector (Delivery vs Takeaway)
  orderTypeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      orderTypeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      orderType = btn.dataset.type;

      if (orderType === 'takeaway') {
        if (addressGroup) addressGroup.style.display = 'none';
      } else {
        if (addressGroup) addressGroup.style.display = 'flex';
      }

      updateUI();
    });
  });

  // Toast Notification
  function showToast(msg) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>🐼</span><span>${msg}</span>`;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  // WhatsApp Order Generation
  if (btnCheckoutWhatsapp) {
    btnCheckoutWhatsapp.addEventListener('click', () => {
      if (cart.length === 0) {
        alert('Aapka cart khali hai! Kripya menu se items select karein.');
        return;
      }

      const { total } = getCartSummary();
      const minOrder = RESTAURANT_INFO.minOrderDelivery;

      if (orderType === 'delivery' && total < minOrder) {
        const remaining = minOrder - total;
        const proceed = confirm(`Delivery ke liye minimum order ₹${minOrder} hai. Aapko ₹${remaining} ka aur order karna hoga.\n\nKya aap Takeaway / Food Cart Pickup me switch karna chahte hain?`);
        if (proceed) {
          orderType = 'takeaway';
          orderTypeBtns.forEach(b => {
            if (b.dataset.type === 'takeaway') b.classList.add('active');
            else b.classList.remove('active');
          });
          if (addressGroup) addressGroup.style.display = 'none';
          updateUI();
        } else {
          return;
        }
      }

      const name = customerNameInput ? customerNameInput.value.trim() : '';
      const phone = customerPhoneInput ? customerPhoneInput.value.trim() : '';
      const address = customerAddressInput ? customerAddressInput.value.trim() : '';

      // Save to localStorage
      try {
        if (name) localStorage.setItem('tdc_cust_name', name);
        if (phone) localStorage.setItem('tdc_cust_phone', phone);
        if (address) localStorage.setItem('tdc_cust_address', address);
      } catch (e) {}

      // Build formatted WhatsApp message
      let msg = `🐼 *NEW ORDER - THE DAILY CRAVES* 🐼\n`;
      msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
      if (name) msg += `👤 *Customer Name:* ${name}\n`;
      if (phone) msg += `📞 *Contact Number:* ${phone}\n`;
      msg += `🛵 *Order Type:* ${orderType === 'delivery' ? 'Home Delivery' : 'Self Pickup / Food Cart'}\n`;
      if (orderType === 'delivery' && address) {
        msg += `📍 *Delivery Address:* ${address}\n`;
      }
      msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
      msg += `📋 *ORDER ITEMS:*\n\n`;

      cart.forEach((item, i) => {
        msg += `${i + 1}. *${item.name}* (${item.portion})\n`;
        msg += `   └ Qty: ${item.quantity} × ₹${item.price} = ₹${item.quantity * item.price}\n`;
      });

      msg += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
      msg += `💰 *TOTAL AMOUNT: ₹${total}*\n`;
      if (orderType === 'delivery') {
        msg += `🛵 *Delivery Status:* Eligible (Min ₹${minOrder} met)\n`;
      }
      msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
      msg += `❤️ *Note:* Please confirm my order and send estimated preparation time!`;

      // Target WhatsApp number requested by user
      const targetPhone = "91" + RESTAURANT_INFO.phone;
      const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(msg)}`;

      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
    });
  }

  // Initial render
  updateTabStates();
  updateUI();
})();
