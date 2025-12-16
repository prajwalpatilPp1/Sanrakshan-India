# Legal Document Uniformity Design Document

## Overview

This design document outlines the approach to create uniform and professional styling for the legal documents section that aligns with the established design patterns used across the Sanrakshan India website. The design focuses on consistency with the team section styling, proper use of brand colors, and improved user experience while maintaining accessibility to all legal documents.

## Architecture

### Current State Analysis
- Legal documents are displayed in Bootstrap cards with mixed styling approaches
- Three main categories: Registration & Compliance, Accreditation Certificates, Organization Policies
- Inconsistent header colors: `bg-primary`, `bg-secondary`, and custom `#0a4275`
- Document items use list-group format with view/download buttons
- Current layout uses single-column approach with `col-lg-8` classes

### Proposed Architecture
- Standardize all card styling to match the site's design system
- Implement consistent color scheme using established brand colors
- Enhance button styling for better uniformity and accessibility
- Improve responsive design for better mobile experience
- Maintain existing functionality while improving visual consistency

## Components and Interfaces

### 1. Legal Document Card Component
**Enhanced Styling Requirements:**
- Consistent card dimensions and spacing
- Uniform header styling using brand colors
- Standardized typography hierarchy
- Professional shadow effects matching team cards
- Improved button styling for view/download actions

**Visual Specifications:**
- Card styling: Match `.new-team-card` shadow and border-radius patterns
- Header colors: Use consistent brand color palette
- Card spacing: 30px margin between cards
- Border radius: 15px for consistency with team cards
- Shadow effects: `0 4px 20px rgba(10, 66, 117, 0.08)` matching team section

### 2. Color Scheme Standardization
**Brand Color Usage:**
- Primary header: `var(--color-primary)` (#0a4275)
- Secondary header: `var(--color-primary-dark)` (#05264a) 
- Tertiary header: Custom gradient using brand colors
- Text colors: Consistent with site typography
- Button colors: Match existing button system

**Header Color Assignment:**
- Registration & Compliance: Primary brand color (#0a4275)
- Accreditation Certificates: Primary dark variant (#05264a)
- Organization Policies: Gradient from primary to primary-dark

### 3. Button System Enhancement
**Standardized Button Styling:**
- View buttons: `btn-outline-secondary` → `btn-outline-primary`
- Download buttons: `btn-outline-primary` → `btn-primary`
- Consistent sizing: `btn-sm` maintained for compact appearance
- Hover effects: Match site-wide button behavior
- Icon spacing: Consistent `me-2` margin for icons

**Button Specifications:**
```css
.legal-doc-btn-view {
    background: transparent;
    border: 2px solid var(--color-primary);
    color: var(--color-primary);
    transition: all 0.3s ease;
}

.legal-doc-btn-download {
    background: var(--color-primary);
    border: 2px solid var(--color-primary);
    color: white;
    transition: all 0.3s ease;
}
```

### 4. Layout Grid Enhancement
**Responsive Layout System:**
- Desktop (≥992px): Single column `col-lg-8` centered
- Tablet (768px-991px): Full width `col-md-10` centered  
- Mobile (<768px): Full width `col-12` with adjusted padding

**Card Container Specifications:**
- Container class: `.legal-documents-container`
- Card spacing: 2rem gap between cards
- Center alignment: `justify-content-center`
- Consistent margins: Match team section patterns

### 5. Typography System
**Document Name Styling:**
- Font: 'Open Sans', sans-serif (site standard)
- Size: 16px (increased from default for better readability)
- Weight: 500 (medium weight for professional appearance)
- Color: #333 (high contrast for accessibility)
- Line height: 1.4

**Category Header Styling:**
- Font: 'Josefin Sans', sans-serif (matching site headers)
- Size: 20px (h5 equivalent)
- Weight: 600
- Color: white (for contrast on colored backgrounds)
- Text transform: none (maintain readability)

## Data Models

### Legal Document Structure
```javascript
// Current structure maintained, no changes needed
{
    category: 'string',        // Document category name
    documents: [
        {
            name: 'string',    // Document display name
            viewUrl: 'string', // URL for viewing document
            downloadUrl: 'string' // URL for downloading document
        }
    ]
}
```

### CSS Class Structure
```css
.legal-documents-container     // Main container
.legal-doc-card               // Standardized card class
.legal-doc-header             // Uniform header styling
.legal-doc-list               // Document list container
.legal-doc-item               // Individual document item
.legal-doc-actions            // Button container
.legal-doc-btn-view           // Standardized view button
.legal-doc-btn-download       // Standardized download button
```

## Error Handling

### Document Access Issues
- Implement fallback messaging for broken document links
- Add loading states for document preview functionality
- Ensure graceful degradation when documents are unavailable
- Provide clear error messages for failed downloads

### Responsive Layout Issues
- Test card stacking behavior on small screens
- Ensure button accessibility on touch devices
- Validate text readability at all breakpoints
- Implement proper touch target sizes (minimum 44px)

### Browser Compatibility
- Test shadow effects across different browsers
- Ensure gradient backgrounds work in older browsers
- Validate button styling consistency across platforms
- Test download functionality in various browsers

## Testing Strategy

### Visual Consistency Testing
1. **Cross-section comparison**
   - Compare with team section styling
   - Verify color consistency across pages
   - Validate typography hierarchy alignment

2. **Responsive design validation**
   - Test at breakpoints: 320px, 768px, 992px, 1200px
   - Verify card behavior and button accessibility
   - Validate text readability and spacing

3. **Button functionality testing**
   - Test view/download actions for all documents
   - Verify hover states and transitions
   - Validate keyboard navigation support

### Performance Testing
1. **Page load optimization**
   - Verify CSS efficiency and load times
   - Test animation performance
   - Validate image optimization (if any icons added)

2. **User interaction testing**
   - Test button responsiveness
   - Verify smooth hover transitions
   - Validate touch interactions on mobile

### Accessibility Testing
1. **Screen reader compatibility**
   - Verify proper document link descriptions
   - Test keyboard navigation flow
   - Validate ARIA labels for buttons

2. **Color contrast validation**
   - Ensure text meets WCAG AA standards
   - Test with high contrast mode
   - Validate color-blind accessibility

## Implementation Approach

### Phase 1: CSS Enhancement
- Create new CSS classes for legal document styling
- Implement consistent color scheme across all cards
- Add enhanced button styling and hover effects
- Update responsive design patterns

### Phase 2: HTML Structure Updates
- Update card headers to use consistent styling
- Standardize button classes and structure
- Implement improved responsive grid layout
- Add proper semantic markup for accessibility

### Phase 3: Integration Testing
- Test integration with existing site styles
- Verify no conflicts with other page elements
- Validate cross-browser compatibility
- Ensure mobile responsiveness

### Phase 4: Performance Optimization
- Optimize CSS for minimal impact on load times
- Ensure smooth animations and transitions
- Validate accessibility compliance
- Conduct final user experience testing

## Design Specifications Summary

### Card Styling
- Background: White with subtle shadow
- Border radius: 15px
- Shadow: `0 4px 20px rgba(10, 66, 117, 0.08)`
- Margin: 30px between cards
- Padding: Standard Bootstrap card padding

### Header Colors
1. **Registration & Compliance**: `#0a4275` (Primary brand)
2. **Accreditation Certificates**: `#05264a` (Primary dark)
3. **Organization Policies**: `linear-gradient(135deg, #0a4275 0%, #05264a 100%)`

### Button Styling
- View: Outline style with primary color border
- Download: Filled style with primary color background
- Size: Small (`btn-sm`) for compact appearance
- Icons: Font Awesome with consistent spacing
- Hover: Smooth transitions matching site standards