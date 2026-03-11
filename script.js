// Movie Data with Unique WhatsApp Numbers, Dynamic Ticket Prices, and Release Status
const movies = [
    {
        id: 1,
        title: "Izzat - Dehati Movie Khurja",
        poster: "https://i.ibb.co/m5d6ZNfm/Whats-App-Image-2026-03-11-at-9-06-12-AM.jpg",
        date: "17 Mar 2026",
        timings: ["03:00 PM"],
        description: "<strong>Director:</strong> Prashant<br><strong>Hero:</strong> Prashant | <strong>Heroine:</strong> Himani<br><strong>Cast:</strong> Sourya, Manish Solanki, Sobha, Gabbar, Khushi, Bhumika & others.<br><strong>Address:</strong> Khurja Cinema, Moon City",
        whatsappNumber: "918449802289",
        normalPrice: 120,
        vipPrice: 290,
        status: "now_showing", // Options: "now_showing" or "coming_soon"
        likes: 124
    },
    {
        id: 2,
        title: "Galactic Wars",
        poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop",
        date: "12 Mar 2026",
        timings: ["06:30 PM"],
        description: "An epic space opera following a rebel alliance fighting against a tyrannical galactic empire to restore peace.",
        whatsappNumber: "917253076672",
        normalPrice: 150,
        vipPrice: 350,
        status: "coming_soon",
        likes: 89
    },
    {
        id: 3,
        title: "Haunted Shadows",
        poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=800&auto=format&fit=crop",
        date: "13 Mar 2026",
        timings: ["05:15 PM"],
        description: "A family moves into a remote mansion only to discover they are not alone. A chilling and suspenseful horror experience.",
        whatsappNumber: "917253076673",
        normalPrice: 100,
        vipPrice: 250,
        status: "coming_soon",
        likes: 215
    },
    {
        id: 4,
        title: "Comedy Nights",
        poster: "https://images.unsplash.com/photo-1585951237318-9ea5e175b891?q=80&w=800&auto=format&fit=crop",
        date: "13 Mar 2026",
        timings: ["03:30 PM"],
        description: "Get ready to laugh out loud in this hilarious comedy featuring a star-studded cast blending humor and heart.",
        whatsappNumber: "917253076674",
        normalPrice: 110,
        vipPrice: 280,
        status: "coming_soon",
        likes: 342
    },
    {
        id: 5,
        title: "The Lost Kingdom",
        poster: "https://images.unsplash.com/photo-1514539079130-25950c84af65?q=80&w=800&auto=format&fit=crop",
        date: "14 Mar 2026",
        timings: ["02:00 PM"],
        description: "An archaeological expedition uncovers a secret passage leading to a magical mythical world full of beasts and treasures.",
        whatsappNumber: "917253076675",
        normalPrice: 130,
        vipPrice: 300,
        status: "coming_soon",
        likes: 156
    },
    {
        id: 6,
        title: "Neon Cyber City",
        poster: "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?q=80&w=800&auto=format&fit=crop",
        date: "14 Mar 2026",
        timings: ["08:15 PM"],
        description: "In a dystopian cyberpunk future, an underground hacker attempts to take down the mega-corporations controlling society.",
        whatsappNumber: "917253076676",
        normalPrice: 160,
        vipPrice: 400,
        status: "coming_soon",
        likes: 412
    },
    {
        id: 7,
        title: "Love in Paris",
        poster: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop",
        date: "25 Apr 2026",
        timings: ["TBA"],
        description: "Two strangers visiting the city of lights accidentally bump into each other and fall into a whirlwind romantic adventure.",
        whatsappNumber: "917253076677",
        normalPrice: 120,
        vipPrice: 270,
        status: "coming_soon",
        likes: 72
    },
    {
        id: 8,
        title: "Deep Ocean Secrets",
        poster: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?q=80&w=800&auto=format&fit=crop",
        date: "10 May 2026",
        timings: ["TBA"],
        description: "A team of deep-sea explorers discovers a fascinating unknown species at the bottom of the Mariana Trench.",
        whatsappNumber: "917253076678",
        normalPrice: 140,
        vipPrice: 320,
        status: "coming_soon",
        likes: 198
    }
];

// DOM Elements
const movieGrid = document.getElementById("movie-grid");
const modal = document.getElementById("booking-modal");
const closeBtn = document.getElementById("close-btn");
const bookingForm = document.getElementById("booking-form");
const modalMovieTitle = document.getElementById("modal-movie-title");
const normalTicketCountInput = document.getElementById("normal-ticket-count");
const vipTicketCountInput = document.getElementById("vip-ticket-count");
const normalTicketLabel = document.getElementById("normal-ticket-label");
const vipTicketLabel = document.getElementById("vip-ticket-label");
const totalPriceEl = document.getElementById("total-price");

let selectedMovieTitle = "";
let selectedMovieDate = "";
let selectedMovieTime = "";
let selectedMovieWhatsapp = "";
let selectedNormalPrice = 120;
let selectedVipPrice = 290;

// 1. Initial Render of Movie Cards
function renderMovies() {
    movieGrid.innerHTML = "";

    movies.forEach(movie => {
        // Create Movie Card HTML
        const card = document.createElement("div");
        card.className = "movie-card";
        card.innerHTML = `
            <div class="movie-poster-wrapper">
                <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
            </div>
            <div class="movie-info">
                <div class="title-like-row">
                    <h3 class="movie-title">${movie.title}</h3>
                    <div class="like-btn-container" onclick="toggleLike(${movie.id})">
                        <svg class="heart-icon" id="heart-icon-${movie.id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </div>
                </div>
                <div class="desc-toggle" onclick="toggleDescription(${movie.id})">
                    <span class="desc-toggle-text">Storyline</span>
                    <span class="desc-toggle-icon" id="desc-icon-${movie.id}">▼</span>
                </div>
                <div class="movie-description-wrapper" id="desc-wrapper-${movie.id}">
                    <p class="movie-description">${movie.description}</p>
                </div>
                ${movie.status === 'coming_soon' ? '<div style="flex-grow: 1; margin-bottom: 25px;"></div>' : `
                <div class="show-timings">
                    <span class="timing-tag">DATE: ${movie.date}</span>
                    <span class="timing-tag">TIME: ${movie.timings[0]}</span>
                </div>`}
                <!-- Pass exact ID to trigger modal correctly -->
                ${movie.status === 'coming_soon'
                ? `<button class="btn btn-disabled" disabled style="background-color: #333; color: #888; cursor: not-allowed; box-shadow: none;">Coming Soon</button>`
                : `<button class="btn btn-primary" onclick="openBookingModal(${movie.id})">Book Ticket</button>`
            }
            </div>
        `;
        movieGrid.appendChild(card);
    });
}

// Toggle movie description visibility
window.toggleDescription = function (movieId) {
    const wrapper = document.getElementById(`desc-wrapper-${movieId}`);
    const icon = document.getElementById(`desc-icon-${movieId}`);

    if (wrapper.classList.contains('expanded')) {
        wrapper.classList.remove('expanded');
        icon.style.transform = 'rotate(0deg)';
    } else {
        wrapper.classList.add('expanded');
        icon.style.transform = 'rotate(180deg)';
    }
}

// Handle Like Toggle Logic
window.toggleLike = function (movieId) {
    const movieIndex = movies.findIndex(m => m.id === movieId);
    if(movieIndex === -1) return;

    const heartIcon = document.getElementById(`heart-icon-${movieId}`);
    
    // Check local storage for user's previous likes
    let userLikes = JSON.parse(localStorage.getItem('khurja_user_likes')) || {};

    if(userLikes[movieId]) {
        // User already liked, so unlike it
        userLikes[movieId] = false;
        heartIcon.classList.remove('liked');
    } else {
        // User hasn't liked, so like it
        userLikes[movieId] = true;
        heartIcon.classList.add('liked');
        
        // Add a small pop animation
        heartIcon.style.transform = 'scale(1.3)';
        setTimeout(() => heartIcon.style.transform = '', 200);
    }

    localStorage.setItem('khurja_user_likes', JSON.stringify(userLikes));
}

// On load, apply saved like states to the DOM
function applySavedLikes() {
    let userLikes = JSON.parse(localStorage.getItem('khurja_user_likes')) || {};
    movies.forEach(movie => {
        if(userLikes[movie.id]) {
            const heartIcon = document.getElementById(`heart-icon-${movie.id}`);
            if(heartIcon) {
                heartIcon.classList.add('liked');
            }
        }
    });
}

// 2. Open Booking Modal
window.openBookingModal = function (movieId) {
    const movie = movies.find(m => m.id === movieId);
    if (!movie) return;

    selectedMovieTitle = movie.title;
    selectedMovieDate = movie.date;
    selectedMovieTime = movie.timings[0];
    selectedMovieWhatsapp = movie.whatsappNumber;
    selectedNormalPrice = movie.normalPrice;
    selectedVipPrice = movie.vipPrice;

    // Update Modal Information
    modalMovieTitle.textContent = movie.title;
    normalTicketLabel.textContent = `Normal Tickets (₹${movie.normalPrice})`;
    vipTicketLabel.textContent = `VIP Tickets (₹${movie.vipPrice})`;

    // Reset Form Fields state and recalculate price
    bookingForm.reset();
    updateTotalPrice();

    // Show Modal using CSS classes for animation
    modal.classList.add("active");
    // Ensure body loses scrollbar while modal open
    document.body.style.overflow = "hidden";
}

// 3. Close Booking Modal
function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
}

// Event Listeners for Closing
closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});
// Allow closing via Escape key
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
    }
})

// 4. Update Total Price dynamically
function updateTotalPrice() {
    const normalCount = parseInt(normalTicketCountInput.value) || 0;
    const vipCount = parseInt(vipTicketCountInput.value) || 0;

    const total = (normalCount * selectedNormalPrice) + (vipCount * selectedVipPrice);
    totalPriceEl.textContent = `₹${total}`;
}

// Listen to changes in selections
normalTicketCountInput.addEventListener("input", updateTotalPrice);
vipTicketCountInput.addEventListener("input", updateTotalPrice);

// 5. Handle Booking Submission & WhatsApp Redirect
bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // 1. Gather all data
    const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();

    const normalCount = parseInt(normalTicketCountInput.value) || 0;
    const vipCount = parseInt(vipTicketCountInput.value) || 0;

    if (normalCount === 0 && vipCount === 0) {
        alert("Please select at least one ticket to proceed.");
        return;
    }

    const totalRaw = (normalCount * selectedNormalPrice) + (vipCount * selectedVipPrice);

    // 2. Formulate Message exactly as requested
    const message = `Hello, I want to book movie tickets.

Name: ${name}
Mobile: ${mobile}
Movie: ${selectedMovieTitle}
Date: ${selectedMovieDate}
Time: ${selectedMovieTime}
Normal Tickets: ${normalCount} x ₹${selectedNormalPrice}
VIP Tickets: ${vipCount} x ₹${selectedVipPrice}
Total Price: ₹${totalRaw}`;

    // 3. Encode for URL format
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${selectedMovieWhatsapp}?text=${encodedMessage}`;

    // 4. Redirect
    window.open(whatsappUrl, '_blank');

    // 5. Auto close modal upon triggering request
    closeModal();
});

// Boot the App
renderMovies();
applySavedLikes();

// Hero Background Image Slider
const heroSection = document.querySelector('.hero');
if (heroSection) {
    const heroImages = [
        "https://i.ibb.co/m5d6ZNfm/Whats-App-Image-2026-03-11-at-9-06-12-AM.jpg", // WhatsApp Promotio
        "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop", // Cinema Hall
        "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=2070&auto=format&fit=crop", // Movie Roll
        "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2070&auto=format&fit=crop", // Filming Action
        "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2070&auto=format&fit=crop"  // Cinema Spotlight
    ];
    let currentHeroImageIndex = 0;

    // Preload images for smooth transition without flashing
    heroImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Change Background Every 2.5 Seconds
    setInterval(() => {
        currentHeroImageIndex = (currentHeroImageIndex + 1) % heroImages.length;
        heroSection.style.background = `url('${heroImages[currentHeroImageIndex]}') center/contain no-repeat #000`;
    }, 2500);
}


