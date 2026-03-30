// src/components/MuncheezBistro.js
import React, { useState, useEffect } from 'react';

const MuncheezBistro = () => {
  const [activeTab, setActiveTab] = useState('menu');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
    
    // Add keyboard navigation for gallery modal
    const handleKeyDown = (e) => {
      if (selectedGalleryItem) {
        if (e.key === 'ArrowLeft') {
          prevImage();
        } else if (e.key === 'ArrowRight') {
          nextImage();
        } else if (e.key === 'Escape') {
          closeGalleryModal();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedGalleryItem]);

  // ============= COMPLETE MENU =============
  const menuCategories = [
    {
      id: 1,
      name: "🔥 Signature Dishes",
      items: [
        { name: "Red Snapper", price: "KES 1,200", description: "Fresh red snapper grilled to perfection with house spices", image: "/images/menu/red-snapper.jpg" },
        { name: "Meat Platter", price: "KES 2,500", description: "Assorted grilled meats served with dipping sauces", image: "/images/menu/meat-platter.jpg" },
        { name: "Cordon Bleu", price: "KES 1,100", description: "Chicken breast stuffed with ham and cheese, breaded and fried", image: "/images/menu/cordon-bleu.jpg" },
        { name: "King Fish Tikka", price: "KES 1,300", description: "Marinated king fish grilled in traditional tikka style", image: "/images/menu/king-fish-tikka.jpg" },
        { name: "Shredded Pork Spare Ribs", price: "KES 1,500", description: "Slow-cooked ribs with signature BBQ sauce", image: "/images/menu/pork-spare-ribs.jpg" },
        { name: "Pork Chops", price: "KES 1,000", description: "Juicy grilled pork chops with herb butter", image: "/images/menu/pork-chops.jpg" }
      ]
    },
    {
      id: 2,
      name: "🍞 Chapati Specials",
      items: [
        { name: "Chapati Dondo", price: "KES 450", description: "Thick, layered chapati served with beef stew", image: "/images/menu/chapati-dondo.jpg" },
        { name: "Beef Chapati", price: "KES 500", description: "Chapati filled with spiced minced beef", image: "/images/menu/beef-chapati.jpg" },
        { name: "Chapati Chicken", price: "KES 550", description: "Chapati served with flavorful chicken curry", image: "/images/menu/chapati-chicken.jpg" }
      ]
    },
    {
      id: 3,
      name: "🍚 Rice & Pasta",
      items: [
        { name: "Calamari Prawn Bacon Rice", price: "KES 1,400", description: "Seafood delight with calamari, prawns, and bacon", image: "/images/menu/calamari-prawn-rice.jpg" },
        { name: "Vegetable Rice", price: "KES 400", description: "Fragrant rice with fresh vegetables", image: "/images/menu/vegetable-rice.jpg" },
        { name: "Spaghetti & Spicy Lamb Meatballs", price: "KES 1,200", description: "Al dente spaghetti with lamb meatballs in spicy sauce", image: "/images/menu/spaghetti-lamb-meatballs.jpg" }
      ]
    },
    {
      id: 4,
      name: "🍕 Pizza",
      items: [
        { name: "Meat Deluxe Pizza", price: "KES 1,300", description: "Loaded with pepperoni, sausage, beef, and bacon", image: "/images/menu/meat-deluxe-pizza.jpg" }
      ]
    },
    {
      id: 5,
      name: "🍟 Appetizers & Sides",
      items: [
        { name: "Potato Arrowroot Mash", price: "KES 350", description: "Creamy mashed potatoes with arrowroot", image: "/images/menu/potato-arrowroot-mash.jpg" },
        { name: "French Fries", price: "KES 250", description: "Crispy golden fries with special seasoning", image: "/images/menu/french-fries.jpg" },
        { name: "Beef Samosas", price: "KES 300", description: "Crispy pastries filled with spiced beef", image: "/images/menu/beef-samosas.jpg" },
        { name: "Spicy Beef Sausages", price: "KES 400", description: "Grilled sausages with spicy kick", image: "/images/menu/spicy-beef-sausages.jpg" },
        { name: "Vegetable Sandwich", price: "KES 350", description: "Fresh veggies with special sauce", image: "/images/menu/vegetable-sandwich.jpg" },
        { name: "Pancakes", price: "KES 300", description: "Fluffy pancakes served with syrup", image: "/images/menu/pancakes.jpg" }
      ]
    },
    {
      id: 6,
      name: "🐟 Seafood",
      items: [
        { name: "Tuna", price: "KES 1,000", description: "Grilled tuna steak with lemon butter", image: "/images/menu/tuna.jpg" },
        { name: "Calamari", price: "KES 900", description: "Crispy fried calamari rings with aioli", image: "/images/menu/calamari.jpg" }
      ]
    },
    {
      id: 7,
      name: "🍹 Beverages",
      items: [
        { name: "Cocktails", price: "KES 800+", description: "Signature cocktails crafted by expert mixologists", image: "/images/menu/cocktails.jpg" },
        { name: "Pineapple Mint Juice", price: "KES 350", description: "Fresh pineapple with cooling mint", image: "/images/menu/pineapple-mint-juice.jpg" },
        { name: "Passion Juice", price: "KES 300", description: "Tangy fresh passion fruit juice", image: "/images/menu/passion-juice.jpg" },
        { name: "Great Coffee", price: "KES 250", description: "Rich, aromatic coffee", image: "/images/menu/coffee.jpg" },
        { name: "Great Tea", price: "KES 200", description: "Premium teas from around the world", image: "/images/menu/tea.jpg" }
      ]
    },
    {
      id: 8,
      name: "👶 Kids Menu",
      items: [
        { name: "Kids Special Meal", price: "KES 500", description: "Chicken strips, fries, and juice", image: "/images/menu/kids-meal.jpg" }
      ]
    }
  ];

  // ============= ENHANCED BISTRO GALLERY WITH MULTIPLE IMAGES =============
  const bistroGallery = [
    { 
      id: 1, 
      title: "Cozy Interior", 
      description: "Warm and inviting atmosphere perfect for relaxation", 
      images: [
        "/images/bistro/interior-main.jpg",
        "/images/bistro/interior-seating.jpg",
        "/images/bistro/interior-lighting.jpg",
        "/images/bistro/interior-decor.jpg"
      ],
      thumbnail: "/images/bistro/interior-main.jpg"
    },
    { 
      id: 2, 
      title: "Bar Area", 
      description: "Great cocktails and friendly service from expert mixologists", 
      images: [
        "/images/bistro/bar-main.jpg",
        "/images/bistro/bar-counter.jpg",
        "/images/bistro/bar-drinks.jpg",
        "/images/bistro/bar-seating.jpg"
      ],
      thumbnail: "/images/bistro/bar-main.jpg"
    },
    { 
      id: 3, 
      title: "Seating Areas", 
      description: "Comfortable booth, counter, and outdoor seating options", 
      images: [
        "/images/bistro/seating-booths.jpg",
        "/images/bistro/seating-counter.jpg",
        "/images/bistro/seating-outdoor.jpg",
        "/images/bistro/seating-private.jpg"
      ],
      thumbnail: "/images/bistro/seating-booths.jpg"
    },
    { 
      id: 4, 
      title: "Board Games Corner", 
      description: "Fun games for friends and family to enjoy together", 
      images: [
        "/images/bistro/games-main.jpg",
        "/images/bistro/games-collection.jpg",
        "/images/bistro/games-playing.jpg",
        "/images/bistro/games-corner.jpg"
      ],
      thumbnail: "/images/bistro/games-main.jpg"
    },
    { 
      id: 5, 
      title: "Bistro Exterior", 
      description: "Beautiful Northern Bypass location with stunning views", 
      images: [
        "/images/bistro/exterior-front.jpg",
        "/images/bistro/exterior-sign.jpg",
        "/images/bistro/exterior-night.jpg",
        "/images/bistro/exterior-parking.jpg"
      ],
      thumbnail: "/images/bistro/exterior-front.jpg"
    },
    { 
      id: 6, 
      title: "Food Presentation", 
      description: "Beautifully plated dishes that delight both eyes and palate", 
      images: [
        "/images/bistro/food-platter.jpg",
        "/images/bistro/food-main-course.jpg",
        "/images/bistro/food-desserts.jpg",
        "/images/bistro/food-appetizers.jpg"
      ],
      thumbnail: "/images/bistro/food-platter.jpg"
    },
    { 
      id: 7, 
      title: "Cocktail Hour", 
      description: "Perfect drinks for every occasion and celebration", 
      images: [
        "/images/bistro/cocktails-signature.jpg",
        "/images/bistro/cocktails-mocktails.jpg",
        "/images/bistro/cocktails-making.jpg",
        "/images/bistro/cocktails-serving.jpg"
      ],
      thumbnail: "/images/bistro/cocktails-signature.jpg"
    },
    { 
      id: 8, 
      title: "Happy Atmosphere", 
      description: "Creating memorable experiences for every guest", 
      images: [
        "/images/bistro/atmosphere-crowd.jpg",
        "/images/bistro/atmosphere-celebration.jpg",
        "/images/bistro/atmosphere-family.jpg",
        "/images/bistro/atmosphere-evening.jpg"
      ],
      thumbnail: "/images/bistro/atmosphere-crowd.jpg"
    },
    { 
      id: 9, 
      title: "Special Events", 
      description: "Birthday celebrations, corporate events, and private parties", 
      images: [
        "/images/bistro/events-birthday.jpg",
        "/images/bistro/events-corporate.jpg",
        "/images/bistro/events-decorations.jpg",
        "/images/bistro/events-catering.jpg"
      ],
      thumbnail: "/images/bistro/events-birthday.jpg"
    },
    { 
      id: 10, 
      title: "Kitchen & Chef", 
      description: "See where the magic happens - our professional kitchen", 
      images: [
        "/images/bistro/kitchen-chef.jpg",
        "/images/bistro/kitchen-preparation.jpg",
        "/images/bistro/kitchen-grilling.jpg",
        "/images/bistro/kitchen-plating.jpg"
      ],
      thumbnail: "/images/bistro/kitchen-chef.jpg"
    }
  ];

  // ============= CUSTOMER REVIEWS =============
  const reviews = [
    { name: "Jim", rating: 5, text: "Muncheez has always been my go-to spot for savory dishes, ambiance, and a cozy working space. Recently hosted a birthday there and it was nothing short of magnificent!! They also have board games for friend-groups.", date: "2 weeks ago" },
    { name: "Feisal Anthony Nair", rating: 5, text: "The vibe is groovy! The food was fantastic. Served on wooden plates and well placed. The flavour was next level. The chef knows his spices and flavours!", date: "1 month ago" },
    { name: "Eshter Irungu", rating: 5, text: "Beautiful place, best food in Ruiru guaranteed! Very clean and good service. I had take out pork chops and they were amazing!", date: "3 weeks ago" },
    { name: "Nelson Chege", rating: 5, text: "Loved the pork and sautte. The lady at the reception is gorgeous and respectful. The staff was really helpful when it came to choosing the meal.", date: "2 months ago" },
    { name: "Tracy Kwamboka", rating: 4, text: "Welll......the cocktail 🍸🍸 🍹🍹🍹 They were a plus for me...y'all should go and try them out!", date: "1 week ago" },
    { name: "Daniel Macharia", rating: 5, text: "Everytime I'm visiting with my family, Muncheez Bistro is the place to be. Good food, good vibes from both the owners and the employees. The owners David & Jackie are so wonderful!", date: "3 months ago" },
    { name: "Wallace Wakach", rating: 5, text: "The food here is delicious and prepared well. I specifically love their French fries 🍟. Come on over and have your pellets tinkled.", date: "2 weeks ago" }
  ];

  // ============= AMENITIES =============
  const amenities = {
    serviceOptions: ["Delivery", "Takeaway", "Dine-in", "Drive-through"],
    atmosphere: ["Casual", "Cosy", "Trendy", "Romantic", "Quiet"],
    amenities: ["Bar on site", "Free Wi-Fi", "Toilet", "Kids' area", "Board Games", "Card Games", "Air Conditioning", "Outdoor Seating"],
    parking: ["Free parking lot", "Free street parking", "Plenty of parking", "Secure parking"],
    accessibility: ["Wheelchair-accessible entrance", "Wheelchair-accessible seating", "Wheelchair-accessible toilet", "Wheelchair-accessible car park"],
    payments: ["Credit cards", "Debit cards", "NFC mobile payments", "M-Pesa", "Cash"]
  };

  // ============= SPECIAL OFFERS =============
  const specialOffers = [
    { title: "Happy Hour", description: "Buy 1 Get 1 Free on Cocktails", time: "5PM - 7PM Daily", icon: "🍹" },
    { title: "Family Package", description: "Get 20% off on orders above KES 3000", time: "All day", icon: "👨‍👩‍👧‍👦" },
    { title: "Student Discount", description: "10% off with valid student ID", time: "Monday - Thursday", icon: "🎓" }
  ];

  const renderStars = (rating) => {
    return (
      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <span key={i}>{i < rating ? '★' : '☆'}</span>
        ))}
      </div>
    );
  };

  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/400x300?text=Image+Coming+Soon";
  };

  const openGalleryModal = (galleryItem, index = 0) => {
    setSelectedGalleryItem(galleryItem);
    setCurrentImageIndex(index);
  };

  const closeGalleryModal = () => {
    setSelectedGalleryItem(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedGalleryItem) {
      setCurrentImageIndex((prev) => 
        prev === selectedGalleryItem.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedGalleryItem) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedGalleryItem.images.length - 1 : prev - 1
      );
    }
  };

  const showToastMessage = (message, type = 'info') => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-amber-800">Loading Muncheez Bistro...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Hero Section */}
      <div className="hero">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-3">Muncheez Bistro</h1>
          <p className="text-xl md:text-2xl text-amber-200 italic">"Good Food, Good Vibes"</p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <span className="badge">📍 Northern Bypass Road, Membley, Nairobi</span>
            <span className="badge">🕐 8:00 AM - 10:00 PM Daily</span>
            <span className="badge">📞 0726 592499</span>
          </div>
        </div>
      </div>

      {/* Quick Info Bar */}
      <div className="info-bar">
        <div className="info-item">
          <span>🕐</span>
          <span className="font-semibold">Open Daily: 8AM - 10PM</span>
        </div>
        <a href="tel:0726592499" className="info-item">
          <span>📞</span>
          <span>0726 592499</span>
        </a>
        <div className="info-item">
          <span>🛵</span>
          <span>Order on <span className="font-bold text-amber-600">Glovo</span></span>
        </div>
        <div className="info-item">
          <span>🎲</span>
          <span>Board Games Available</span>
        </div>
        <div className="info-item" onClick={() => showToastMessage('Coming soon!', 'info')} style={{ cursor: 'pointer' }}>
          <span>⭐</span>
          <span>Leave a Review</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="container">
        <div className="tabs">
          <button
            onClick={() => setActiveTab('menu')}
            className={`tab-btn ${activeTab === 'menu' ? 'active' : ''}`}
          >
            🍽️ Menu
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}
          >
            📸 Gallery ({bistroGallery.length} Albums)
          </button>
          <button
            onClick={() => setActiveTab('offers')}
            className={`tab-btn ${activeTab === 'offers' ? 'active' : ''}`}
          >
            🎁 Special Offers
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
          >
            💬 Reviews
          </button>
          <button
            onClick={() => setActiveTab('info')}
            className={`tab-btn ${activeTab === 'info' ? 'active' : ''}`}
          >
            ℹ️ Info
          </button>
        </div>

        {/* ========== MENU TAB ========== */}
        {activeTab === 'menu' && (
          <div className="py-8 animate-fadeInUp">
            <h2 className="section-title">Our Menu</h2>
            <p className="section-subtitle">Freshly prepared with love and the finest ingredients</p>
            
            {menuCategories.map((category) => (
              <div key={category.id}>
                <h3 className="category-header">{category.name}</h3>
                <div className="grid">
                  {category.items.map((item, idx) => (
                    <div key={idx} className="card" onClick={() => showToastMessage(`Added ${item.name} to cart`, 'success')}>
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="card-img"
                          onError={handleImageError}
                        />
                      </div>
                      <div className="card-content">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="card-title">{item.name}</h4>
                          <span className="card-price">{item.price}</span>
                        </div>
                        <p className="text-gray-500 text-sm">{item.description}</p>
                        <button className="mt-3 w-full bg-amber-100 text-amber-700 py-2 rounded-lg hover:bg-amber-200 transition">
                          Order Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========== GALLERY TAB ========== */}
        {activeTab === 'gallery' && (
          <div className="py-8 animate-fadeInUp">
            <h2 className="section-title">Bistro Gallery</h2>
            <p className="section-subtitle">Explore our bistro through these beautiful moments</p>
            
            <div className="gallery-grid">
              {bistroGallery.map((album) => (
                <div 
                  key={album.id} 
                  className="gallery-card"
                  onClick={() => openGalleryModal(album)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={album.thumbnail} 
                      alt={album.title}
                      className="gallery-card-img"
                      onError={handleImageError}
                    />
                    <div className="gallery-card-badge">
                      📸 {album.images.length} Photos
                    </div>
                    <div className="gallery-card-overlay">
                      <span className="text-white text-4xl">🔍</span>
                    </div>
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">{album.title}</h3>
                    <p className="text-gray-500 text-sm mb-2">{album.description}</p>
                    <div className="flex gap-1 text-amber-500 text-sm">
                      {Array(Math.min(album.images.length, 4)).fill().map((_, i) => (
                        <span key={i}>📷</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Gallery Stats */}
            <div className="mt-12 bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-6 text-center">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-3xl font-bold text-amber-800">{bistroGallery.length}</div>
                  <div className="text-sm text-amber-700">Photo Albums</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-800">
                    {bistroGallery.reduce((total, album) => total + album.images.length, 0)}
                  </div>
                  <div className="text-sm text-amber-700">Total Photos</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-800">10+</div>
                  <div className="text-sm text-amber-700">Events Covered</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-800">2024</div>
                  <div className="text-sm text-amber-700">Latest Updates</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========== OFFERS TAB ========== */}
        {activeTab === 'offers' && (
          <div className="py-8 animate-fadeInUp">
            <h2 className="section-title">Special Offers</h2>
            <p className="section-subtitle">Don't miss out on our amazing deals!</p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {specialOffers.map((offer, idx) => (
                <div key={idx} className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
                  <div className="text-4xl mb-3">{offer.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                  <p className="text-amber-100 mb-2">{offer.description}</p>
                  <p className="text-sm text-amber-200">⏰ {offer.time}</p>
                </div>
              ))}
            </div>

            {/* Loyalty Program */}
            <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-amber-800 mb-3">⭐ Loyalty Program</h3>
              <p className="text-gray-600 mb-4">Earn points with every visit and redeem for free meals!</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full">100 points = Free Coffee</span>
                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full">500 points = 20% Off</span>
                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full">1000 points = Free Meal</span>
              </div>
            </div>
          </div>
        )}

        {/* ========== REVIEWS TAB ========== */}
        {activeTab === 'reviews' && (
          <div className="py-8 animate-fadeInUp">
            <h2 className="section-title">Customer Reviews</h2>
            <p className="section-subtitle">What our guests are saying</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {reviews.map((review, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-amber-800">{review.name}</h3>
                      <p className="text-xs text-gray-400">{review.date}</p>
                    </div>
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-gray-600 italic leading-relaxed">"{review.text}"</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-6 text-center">
              <div className="flex justify-center items-center gap-2 mb-2">
                <span className="text-4xl">⭐</span>
                <span className="text-3xl font-bold text-amber-800">4.9</span>
                <span className="text-gray-600">out of 5</span>
              </div>
              <p className="text-amber-800 font-semibold">Average Rating from 100+ Reviews</p>
              <p className="text-amber-700 text-sm mt-2">"Best food in Ruiru guaranteed!" - Eshter Irungu</p>
            </div>
          </div>
        )}

        {/* ========== INFO TAB ========== */}
        {activeTab === 'info' && (
          <div className="py-8 animate-fadeInUp">
            <h2 className="section-title">Bistro Information</h2>
            <p className="section-subtitle">Everything you need to know before your visit</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Service Options */}
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                <h3 className="text-xl font-bold text-amber-700 mb-3">🛎️ Service Options</h3>
                <div className="flex flex-wrap gap-2">
                  {amenities.serviceOptions.map((opt, i) => (
                    <span key={i} className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm">{opt}</span>
                  ))}
                </div>
              </div>

              {/* Atmosphere */}
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                <h3 className="text-xl font-bold text-amber-700 mb-3">🎭 Atmosphere</h3>
                <div className="flex flex-wrap gap-2">
                  {amenities.atmosphere.map((item, i) => (
                    <span key={i} className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm">{item}</span>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                <h3 className="text-xl font-bold text-amber-700 mb-3">✨ Amenities</h3>
                <div className="grid grid-cols-2 gap-2">
                  {amenities.amenities.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Parking */}
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                <h3 className="text-xl font-bold text-amber-700 mb-3">🅿️ Parking</h3>
                {amenities.parking.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 mb-2">
                    <span className="text-green-500">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Accessibility */}
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                <h3 className="text-xl font-bold text-amber-700 mb-3">♿ Accessibility</h3>
                {amenities.accessibility.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 mb-2">
                    <span className="text-green-500">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Payments */}
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                <h3 className="text-xl font-bold text-amber-700 mb-3">💳 Payment Methods</h3>
                {amenities.payments.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 mb-2">
                    <span className="text-green-500">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Notes */}
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-6">
                <h3 className="font-bold text-amber-800 mb-2">👨‍🍳 Meet the Owners</h3>
                <p className="text-amber-700">David & Jackie personally check on guests to ensure everything is perfect!</p>
              </div>
              <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-6">
                <h3 className="font-bold text-amber-800 mb-2">📅 Busy Times</h3>
                <p className="text-amber-700">Thursdays through weekends - reservations recommended</p>
              </div>
              <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-6">
                <h3 className="font-bold text-amber-800 mb-2">👨‍👩‍👧‍👦 Family Friendly</h3>
                <p className="text-amber-700">Kids menu, high chairs available, and board games for the whole family!</p>
              </div>
              <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-6">
                <h3 className="font-bold text-amber-800 mb-2">🍽️ Price Range</h3>
                <p className="text-amber-700">KES 500 - KES 4,000 per person (varies by meal selection)</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Map Section */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="map-container">
          <div className="map-header">
            📍 Find Us
          </div>
          <div className="p-4">
            <iframe
              title="Muncheez Bistro Location"
              src="https://maps.google.com/maps?q=RJW8%2B3P%20Nairobi&output=embed"
              className="map-frame"
              allowFullScreen
              loading="lazy"
            ></iframe>
            <p className="text-center text-gray-600 mt-3">📍 Northern Bypass Road, Membley, Nairobi | Code: RJW8+3P</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="max-w-7xl mx-auto px-4">
          <h3>Muncheez Bistro</h3>
          <p>Good Food, Good Vibes</p>
          <div className="footer-links">
            <a href="#" onClick={() => setActiveTab('menu')}>Menu</a>
            <a href="#" onClick={() => setActiveTab('gallery')}>Gallery</a>
            <a href="#" onClick={() => setActiveTab('offers')}>Offers</a>
            <a href="#" onClick={() => setActiveTab('reviews')}>Reviews</a>
            <a href="#" onClick={() => setActiveTab('info')}>Info</a>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span>📞 0726 592499</span>
            <span>🕐 8AM - 10PM Daily</span>
            <span>📍 Northern Bypass, Nairobi</span>
          </div>
          <div className="mt-4 pt-4 border-t border-amber-700 text-xs">
            <p>© 2024 Muncheez Bistro | All Rights Reserved</p>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <button className="fab" onClick={scrollToTop}>
        ↑
      </button>

      {/* Toast Notification */}
      {showToast && (
        <div className="toast toast-info">
          <span>ℹ️</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Single Image Modal */}
      {selectedImage && (
        <div className="modal" onClick={() => setSelectedImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Full view" className="modal-img" />
            <button onClick={() => setSelectedImage(null)} className="modal-close">✕</button>
          </div>
        </div>
      )}

      {/* Gallery Album Modal with Slideshow */}
      {selectedGalleryItem && (
        <div className="slideshow-modal">
          <div className="slideshow-container">
            <div className="slideshow-header">
              <h3>{selectedGalleryItem.title}</h3>
              <p>{selectedGalleryItem.description}</p>
              <p className="text-amber-400 text-sm mt-1">
                {currentImageIndex + 1} / {selectedGalleryItem.images.length} images
              </p>
            </div>
            
            <button className="slideshow-nav slideshow-nav-prev" onClick={prevImage}>
              ◀
            </button>
            
            <button className="slideshow-nav slideshow-nav-next" onClick={nextImage}>
              ▶
            </button>
            
            <div className="flex items-center justify-center h-full min-h-[70vh] p-12">
              <img 
                src={selectedGalleryItem.images[currentImageIndex]} 
                alt={`${selectedGalleryItem.title} - ${currentImageIndex + 1}`}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
                onError={handleImageError}
              />
            </div>
            
            <button className="modal-close" onClick={closeGalleryModal} style={{ top: '1rem', right: '1rem' }}>
              ✕
            </button>
            
            <div className="slideshow-thumbnails">
              {selectedGalleryItem.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`slideshow-thumbnail ${idx === currentImageIndex ? 'active' : ''}`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover rounded" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MuncheezBistro;