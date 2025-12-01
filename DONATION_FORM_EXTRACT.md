# Donation Form - HTML & CSS Extract

## HTML Structure

```html
<!-- Donate Start -->
<div id="donate-box" class="container-fluid donate py-5">
    <div class="container">
        <div class="row g-0 shadow-lg">
            <!-- Text Section -->
            <div class="col-lg-7 donate-text bg-light py-5 wow fadeIn" data-wow-delay="0.1s">
                <div class="d-flex flex-column justify-content-center h-100 p-5 wow fadeIn" data-wow-delay="0.3s">
                    <h1 class="display-6 mb-4">Let's Donate to Needy People for Better Lives</h1>
                    <p class="fs-5 mb-0 text-dark">Through your donations, we spread kindness and support to children, families, and communities struggling to find stability.</p>
                </div>
            </div>

            <!-- Form Section -->
            <div class="col-lg-5 donate-form py-5 text-center wow fadeIn" data-wow-delay="0.5s">
                <div class="h-100 p-5">
                    <form id="donationForm">
                        <div class="row g-3">
                            <!-- Name -->
                            <div class="col-12">
                                <input type="text" class="form-control" id="donorName" name="name" placeholder="Enter your name" autocomplete="name" required>
                            </div>

                            <!-- Email -->
                            <div class="col-12">
                                <input type="email" class="form-control" id="donorEmail" name="email" placeholder="Enter your email" autocomplete="email" required>
                            </div>

                            <!-- Phone -->
                            <div class="col-12">
                                <input type="tel" class="form-control" id="donorPhone" name="phone" placeholder="Enter your phone" autocomplete="tel" required>
                            </div>

                            <!-- Custom Amount -->
                            <div class="col-12">
                                <input type="number" class="form-control" id="customAmount" name="amount" placeholder="Enter amount (₹)" min="10">
                            </div>

                            <!-- Preset Buttons -->
                            <div class="col-12 mt-2">
                                <div class="btn-group w-100" role="group" aria-label="Donation amount presets">
                                    <input type="radio" class="btn-check" name="donation_amount" id="amount500" value="500" autocomplete="off">
                                    <label class="btn btn-outline-light" for="amount500">₹500</label>
                                    
                                    <input type="radio" class="btn-check" name="donation_amount" id="amount1000" value="1000" autocomplete="off">
                                    <label class="btn btn-outline-light" for="amount1000">₹1000</label>
                                    
                                    <input type="radio" class="btn-check" name="donation_amount" id="amount2000" value="2000" autocomplete="off">
                                    <label class="btn btn-outline-light" for="amount2000">₹2000</label>
                                    
                                    <input type="radio" class="btn-check" name="donation_amount" id="amount5000" value="5000" autocomplete="off">
                                    <label class="btn btn-outline-light" for="amount5000">₹5000</label>
                                </div>
                            </div>

                            <!-- Submit Button -->
                            <div class="col-12 mt-3">
                                <button class="btn btn-light btn-donate-now py-3 w-100 fw-bold" type="submit">
                                    Donate Now
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Donate End -->
```

## CSS Styles (from css/index.css)

```css
/****************************
 *       DONATE SECTION
 ****************************/

/* Text Section */
.donate-text h1 {
  color: var(--color-primary);
}

/* Form Section */
.donate-form {
  background-color: var(--color-primary);
  border-radius: 0 15px 15px 0;
}

.donate-form .form-control {
  background-color: rgba(255, 255, 255, 0.15);
  color: #fff;
  border: none;
}

.donate-form .form-control:focus {
  background-color: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
  color: #fff;
  box-shadow: none;
}

.donate-form .form-control::placeholder {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.95rem;
}

.donate-form .btn-donate-now {
  color: var(--color-primary);
  transition: background-color 0.25s ease, transform 0.25s ease;
}

.donate-form .btn-donate-now:hover {
  background-color: #e2e6ea;
  transform: translateY(-2px);
}

.donate-form .btn-donate-now:active {
  transform: translateY(0);
}

/* Button Group Styles */
.donate .btn-group .btn-outline-light {
  border-color: rgba(255, 255, 255, .5);
}

.donate .btn-group input[type="radio"]:checked + label {
  background-color: var(--bs-white);
  border-color: var(--bs-white);
  color: var(--color-primary);
}

/* Mobile Responsive - 768px */
@media (max-width: 768px) {
  .donate-text {
    padding: 2rem 1.5rem;
  }
  
  .donate-text h1 {
    font-size: 1.25rem;
  }
  
  .donate-text p {
    font-size: 0.85rem;
  }
  
  .donate-form {
    border-radius: 0 0 15px 15px;
    padding: 3rem 2rem;
  }
  
  .donate-form .form-control {
    padding: 1rem;
    font-size: 1rem;
  }
  
  .donate-form .btn-donate-now {
    padding: 1rem;
    font-size: 1.1rem;
  }
}

/* Mobile Responsive - 576px */
@media (max-width: 576px) {
  .donate-text {
    padding: 1.5rem 1rem;
  }
  
  .donate-text h1 {
    font-size: 1.1rem;
  }
  
  .donate-text p {
    font-size: 0.8rem;
  }
  
  .donate-form {
    padding: 2.5rem 2rem;
  }
  
  .donate-form .form-control {
    padding: 0.9rem;
    font-size: 0.95rem;
  }
  
  .donate-form .btn-donate-now {
    padding: 0.9rem;
    font-size: 1rem;
  }
}

/* Mobile Responsive - 375px */
@media (max-width: 375px) {
  .donate-text {
    padding: 1rem 0.75rem;
  }
  
  .donate-text h1 {
    font-size: 1rem;
  }
  
  .donate-text p {
    font-size: 0.75rem;
  }
  
  .donate-form {
    padding: 2rem 1.5rem;
  }
  
  .donate-form .form-control {
    padding: 0.8rem;
    font-size: 0.9rem;
  }
  
  .donate-form .btn-donate-now {
    padding: 0.8rem;
    font-size: 0.95rem;
  }
}
```

## CSS Variables Used

```css
:root {
  --color-primary: #0a4275;
  --bs-white: #ffffff;
}
```

## Features

✅ **Two-column layout** - Text on left, form on right
✅ **Responsive design** - Stacks on mobile
✅ **Glassmorphism effect** - Semi-transparent form inputs
✅ **Smooth animations** - Hover effects and transitions
✅ **Button group** - Radio buttons for preset amounts
✅ **Custom amount input** - Flexible donation amounts
✅ **Shadow effect** - Professional card appearance
✅ **Mobile optimized** - Different breakpoints for all devices

## Usage

1. Include Bootstrap 5.3+ for grid and form styles
2. Include Font Awesome for icons (optional)
3. Add WOW.js for scroll animations (optional)
4. Copy HTML structure
5. Copy CSS to your stylesheet
6. Customize colors via CSS variables
