if (typeof addToCart === 'undefined') {
  function addToCart(event, productId) {
    event.preventDefault();
    event.stopPropagation();

    const form = event.target.closest('form');
    const button = event.target;
    const cartDrawer = document.querySelector('cart-drawer');

    // Show loading state
    button.classList.add('loading');
    button.disabled = true;

    // Prepare form data
    const formData = new FormData(form);

    // Always add sections to fetch for cart icon update
    if (cartDrawer) {
      formData.append(
        'sections',
        cartDrawer.getSectionsToRender().map((section) => section.id)
      );
      formData.append('sections_url', window.location.pathname);
    }

    // Add to cart - use .js endpoint for JSON response
    const cartAddUrl = window.routes?.cart_add_url 
      ? window.routes.cart_add_url + '.js'
      : '/cart/add.js';
    
    fetch(cartAddUrl, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((response) => {
        if (response.status) {
          // Handle error
          console.error('Error adding to cart:', response.description);
          return;
        }

        // Function to update cart count bubble
        const updateCartCount = (itemCount) => {
          const cartIconBubble = document.getElementById('cart-icon-bubble');
          if (!cartIconBubble) return;

          let cartCountBubble = cartIconBubble.querySelector('.cart-count-bubble');
          
          if (itemCount > 0) {
            if (!cartCountBubble) {
              // Create cart count bubble if it doesn't exist
              cartCountBubble = document.createElement('div');
              cartCountBubble.className = 'cart-count-bubble';
              cartIconBubble.appendChild(cartCountBubble);
            }
            
            // Update the count
            let countSpan = cartCountBubble.querySelector('span[aria-hidden="true"]');
            if (!countSpan) {
              countSpan = document.createElement('span');
              countSpan.setAttribute('aria-hidden', 'true');
              cartCountBubble.appendChild(countSpan);
            }
            countSpan.textContent = itemCount < 100 ? itemCount : '';
            
            // Update screen reader text
            let visuallyHiddenSpan = cartCountBubble.querySelector('.visually-hidden');
            if (!visuallyHiddenSpan) {
              visuallyHiddenSpan = document.createElement('span');
              visuallyHiddenSpan.className = 'visually-hidden';
              cartCountBubble.appendChild(visuallyHiddenSpan);
            }
            visuallyHiddenSpan.textContent = `${itemCount} items`;
          }
        };

        // If cart drawer exists, render contents and open it first
        if (cartDrawer && response.sections) {
          cartDrawer.renderContents(response);
        } else {
          // No cart drawer or no sections - manually update the cart icon
          fetch('/cart.js')
            .then((res) => {
              if (!res.ok) {
                throw new Error('Failed to fetch cart');
              }
              return res.json();
            })
            .then((cart) => {
              updateCartCount(cart.item_count);
            })
            .catch((error) => {
              console.error('Error fetching cart:', error);
            });
        }
      })
      .catch((error) => {
        console.error('Error adding to cart:', error);
      })
      .finally(() => {
        // Reset button state
        button.classList.remove('loading');
        button.disabled = false;
      });

    return false;
  }
}

