# Shopify Theme Structure Guide
## Studio Theme - Development Standards & Patterns

This guide documents the common patterns, settings, and structures used throughout the Studio theme. Use this as a reference when creating new sections to maintain consistency.

---

## Table of Contents
1. [Global Settings](#global-settings)
2. [Section Padding Patterns](#section-padding-patterns)
3. [Color Schemes](#color-schemes)
4. [Typography & Heading Sizes](#typography--heading-sizes)
5. [Button Styles](#button-styles)
6. [Animations](#animations)
7. [Image Handling](#image-handling)
8. [Responsive Design](#responsive-design)
9. [Schema Structure](#schema-structure)
10. [Common CSS Patterns](#common-css-patterns)
11. [Block Types](#block-types)

---

## Global Settings

### Theme Settings (settings_schema.json)

#### Key Global Variables:
- **Page Width**: 1000-1600px (step: 100px, default: 1200px)
- **Section Spacing**: 0-100px (step: 4px, default: 0px)
- **Grid Spacing Horizontal**: 4-40px (step: 4px, default: 8px)
- **Grid Spacing Vertical**: 4-40px (step: 4px, default: 8px)

#### Typography:
- **Header Font**: `type_header_font` (default: assistant_n4)
- **Body Font**: `type_body_font` (default: assistant_n4)
- **Heading Scale**: 100-150% (step: 5%, default: 100%)
- **Body Scale**: 100-130% (step: 5%, default: 100%)

#### Animations:
- **Reveal on Scroll**: Boolean (default: true)
- **Hover Elements**: Options: `default`, `vertical-lift`, `3d-lift`

---

## Section Padding Patterns

### Standard Padding Structure

Every section should include this padding pattern:

```liquid
{%- style -%}
  .section-{{ section.id }}-padding {
    padding-top: {{ section.settings.padding_top | times: 0.75 | round: 0 }}px;
    padding-bottom: {{ section.settings.padding_bottom | times: 0.75 | round: 0 }}px;
  }

  @media screen and (min-width: 750px) {
    .section-{{ section.id }}-padding {
      padding-top: {{ section.settings.padding_top }}px;
      padding-bottom: {{ section.settings.padding_bottom }}px;
    }
  }
{%- endstyle -%}
```

**Key Points:**
- Mobile uses 75% of desktop padding (multiplied by 0.75)
- Desktop breakpoint at 750px
- Add class `section-{{ section.id }}-padding` to section wrapper

### Schema Settings for Padding:

```json
{
  "type": "header",
  "content": "Section padding"
},
{
  "type": "range",
  "id": "padding_top",
  "min": 0,
  "max": 100,
  "step": 4,
  "unit": "px",
  "label": "Padding top",
  "default": 36
},
{
  "type": "range",
  "id": "padding_bottom",
  "min": 0,
  "max": 100,
  "step": 4,
  "unit": "px",
  "label": "Padding bottom",
  "default": 36
}
```

**Default Values:**
- Most sections: 36px top & bottom
- Rich text/Newsletter: 40px top, 52px bottom

---

## Color Schemes

### Available Color Schemes:
1. **scheme-1** (Default/Primary)
   - Background: #FFFFFF
   - Text: #121212
   - Button: #121212
   - Button Label: #FFFFFF

2. **scheme-2** (Light Gray)
   - Background: #F3F3F3
   - Text: #121212
   - Button: #121212
   - Button Label: #F3F3F3

3. **scheme-3** (Dark)
   - Background: #242833
   - Text: #FFFFFF
   - Button: #FFFFFF
   - Button Label: #000000

4. **scheme-4** (Black)
   - Background: #121212
   - Text: #FFFFFF
   - Button: #FFFFFF
   - Button Label: #121212

5. **scheme-5** (Blue Accent)
   - Background: #334FB4
   - Text: #FFFFFF
   - Button: #FFFFFF
   - Button Label: #334FB4

### Schema Pattern:

```json
{
  "type": "color_scheme",
  "id": "color_scheme",
  "label": "Color scheme",
  "default": "scheme-1"
}
```

### Usage in Liquid:

```liquid
<div class="color-{{ section.settings.color_scheme }} gradient">
  <!-- Content -->
</div>
```

---

## Typography & Heading Sizes

### Heading Size Options:

```json
{
  "type": "select",
  "id": "heading_size",
  "options": [
    {
      "value": "h2",
      "label": "Small"
    },
    {
      "value": "h1",
      "label": "Medium"
    },
    {
      "value": "h0",
      "label": "Large"
    },
    {
      "value": "hxl",
      "label": "Extra large"
    },
    {
      "value": "hxxl",
      "label": "Extra extra large"
    }
  ],
  "default": "h1",
  "label": "Heading size"
}
```

**Hierarchy:**
- `h2` - Smallest
- `h1` - Small/Medium (DEFAULT)
- `h0` - Medium/Large
- `hxl` - Extra Large
- `hxxl` - Double Extra Large

### Text Style Options:

**For Body Text:**
- `body` - Regular body text
- `subtitle` - Subtitle style
- `caption-with-letter-spacing` - Uppercase with spacing

**For Captions:**
- `subtitle`
- `caption-with-letter-spacing`

**Text Sizes:**
- `small`
- `medium` (DEFAULT)
- `large`

### Usage:

```liquid
<h2 class="inline-richtext {{ block.settings.heading_size }}">
  {{ block.settings.heading }}
</h2>
```

---

## Button Styles

### Global Button Settings:

**Border:**
- Thickness: 0-12px (step: 1px, default: 1px)
- Opacity: 0-100% (step: 5%, default: 100%)
- Radius: 0-40px (step: 2px, default: 0px)

**Shadow:**
- Opacity: 0-100% (step: 5%, default: 0%)
- Horizontal Offset: -12 to 12px (step: 2px, default: 0px)
- Vertical Offset: -12 to 12px (step: 2px, default: 0px)
- Blur: 0-20px (step: 5px, default: 0px)

### Button Block Schema:

```json
{
  "type": "text",
  "id": "button_label",
  "label": "Button label",
  "info": "Leave empty to hide button"
},
{
  "type": "url",
  "id": "button_link",
  "label": "Button link"
},
{
  "type": "checkbox",
  "id": "button_style_secondary",
  "default": false,
  "label": "Use secondary button style"
}
```

### Button Liquid Pattern:

```liquid
<a
  {% if block.settings.button_link == blank %}
    role="link" aria-disabled="true"
  {% else %}
    href="{{ block.settings.button_link }}"
  {% endif %}
  class="button{% if block.settings.button_style_secondary %} button--secondary{% else %} button--primary{% endif %}"
>
  {{- block.settings.button_label | escape -}}
</a>
```

**CSS Classes:**
- `.button` - Base button class
- `.button--primary` - Filled button
- `.button--secondary` - Outline/secondary button

---

## Animations

### Reveal on Scroll

**Conditional Class:**
```liquid
{% if settings.animations_reveal_on_scroll %} scroll-trigger animate--slide-in{% endif %}
```

**With Cascade (Staggered):**
```liquid
{% if settings.animations_reveal_on_scroll %}
  data-cascade
  style="--animation-order: {{ forloop.index }};"
{% endif %}
```

### Image Behavior Options:

```json
{
  "type": "select",
  "id": "image_behavior",
  "options": [
    {
      "value": "none",
      "label": "None"
    },
    {
      "value": "ambient",
      "label": "Ambient"
    },
    {
      "value": "fixed",
      "label": "Fixed"
    },
    {
      "value": "zoom-in",
      "label": "Zoom in"
    }
  ],
  "default": "none",
  "label": "Image behavior"
}
```

**Usage:**
```liquid
{% if section.settings.image_behavior != 'none' %} animate--{{ section.settings.image_behavior }}{% endif %}
```

---

## Image Handling

### Responsive Images Pattern:

```liquid
{%- liquid
  assign widths = '375, 550, 750, 1100, 1500, 1780, 2000, 3000, 3840'
  assign sizes = '100vw'
  
  assign fetch_priority = 'auto'
  if section.index == 1
    assign fetch_priority = 'high'
  endif
-%}

{{
  section.settings.image
  | image_url: width: 3840
  | image_tag:
    sizes: sizes,
    widths: widths,
    fetchpriority: fetch_priority
}}
```

### Image Ratio Options:

```json
{
  "type": "select",
  "id": "image_ratio",
  "options": [
    {
      "value": "adapt",
      "label": "Adapt to image"
    },
    {
      "value": "portrait",
      "label": "Portrait"
    },
    {
      "value": "square",
      "label": "Square"
    }
  ],
  "default": "adapt",
  "label": "Image ratio"
}
```

### Height Options:

```json
{
  "type": "select",
  "id": "height",
  "options": [
    {
      "value": "adapt",
      "label": "Adapt to image"
    },
    {
      "value": "small",
      "label": "Small"
    },
    {
      "value": "medium",
      "label": "Medium"
    },
    {
      "value": "large",
      "label": "Large"
    }
  ],
  "default": "medium",
  "label": "Image height"
}
```

### Placeholder Pattern:

```liquid
{%- if section.settings.image != blank -%}
  <!-- Actual image -->
{%- else -%}
  {{ 'hero-apparel-1' | placeholder_svg_tag: 'placeholder-svg' }}
{%- endif -%}
```

**Common Placeholders:**
- `hero-apparel-1`, `hero-apparel-2`, `hero-apparel-3`
- `detailed-apparel-1`
- `product-apparel-1` through `product-apparel-6`
- `image` (generic)

---

## Responsive Design

### Breakpoints:

- **Mobile**: < 750px
- **Tablet**: 750px - 989px
- **Desktop**: ≥ 990px
- **Large Desktop**: ≥ settings.page_width (default 1200px)

### Common Responsive Patterns:

**Grid Columns:**
```json
{
  "type": "range",
  "id": "columns_desktop",
  "min": 1,
  "max": 6,
  "step": 1,
  "default": 4,
  "label": "Desktop columns"
},
{
  "type": "select",
  "id": "columns_mobile",
  "options": [
    { "value": "1", "label": "1 column" },
    { "value": "2", "label": "2 columns" }
  ],
  "default": "2",
  "label": "Mobile columns"
}
```

**Grid Classes:**
```liquid
class="grid grid--{{ section.settings.columns_desktop }}-col-desktop grid--{{ section.settings.columns_mobile }}-col-tablet-down"
```

### Content Alignment:

**Desktop:**
```json
{
  "type": "select",
  "id": "desktop_content_alignment",
  "options": [
    { "value": "left", "label": "Left" },
    { "value": "center", "label": "Center" },
    { "value": "right", "label": "Right" }
  ],
  "default": "center",
  "label": "Desktop content alignment"
}
```

**Mobile:**
```json
{
  "type": "select",
  "id": "mobile_content_alignment",
  "options": [
    { "value": "left", "label": "Left" },
    { "value": "center", "label": "Center" },
    { "value": "right", "label": "Right" }
  ],
  "default": "center",
  "label": "Mobile content alignment"
}
```

---

## Schema Structure

### Basic Section Schema Template:

```json
{% schema %}
{
  "name": "Section Name",
  "tag": "section",
  "class": "section",
  "disabled_on": {
    "groups": ["header", "footer"]
  },
  "settings": [
    {
      "type": "inline_richtext",
      "id": "title",
      "label": "Heading",
      "default": "Heading"
    },
    {
      "type": "select",
      "id": "heading_size",
      "options": [
        { "value": "h2", "label": "Small" },
        { "value": "h1", "label": "Medium" },
        { "value": "h0", "label": "Large" },
        { "value": "hxl", "label": "Extra large" },
        { "value": "hxxl", "label": "Extra extra large" }
      ],
      "default": "h1",
      "label": "Heading size"
    },
    {
      "type": "color_scheme",
      "id": "color_scheme",
      "label": "Color scheme",
      "default": "scheme-1"
    },
    {
      "type": "header",
      "content": "Section padding"
    },
    {
      "type": "range",
      "id": "padding_top",
      "min": 0,
      "max": 100,
      "step": 4,
      "unit": "px",
      "label": "Padding top",
      "default": 36
    },
    {
      "type": "range",
      "id": "padding_bottom",
      "min": 0,
      "max": 100,
      "step": 4,
      "unit": "px",
      "label": "Padding bottom",
      "default": 36
    }
  ],
  "blocks": [
    {
      "type": "block_type",
      "name": "Block Name",
      "settings": []
    }
  ],
  "presets": [
    {
      "name": "Section Name"
    }
  ]
}
{% endschema %}
```

### Section Structure:

```liquid
{{ 'section-styles.css' | asset_url | stylesheet_tag }}

{%- style -%}
  /* Responsive padding */
{%- endstyle -%}

<div class="color-{{ section.settings.color_scheme }} gradient">
  <div class="section-{{ section.id }}-padding">
    <div class="page-width">
      <!-- Content -->
    </div>
  </div>
</div>
```

---

## Common CSS Patterns

### Container Classes:

- `.page-width` - Max-width container (respects settings.page_width)
- `.content-container` - Content box with background
- `.content-container--full-width` - Full-width content container
- `.isolate` - Creates new stacking context
- `.gradient` - Applies gradient background

### Layout Classes:

- `.grid` - Grid container
- `.grid--1-col`, `.grid--2-col`, etc. - Column counts
- `.grid--peek` - Shows partial next item
- `.grid__item` - Grid item

### Utility Classes:

- `.center` - Center alignment
- `.rte` - Rich text editor styles
- `.inline-richtext` - Inline rich text
- `.visually-hidden` - Screen reader only

### Animation Classes:

- `.scroll-trigger` - Triggers animation on scroll
- `.animate--slide-in` - Slide in animation
- `.animate--fade-in` - Fade in animation

---

## Block Types

### Common Block Types:

#### Heading Block:
```json
{
  "type": "heading",
  "name": "Heading",
  "limit": 1,
  "settings": [
    {
      "type": "inline_richtext",
      "id": "heading",
      "label": "Heading"
    },
    {
      "type": "select",
      "id": "heading_size",
      "options": [
        { "value": "h2", "label": "Small" },
        { "value": "h1", "label": "Medium" },
        { "value": "h0", "label": "Large" },
        { "value": "hxl", "label": "Extra large" },
        { "value": "hxxl", "label": "Extra extra large" }
      ],
      "default": "h1",
      "label": "Heading size"
    }
  ]
}
```

#### Text Block:
```json
{
  "type": "text",
  "name": "Text",
  "limit": 1,
  "settings": [
    {
      "type": "richtext",
      "id": "text",
      "label": "Text"
    },
    {
      "type": "select",
      "id": "text_style",
      "options": [
        { "value": "body", "label": "Body" },
        { "value": "subtitle", "label": "Subtitle" }
      ],
      "default": "body",
      "label": "Text style"
    }
  ]
}
```

#### Button Block:
```json
{
  "type": "button",
  "name": "Button",
  "limit": 1,
  "settings": [
    {
      "type": "text",
      "id": "button_label",
      "label": "Button label",
      "info": "Leave empty to hide"
    },
    {
      "type": "url",
      "id": "button_link",
      "label": "Button link"
    },
    {
      "type": "checkbox",
      "id": "button_style_secondary",
      "default": false,
      "label": "Use secondary style"
    }
  ]
}
```

---

## Cards Settings

### Product Cards:

**Style Options:**
- `standard` - Flat, no border
- `card` - Elevated with border/shadow

**Global Settings:**
- Image Padding: 0-20px (step: 2px, default: 0px)
- Text Alignment: left/center/right (default: left)
- Border Thickness: 0-24px (step: 1px, default: 0px)
- Border Opacity: 0-100% (step: 5%, default: 0%)
- Corner Radius: 0-40px (step: 2px, default: 0px)
- Shadow settings (same pattern as buttons)

### Collection Cards:

Same settings as product cards but separate in settings_schema.json:
- `collection_card_style`
- `collection_card_image_padding`
- `collection_card_text_alignment`
- etc.

### Blog Cards:

Same pattern as product/collection cards:
- `blog_card_style`
- `blog_card_image_padding`
- etc.

---

## Image Shapes

### Available Shapes:

```json
{
  "type": "select",
  "id": "image_shape",
  "options": [
    { "value": "default", "label": "Default" },
    { "value": "arch", "label": "Arch" },
    { "value": "blob", "label": "Blob" },
    { "value": "chevronleft", "label": "Chevron left" },
    { "value": "chevronright", "label": "Chevron right" },
    { "value": "diamond", "label": "Diamond" },
    { "value": "parallelogram", "label": "Parallelogram" },
    { "value": "round", "label": "Round" }
  ],
  "default": "default",
  "label": "Image shape"
}
```

**Required CSS:**
```liquid
{% if section.settings.image_shape == 'blob' %}
  {{ 'mask-blobs.css' | asset_url | stylesheet_tag }}
{%- endif -%}

{% if section.settings.image_shape == 'arch' %}
  {{ 'mask-arch.svg' | inline_asset_content }}
{%- endif -%}
```

---

## Slider/Carousel Settings

### Common Slider Pattern:

```liquid
<slider-component class="slider-mobile-gutter">
  <ul
    id="Slider-{{ section.id }}"
    class="slider slider--tablet"
    role="list"
  >
    <!-- Slides -->
  </ul>
  
  <div class="slider-buttons">
    <button
      type="button"
      class="slider-button slider-button--prev"
      name="previous"
      aria-label="Previous slide"
    >
      <span class="svg-wrapper">
        {{- 'icon-caret.svg' | inline_asset_content -}}
      </span>
    </button>
    
    <div class="slider-counter caption">
      <span class="slider-counter--current">1</span>
      <span aria-hidden="true"> / </span>
      <span class="slider-counter--total">{{ total }}</span>
    </div>
    
    <button
      type="button"
      class="slider-button slider-button--next"
      name="next"
      aria-label="Next slide"
    >
      <span class="svg-wrapper">
        {{- 'icon-caret.svg' | inline_asset_content -}}
      </span>
    </button>
  </div>
</slider-component>
```

### Slider Settings:

```json
{
  "type": "checkbox",
  "id": "enable_desktop_slider",
  "label": "Enable desktop slider",
  "default": false
},
{
  "type": "checkbox",
  "id": "swipe_on_mobile",
  "label": "Enable swipe on mobile",
  "default": false
}
```

---

## Media & Borders

### Media Border Settings (Global):

- Thickness: 0-24px (step: 1px, default: 1px)
- Opacity: 0-100% (step: 5%, default: 5%)
- Radius: 0-40px (step: 2px, default: 0px)
- Shadow settings

### Text Boxes:

- Border Thickness: 0-24px (step: 1px, default: 0px)
- Border Opacity: 0-100% (step: 5%, default: 0%)
- Radius: 0-40px (step: 2px, default: 0px)
- Shadow settings

---

## Badges

### Badge Settings (Global):

```json
{
  "type": "select",
  "id": "badge_position",
  "options": [
    { "value": "bottom left", "label": "Bottom left" },
    { "value": "bottom right", "label": "Bottom right" },
    { "value": "top left", "label": "Top left" },
    { "value": "top right", "label": "Top right" }
  ],
  "default": "bottom left",
  "label": "Badge position"
},
{
  "type": "range",
  "id": "badge_corner_radius",
  "min": 0,
  "max": 40,
  "step": 2,
  "unit": "px",
  "label": "Badge corner radius",
  "default": 40
},
{
  "type": "color_scheme",
  "id": "sale_badge_color_scheme",
  "label": "Sale badge color scheme",
  "default": "scheme-5"
},
{
  "type": "color_scheme",
  "id": "sold_out_badge_color_scheme",
  "label": "Sold out badge color scheme",
  "default": "scheme-3"
}
```

---

## Best Practices

### 1. **Always Use Responsive Padding**
- Mobile at 75% of desktop value
- Breakpoint at 750px

### 2. **Consistent Heading Hierarchy**
- Default to `h1` for most sections
- Use semantic HTML (`<h2>`, `<h3>`, etc.) but style with classes

### 3. **Animation Standards**
- Check `settings.animations_reveal_on_scroll` before adding animation classes
- Use `data-cascade` with `--animation-order` for staggered animations

### 4. **Color Scheme Pattern**
- Always wrap section in color scheme div
- Include `gradient` class for smooth transitions

### 5. **Accessibility**
- Use proper ARIA labels
- Include `role` attributes for interactive elements
- Provide accessible button labels

### 6. **Range Input Standards**
- Step of 4 for padding/spacing
- Step of 2 for borders/radius
- Step of 5 for percentages

### 7. **Image Optimization**
- Use responsive widths
- Set `fetchpriority="high"` for above-the-fold images (section.index == 1)
- Lazy load below-the-fold images

### 8. **Schema Organization**
- Group related settings with headers
- Use plain English labels (avoid translation keys)
- Provide helpful info text where needed

---

## Common Section Wrapper Pattern

```liquid
{{ 'component-specific.css' | asset_url | stylesheet_tag }}

{%- style -%}
  .section-{{ section.id }}-padding {
    padding-top: {{ section.settings.padding_top | times: 0.75 | round: 0 }}px;
    padding-bottom: {{ section.settings.padding_bottom | times: 0.75 | round: 0 }}px;
  }

  @media screen and (min-width: 750px) {
    .section-{{ section.id }}-padding {
      padding-top: {{ section.settings.padding_top }}px;
      padding-bottom: {{ section.settings.padding_bottom }}px;
    }
  }
{%- endstyle -%}

<div class="color-{{ section.settings.color_scheme }} gradient">
  <div class="section-{{ section.id }}-padding">
    <div class="page-width">
      {%- unless section.settings.heading == blank -%}
        <div class="title-wrapper{% if settings.animations_reveal_on_scroll %} scroll-trigger animate--slide-in{% endif %}">
          <h2 class="title inline-richtext {{ section.settings.heading_size }}">
            {{ section.settings.heading }}
          </h2>
        </div>
      {%- endunless -%}
      
      <!-- Section Content -->
      
    </div>
  </div>
</div>

{% schema %}
{
  "name": "Section Name",
  "tag": "section",
  "class": "section",
  "disabled_on": {
    "groups": ["header", "footer"]
  },
  "settings": [],
  "blocks": [],
  "presets": [
    {
      "name": "Section Name"
    }
  ]
}
{% endschema %}
```

---

## Quick Reference Checklist

When creating a new section, ensure you have:

- [ ] Responsive padding pattern (mobile at 75%)
- [ ] Color scheme setting with default "scheme-1"
- [ ] Heading size options (h2, h1, h0, hxl, hxxl)
- [ ] Animation support (scroll-trigger, animate classes)
- [ ] Proper grid/layout classes
- [ ] Mobile/desktop responsive settings
- [ ] Accessibility attributes (ARIA labels, roles)
- [ ] Translation keys for all user-facing text
- [ ] Proper image handling (sizes, widths, fetchpriority)
- [ ] Section padding settings (0-100px, step 4, default 36)
- [ ] Gradient class on color scheme wrapper
- [ ] Unique section ID in styles and elements
- [ ] Proper schema structure with presets

---

## Notes

- Use plain English labels instead of translation keys for better clarity
- Icon SVGs are loaded with `inline_asset_content` filter
- CSS files use `asset_url` with `stylesheet_tag` filter
- JS files use `asset_url` with `defer="defer"` attribute
- Always escape user input with `| escape` filter
- Use `shopify_attributes` on block elements for theme editor

---

**Last Updated**: January 2024  
**Theme Version**: Based on Dawn 15.4.0  
**Maintained By**: Studio Theme Development Team

