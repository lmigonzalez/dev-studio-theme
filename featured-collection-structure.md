# Featured Collection Section Structure

## Overview
This document outlines the structure and implementation of the modified featured collection section, which includes an icon above the H2 title and a "View All" link positioned on the same row as the H2.

## Layout Structure

### Desktop Layout (750px+)
```
[Icon]
[H2 Title] ──────────────────── [View All →]
```

### Mobile Layout (<750px)
```
[Icon]
[H2 Title]
[View All →]
```

## HTML Structure

```liquid
<div class="collection__title title-wrapper title-wrapper--no-top-margin page-width">
  <!-- Icon above title -->
  {%- if section.settings.icon != blank -%}
    <div class="collection__icon">
      {%- render 'icon-accordion', icon: section.settings.icon -%}
    </div>
  {%- endif -%}
  
  <!-- Title and View All on same row -->
  <div class="collection__title-header">
    {%- if section.settings.title != blank -%}
      <h2 class="title inline-richtext {{ section.settings.heading_size }}">
        {{ section.settings.title }}
      </h2>
    {%- endif -%}
    
    {%- if section.settings.show_view_all and more_in_collection -%}
      <div class="collection__view-all-header">
        <a href="{{ section.settings.collection.url }}" class="collection__view-all-link">
          {{ 'sections.featured_collection.view_all' | t }}
          <span class="collection__view-all-arrow">→</span>
        </a>
      </div>
    {%- endif -%}
  </div>
</div>
```

## CSS Implementation

### Main Container
```css
.collection__title-header {
  display: flex;
  flex-direction: column;
  gap: 1rem; /* 10px */
}

@media screen and (min-width: 750px) {
  .collection__title-header {
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline; /* Key: aligns text baselines */
    gap: 2rem; /* 20px */
  }
}
```

### Icon Styling
```css
.collection__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.4rem; /* 24px */
  height: 2.4rem; /* 24px */
  margin-bottom: 0.5rem; /* 5px */
}

.collection__icon svg {
  width: 100%;
  height: 100%;
}
```

### View All Link Styling
```css
.collection__view-all-link {
  text-decoration: none;
  color: inherit;
  font-size: 0.875rem; /* 8.75px */
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem; /* 2.5px */
  transition: opacity 0.2s ease;
}

.collection__view-all-link:hover {
  opacity: 0.7;
}

.collection__view-all-arrow {
  font-size: 0.75rem; /* 7.5px */
  transition: transform 0.2s ease;
}

.collection__view-all-link:hover .collection__view-all-arrow {
  transform: translateX(2px);
}
```

## Schema Settings

### Icon Setting
```json
{
  "type": "select",
  "id": "icon",
  "label": "Icon",
  "options": [
    {"value": "", "label": "None"},
    {"value": "star", "label": "Star"},
    {"value": "heart", "label": "Heart"},
    {"value": "checkmark", "label": "Checkmark"},
    {"value": "arrow", "label": "Arrow"},
    {"value": "cart", "label": "Shopping Cart"},
    {"value": "fire", "label": "Fire"},
    {"value": "lightning-bolt", "label": "Lightning Bolt"},
    {"value": "leaf", "label": "Leaf"},
    {"value": "plant", "label": "Plant"},
    {"value": "price-tag", "label": "Price Tag"},
    {"value": "discount", "label": "Discount"},
    {"value": "truck", "label": "Truck"},
    {"value": "box", "label": "Box"},
    {"value": "success", "label": "Success"}
  ],
  "default": ""
}
```

## Key Implementation Notes

1. **Rem Conversion**: 1rem = 10px in this theme
2. **Baseline Alignment**: Using `align-items: baseline` ensures the H2 and "View All" text sit on the same horizontal line
3. **Icon Integration**: Uses existing `icon-accordion` snippet for consistent icon rendering
4. **Responsive Design**: Flexbox layout automatically adapts between desktop and mobile
5. **Hover Effects**: Subtle animations for better user experience
6. **Accessibility**: Maintains proper ARIA labels and semantic structure

## File Location
- **Main File**: `/sections/featured-collection.liquid`
- **Icon Snippet**: `/snippets/icon-accordion.liquid`
- **Documentation**: `/featured-collection-structure.md` (this file)

## Browser Support
- Modern browsers with flexbox support
- Graceful degradation for older browsers
- Mobile-first responsive design approach
