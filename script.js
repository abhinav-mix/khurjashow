// Movie Data with Unique WhatsApp Numbers, Dynamic Ticket Prices, and Release Status
const movies = [
    {
        id: 1,
        title: "Izzat - Dehati Movie Khurja",
        poster: "https://i.ibb.co/m5d6ZNfm/Whats-App-Image-2026-03-11-at-9-06-12-AM.jpg",
        date: "17 Mar 2026",
        timings: ["03:00 PM"],
        description: "<strong>Director:</strong> Prashant<br><strong>Hero:</strong> Prashant | <strong>Heroine:</strong> Himani<br><strong>Cast:</strong> Sourya, Manish Solanki, Sobha, Gabbar, Khushi, Bhumika & others.<br><strong>Address:</strong> Khurja Cinema, Moon City",
        whatsappNumber: "917617605850",
        silverPrice: 120,
        goldPrice: 249,
        diamondPrice: 290,
        status: "now_showing", // Options: "now_showing" 
        likes: 245
    },
    {
        id: 2,
        title: "The Kerala Story 2 Goes Beyond (2026)",
        poster: "https://catimages.org/images/2026/02/28/The-Kerala-Story-2-Goes-Beyond-2026-HDHub4u.Ms.jpg",
        date: "12 Mar 2026",
        timings: ["12:00 PM", "03:30 PM", "07:30 PM"],
        description: "<strong>Director:</strong> Kamakhya Narayan Singh<br><strong>Cast:</strong> Ulka Gupta, Aditi Bhatia, Aishwarya Ojha<br>The powerful sequel to the 2023 movie, following three young women across different states as they navigate complex emotional and societal challenges. A gripping narrative of resilience and survival.",
        whatsappNumber: "917253076672",
        silverPrice: 120,
        goldPrice: 190,
        diamondPrice: 290,
        status: "coming_soon",
        likes: 245
    },
    {
        id: 3,
        title: "Honey (2026)",
        poster: "https://image.tmdb.org/t/p/w500/aiDE86ihhMcoDpcCLCHvuUDm0en.jpg",
        date: "13 Mar 2026",
        timings: ["05:15 PM", "09:30 PM"],
        description: "<strong>Director:</strong> Karuna Kumar<br><strong>Cast:</strong> Naveen Chandra, Divya Pillai, Divi Vadthya<br>A gripping psychological horror thriller that explores the dark depths of the human mind. When a peaceful life is disrupted by unsettling events, survival becomes a game of psychological warfare.",
        whatsappNumber: "917253076673",
        silverPrice: 120,
        goldPrice: 190,
        diamondPrice: 290,
        status: "coming_soon",
        likes: 186
    },
    {
        id: 4,
        title: "Official Promotion!",
        poster: "https://i.ibb.co/fYYYsVnJ/Chat-GPT-Image-Mar-11-2026-04-03-08-PM.png",
        description: "<strong>Exclusive Offer:</strong> Follow us on Instagram for the latest updates, movie giveaways, and special discounts! Join our growing community of cinema lovers.",
        status: "promotion",
        externalLink: "https://www.instagram.com/a7allgame/",
        likes: 999
    }
];

// DOM Elements
const movieGrid = document.getElementById("movie-grid");
const modal = document.getElementById("booking-modal");
const closeBtn = document.getElementById("close-btn");
const bookingForm = document.getElementById("booking-form");
const modalMovieTitle = document.getElementById("modal-movie-title");
const silverTicketCountInput = document.getElementById("silver-ticket-count");
const goldTicketCountInput = document.getElementById("gold-ticket-count");
const diamondTicketCountInput = document.getElementById("diamond-ticket-count");
const silverTicketLabel = document.getElementById("silver-ticket-label");
const goldTicketLabel = document.getElementById("gold-ticket-label");
const diamondTicketLabel = document.getElementById("diamond-ticket-label");
const totalPriceEl = document.getElementById("total-price");

let selectedMovieTitle = "";
let selectedMovieDate = "";
let selectedMovieTime = "";
let selectedMovieWhatsapp = "";
let selectedSilverPrice = 120;
let selectedGoldPrice = 190;
let selectedDiamondPrice = 290;

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
                ${movie.status === 'promotion'
                ? `<div class="promotion-badge" style="background: #e91e63; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; width: fit-content; margin-bottom: 10px;">PROMOTION</div>`
                : ''}
                <div class="desc-toggle" onclick="toggleDescription(${movie.id})">
                    <span class="desc-toggle-text">${movie.status === 'promotion' ? 'About Promotion' : 'Storyline'}</span>
                    <span class="desc-toggle-icon" id="desc-icon-${movie.id}">▼</span>
                </div>
                <div class="movie-description-wrapper" id="desc-wrapper-${movie.id}">
                    <p class="movie-description">${movie.description}</p>
                </div>
                ${movie.status === 'coming_soon' ? '<div style="flex-grow: 1; margin-bottom: 25px;"></div>' :
                movie.status === 'promotion' ? '<div style="flex-grow: 1; margin-bottom: 15px;"></div>' : `
                <div class="show-timings">
                    <span class="timing-tag">DATE: ${movie.date}</span>
                    <span class="timing-tag">TIME: ${movie.timings[0]}</span>
                </div>`}
                <!-- Button Logic: Book, Coming Soon, or Continue (for Promotions) -->
                ${movie.status === 'promotion'
                ? `<button class="btn btn-primary" onclick="window.open('${movie.externalLink}', '_blank')" style="background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); border: none;">Continue</button>`
                : movie.status === 'coming_soon'
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
    if (movieIndex === -1) return;

    const heartIcon = document.getElementById(`heart-icon-${movieId}`);

    // Check local storage for user's previous likes
    let userLikes = JSON.parse(localStorage.getItem('khurja_user_likes')) || {};

    if (userLikes[movieId]) {
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
        if (userLikes[movie.id]) {
            const heartIcon = document.getElementById(`heart-icon-${movie.id}`);
            if (heartIcon) {
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
    selectedSilverPrice = movie.silverPrice;
    selectedGoldPrice = movie.goldPrice;
    selectedDiamondPrice = movie.diamondPrice;

    // Update Modal Information
    modalMovieTitle.textContent = movie.title;
    silverTicketLabel.textContent = `Silver Tickets (₹${movie.silverPrice})`;
    goldTicketLabel.textContent = `Gold Tickets (₹${movie.goldPrice})`;
    diamondTicketLabel.textContent = `Diamond Tickets (₹${movie.diamondPrice})`;

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
    const silverCount = parseInt(silverTicketCountInput.value) || 0;
    const goldCount = parseInt(goldTicketCountInput.value) || 0;
    const diamondCount = parseInt(diamondTicketCountInput.value) || 0;

    const total = (silverCount * selectedSilverPrice) + (goldCount * selectedGoldPrice) + (diamondCount * selectedDiamondPrice);
    totalPriceEl.textContent = `₹${total}`;
}

// Listen to changes in selections
silverTicketCountInput.addEventListener("input", updateTotalPrice);
goldTicketCountInput.addEventListener("input", updateTotalPrice);
diamondTicketCountInput.addEventListener("input", updateTotalPrice);

// 5. Handle Booking Submission & WhatsApp Redirect
bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // 1. Gather all data
    const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();

    const silverCount = parseInt(silverTicketCountInput.value) || 0;
    const goldCount = parseInt(goldTicketCountInput.value) || 0;
    const diamondCount = parseInt(diamondTicketCountInput.value) || 0;

    if (silverCount === 0 && goldCount === 0 && diamondCount === 0) {
        alert("Please select at least one ticket to proceed.");
        return;
    }

    const totalRaw = (silverCount * selectedSilverPrice) + (goldCount * selectedGoldPrice) + (diamondCount * selectedDiamondPrice);

    // 2. Formulate Message exactly as requested
    const message = `Hello, I want to book movie tickets.

Name: ${name}
Mobile: ${mobile}
Movie: ${selectedMovieTitle}
Date: ${selectedMovieDate}
Time: ${selectedMovieTime}
Silver Tickets: ${silverCount} x ₹${selectedSilverPrice}
Gold Tickets: ${goldCount} x ₹${selectedGoldPrice}
Diamond Tickets: ${diamondCount} x ₹${selectedDiamondPrice}
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
        "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=2070&auto=format&fit=crop", // Movie Roll
        "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2070&auto=format&fit=crop", // Filming Action

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



