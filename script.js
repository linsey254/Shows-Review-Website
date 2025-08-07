// Sample movie data
const sampleMovies = [
    {
        id: 1,
        title: "The Shawshank Redemption",
        year: 1994,
        rating: 4.9,
        poster: "images/shawshank.jpg"
    },
    {
        id: 2,
        title: "Manifest",
        year: 2018,
        rating: 4.4,
        poster: "images/manifest.jpg"
    },
    {
        id: 3,
        title: "Wednesday",
        year: 2022,
        rating: 4.7,
        poster: "images/wednesday.jpg"
    },
    {
        id: 4,
        title: "Grimm",
        year: 2011,
        rating: 4.8,
        poster: "images/grimm.webp"
    },
    {
        id: 5,
        title: "Inception",
        year: 2010,
        rating: 4.8,
        poster: "images/inception.webp"
    },
    {
        id: 6,
        title: "Gladiator",
        year: 2000,
        rating: 4.8,
        poster: "images/gladiator.jpg"
    },
    {
        id: 7,
        title: "FBI",
        year: 2018,
        rating: 3.6,
        poster: "images/fbi.jpg"
    },
    {
        id:8,
        title: "Extinction",
        year: 2018,
        rating: 3.5,
        poster: "images/extinction.jpg"
    },
    {
        id: 9,
        title: "Fast X",
        year: 2023,
        rating: 4.9,
        poster: "images/fast x.jpg"
    },
];

// Sample reviews data
const sampleReviews = [
    {
        id: 1,
        movieTitle: "The Shawshank Redemption",
        reviewerName: "Sarah Johnson",
        rating: 5,
        text: "An absolutely masterful film that shows the power of hope and friendship. The performances are outstanding and the story is deeply moving.",
        date: "2024-01-15"
    },
    {
        id: 2,
        movieTitle: "Manifest",
        reviewerName: "Shiv Patel",
        rating: 5,
        text: "The Manifest series, available on Netflix, is an intriguing and thought-provoking show about a group of passengers who return from a flight from Jamaica to New York City with five years having passed in what seemed like mere moments. On their return, they find a world that has moved on without them and they must find a way to adjust to the changes and reconcile their newfound awareness of synchronicity and destiny.",
        date: "2023-08-07"
    },
    {
        id: 3,
        movieTitle: "Wednesday",
        reviewerName: "Lynn Nyawira",
        rating: 5,
        text: "A darkly comedic take on the Addams Family. Jenna Ortega's performance as Wednesday is captivating and the show has a unique style.",
        date: "2023-12-20"
    },
    {
        id: 4,
        movieTitle: "Grimm",
        reviewerName: "John Doe",
        rating: 4,
        text: "A unique blend of crime drama and fantasy. The concept of a modern-day Grimm is fascinating and the show has great character development.",
        date: "2023-11-10"
    },
    {
        id: 5,
        movieTitle: "Inception",
        reviewerName: "Emma Wilson",
        rating: 4,
        text: "Mind-bending and visually stunning. Nolan creates a complex narrative that rewards multiple viewings. The action sequences are incredible.",
        date: "2024-01-08"
    },
    {
        id: 6,
        movieTitle: "Gladiator",
        reviewerName: "Michael Smith",
        rating: 5,
        text: "A classic epic that never gets old. Russell Crowe's performance is iconic and the story of revenge and redemption is timeless.",
        date: "2023-09-15"
    },
    {
        id: 7,
        movieTitle: "FBI",
        reviewerName: "Alice Brown",
        rating: 3,
        text: "An average procedural drama. The characters are likable but the plot can be predictable at times.",
        date: "2023-10-05"
    },
    {
        id: 8,
        movieTitle: "Extinction",
        reviewerName: "David Green",
        rating: 2,
        text: "A disappointing sci-fi thriller that fails to deliver on its intriguing premise. The execution is lackluster.",
        date: "2023-07-22"
    },
    {
        id: 9,
        movieTitle: "Fast X",
        reviewerName: "Olivia Taylor",
        rating: 5,
        text: "An adrenaline-pumping ride with spectacular action sequences. The Fast & Furious franchise continues to entertain with its over-the-top stunts and camaraderie.",
        date: "2023-12-01"
    },
    
];

// Store all movies and reviews
let movies = [...sampleMovies];
let reviews = [...sampleReviews];
let currentRating = 0;

// DOM Elements
const moviesGrid = document.getElementById('movies-grid');
const reviewsContainer = document.getElementById('reviews-container');
const reviewForm = document.getElementById('review-form');
const searchInput = document.getElementById('search-input');
const stars = document.querySelectorAll('.star');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    renderMovies(movies);
    renderReviews(reviews);
    setupStarRating();
    setupFormSubmission();
    setupSmoothScrolling();
});

// Render movies in the grid
function renderMovies(moviesToRender) {
    moviesGrid.innerHTML = '';
    
    moviesToRender.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';

        //Check if the poster is an image path or an emoji
        let posterContent;
        if (movie.poster && movie.poster.match(/\.(jpeg|jpg|png|gif|webp)$/i)) {
            posterContent = `<img class="movie-poster" src="${movie.poster}" alt="${movie.title} Poster">`;
        } else {
            posterContent = `<div class="movie-poster">${movie.poster}</div> ` // Use emoji or text directly
        }
        movieCard.innerHTML = `
            ${posterContent}
            <div class="movie-info">
                <div class="movie-title">${movie.title}</div>
                <div class="movie-year">${movie.year}</div>
                <div class="movie-rating">
                    <span class="stars">${generateStars(movie.rating)}</span>
                    <span>${movie.rating}/5</span>
                </div>
            </div>
        `;
        
        movieCard.addEventListener('click', () => {
            showMovieDetails(movie);
        });
        
        moviesGrid.appendChild(movieCard);
    });
}

// Render reviews
function renderReviews(reviewsToRender) {
    reviewsContainer.innerHTML = '';
    
    reviewsToRender.forEach(review => {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        reviewCard.innerHTML = `
            <div class="review-header">
                <span class="reviewer-name">${review.reviewerName}</span>
                <span class="review-rating">${generateStars(review.rating)}</span>
            </div>
            <div class="review-movie">Review for: ${review.movieTitle}</div>
            <div class="review-text">${review.text}</div>
        `;
        reviewsContainer.appendChild(reviewCard);
    });
}

// Generate star display
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    
    return '★'.repeat(fullStars) + 
           (halfStar ? '☆' : '') + 
           '☆'.repeat(emptyStars);
}

// Setup star rating for form
function setupStarRating() {
    stars.forEach(star => {
        star.addEventListener('mouseover', function() {
            const rating = parseInt(this.dataset.rating);
            highlightStars(rating);
        });
        
        star.addEventListener('click', function() {
            currentRating = parseInt(this.dataset.rating);
            document.getElementById('rating').value = currentRating;
            highlightStars(currentRating, true);
        });
    });
    
    // Reset on mouse leave
    document.querySelector('.star-rating').addEventListener('mouseleave', function() {
        highlightStars(currentRating, true);
    });
}

// Highlight stars
function highlightStars(rating, permanent = false) {
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

// Setup form submission
function setupFormSubmission() {
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const movieTitle = document.getElementById('movie-title').value;
        const reviewerName = document.getElementById('reviewer-name').value;
        const reviewText = document.getElementById('review-text').value;
        const rating = parseInt(document.getElementById('rating').value);
        
        if (rating === 0) {
            alert('Please select a rating!');
            return;
        }
        
        // Create new review
        const newReview = {
            id: reviews.length + 1,
            movieTitle,
            reviewerName,
            rating,
            text: reviewText,
            date: new Date().toISOString().split('T')[0]
        };
        
        // Add to reviews array
        reviews.unshift(newReview);
        
        // Update movie rating if it exists
        const existingMovie = movies.find(movie => 
            movie.title.toLowerCase() === movieTitle.toLowerCase()
        );
        
        if (!existingMovie) {
            // Add new movie if it doesn't exist
            const newMovie = {
                id: movies.length + 1,
                title: movieTitle,
                year: new Date().getFullYear(),
                rating: rating,
                poster: '🎬'
            };
            movies.push(newMovie);
            renderMovies(movies);
        } else {
            // Update existing movie rating (simple average)
            const movieReviews = reviews.filter(r => 
                r.movieTitle.toLowerCase() === existingMovie.title.toLowerCase()
            );
            const avgRating = movieReviews.reduce((sum, r) => sum + r.rating, 0) / movieReviews.length;
            existingMovie.rating = Math.round(avgRating * 10) / 10;
            renderMovies(movies);
        }
        
        // Re-render reviews
        renderReviews(reviews);
        
        // Reset form
        reviewForm.reset();
        currentRating = 0;
        highlightStars(0);
        
        // Show success message
        alert('Review submitted successfully!');
        
        // Scroll to reviews section
        scrollToSection('reviews');
    });
}

// Search functionality
function searchMovies() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        renderMovies(movies);
        return;
    }
    
    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm) ||
        movie.year.toString().includes(searchTerm)
    );
    
    renderMovies(filteredMovies);
    scrollToSection('movies');
}

// Add enter key support for search
searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchMovies();
    }
});

// Show movie details (simple alert for now)
function showMovieDetails(movie) {
    const movieReviews = reviews.filter(review =>
        review.movieTitle.toLowerCase() === movie.title.toLowerCase()
    );
    
    let details = `${movie.title} (${movie.year})\n`;
    details += `Rating: ${movie.rating}/5 stars\n\n`;
    
    if (movieReviews.length > 0) {
        details += `Reviews (${movieReviews.length}):\n\n`;
        movieReviews.forEach(review => {
            details += `${review.reviewerName}: ${review.rating}/5\n`;
            details += `"${review.text}"\n\n`;
        });
    } else {
        details += 'No reviews yet. Be the first to review this movie!';
    }
    
    alert(details);
}

// Smooth scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Setup smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Add some visual feedback for interactions
document.addEventListener('click', function(e) {
    // Add ripple effect to buttons
    if (e.target.tagName === 'BUTTON') {
        const button = e.target;
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
        `;
        
        if (!button.style.position || button.style.position === 'static') {
            button.style.position = 'relative';
        }
        button.style.overflow = 'hidden';
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Auto-save form data to localStorage (optional enhancement)
function saveFormData() {
    const formData = {
        movieTitle: document.getElementById('movie-title').value,
        reviewerName: document.getElementById('reviewer-name').value,
        reviewText: document.getElementById('review-text').value,
        rating: currentRating
    };
    localStorage.setItem('movieReviewFormData', JSON.stringify(formData));
}

function loadFormData() {
    const savedData = localStorage.getItem('movieReviewFormData');
    if (savedData) {
        const formData = JSON.parse(savedData);
        document.getElementById('movie-title').value = formData.movieTitle || '';
        document.getElementById('reviewer-name').value = formData.reviewerName || '';
        document.getElementById('review-text').value = formData.reviewText || '';
        if (formData.rating) {
            currentRating = formData.rating;
            document.getElementById('rating').value = currentRating;
            highlightStars(currentRating, true);
        }
    }
}

// Save form data on input
document.querySelectorAll('#review-form input, #review-form textarea').forEach(input => {
    input.addEventListener('input', saveFormData);
});

// Load saved form data on page load
window.addEventListener('load', loadFormData);

// Clear saved data on successful submission
reviewForm.addEventListener('submit', function() {
    localStorage.removeItem('movieReviewFormData');
});
