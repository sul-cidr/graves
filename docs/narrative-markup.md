
# Narrative HTML guide

Graves wires up connections between the narrative and the map by automatically detecting a set of special attributes added to elements in the "Markup" field on the "Narrative" model. When the user clicks on an element that has one or more of these attributes, the map state will be changed accordingly - the map might pan and zoom to focus around a collection marker; the base layer or demographic overlay might change; the time slider might be set to a particular range; and so on and so forth.

Technically, these attributes can be added to any HTML element - the Javascript application just selects on the attribute names themselves, not the parent element type. In practice, they should almost always be applied to `<span>` elements, with the exception of the "section box" attributes, which should be added to `<div>` elements that wrap around one or more paragraphs.

## `data-id`

Connect a span with an individual collection marker on the map, identified by its database id. When the cursor hovers on the span, a line is drawn between the text and the map marker; when clicked, the map pans and zooms to center the collection.

```html
<span class="collection" data-id="5">... text ...</span>
```

## `data-zoom`

Use this attribute in conjunction with `data-id` to set a custom zoom level for the map after focusing on a collection marker. The zoom should be specified as an integer, which corresponds to the underlying Leaflet zoom levels. This is `8`, by default.

```html
<span class="collection" data-id="5" data-zoom="10">... text ...</span>
```

```html
<span class="collection" data-id="5">... text ...</span>
```

## `data-tags`

Filter the map to just show collections that are tagged with one or more tags. Separate multiple tags with commas.

```html
<span class="collection" data-tags="tag1">... text ...</span>
<span class="collection" data-tags="tag1,tag2,tag3">... text ...</span>
```

## `data-choropleth`

Set the demographic variable for the county choropleth.

```html
<span class="collection" data-choropleth="a100001_10">... text ...</span>
```

Here's the complete list of available variables:

```yaml
a100001_10:	Total Population
a100002_10:	Total Males
a100003_10:	Total Females
a100004_10:	Sex Ratio（Female=100）
a100005_10:	Total Population with Household Registration by Township
a100006_10:	Percentage of Minority Population to Total Population
a100007_10:	Percentage of Non-agricultural Population to Total Population
a100008_10:	Urban Population
a100009_10:	Rural Population
a100010_10:	Total Number of Family Households
a100011_10:	Total Population of Family Households
a100012_10:	Size of Family Households
a100013_10:	Total Number of Family Households for One Person
a100014_10:	One-Generation Family Households
a100015_10:	Two-Generation Family Households
a100016_10:	Three-Generation Family Households
a100017_10:	Four-Generation and Over Family Households
```

## `data-base-layer`

Set the map base layer, identified by the "Slug" field set in the admin.

```html
<span class="collection" data-base-layer="esri-delorme">... text ...</span>
```

## `data-wms-layer`

Set the WMS "overlay" map layer, identified by the "Slug" field set in the admin.

```html
<span class="collection" data-wms-layer="an-lu">... text ...</span>
```

## `data-start` + `data-end`

Set the start and end dates on the time slider, which has the effect of filtering collection markers on the map. The dates should be provided in ISO8601 format -- 4-digit year, 2-digit month, 2-digit day.

```html
<span class="collection" data-start="2008-01-01" data-end="2012-01-01">... text ...</span>
```

## `data-tl` + `data-br` + `data-label`

These attributes can be used to create a "section box" on the map, which is displayed as a black box around a region of the map, annotated with a text label. This makes it possible to split an essay up into a set of high-level parts, each corresponding to a general region on the map, and to dynamically connect the sections with those regions.

`data-tl` is a latitude-longitude coordinate, separated by a comma, that defines the **top left** of the box on the map. `data-br` is a second coordinate that marks the **bottom right** corner. `data-label` is the plain text label that gets displayed along the top of the box.

These should be applied to a `<div>` element, which wraps around one or more `<p>` elements that contain the actualy text content:

```html
<div class="section" data-tl="43.765575,81.825472" data-br="25.1882035,112.6664964" data-label="Section Label">
  <p>First graf...</p>
  <p>Second graf...</p>
  ...
</div>
```

---

And, of course, all of these attributes can be mixed together. For example, if a span needs to focus on a collection marker, change the base layer, and change the demographic overlay:

```html
<span class="collection" data-id="5" data-base-layer="osm-grayscale" data-choropleth="a100011_10">... text ...</span>
```
