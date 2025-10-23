man i ahve design in figma and i wnat to make the componet analysis s that we can start working and devceloping it so we  already ahve the web app called scheduling i want to resuse their components the green tag now so that it is easire for eveyone to get started working on this man and understaing it  i hjave also added the image 24 image uploaded Make this component list user-friendly:

1. Add a DESIGN GALLERY at the top:
- Show Design 1-20 with page names
- Add image placeholders: "[Upload Design 1: Coordinators Page image here]" so that we can match the image with legends man 

2. Group components by Design Number and Page Name:
- Design 1: Coordinators Page
- Design 2: Add New Coordinator Modal
- Design 3: Dashboard
- etc.

3. For each design section, show:
- Page name as big heading
- Design number
- Image placeholder
- Table of components with Status and Complexity
- Count: "X available, Y missing, Z needs work"

4. Add 3 simple summary sections:
- 🟢 AVAILABLE (What we can reuse)
- 🔴 MISSING (What we need to build)
- 🟡 NEEDS WORK (What to enhance)

5. Add a "Quick Start" section:
- List easiest components first (XS complexity)
- Group by page

6. Use:
- Big clear headings
- Color-coded status
- Simple language
- No complicated terms

Keep it super simple and visual. Anyone should understand it easily.









# 📋 Credentialing Components Analysis

## 📊 Quick Summary
- **Total Designs**: 20 screens analyzed
- **🟢 Available**: 90 components (can reuse from scheduling)
- **🔴 Missing**: 65 components (need to build)
- **🟡 Needs Work**: 18 components (enhance existing)

---

## 🎨 Design 1: Coordinators Page

**Components:**
- 🟢 Navigation tabs | Complexity: XS | Reuse from toolbar.tsx
- 🟢 Search input | Complexity: XS | Reuse from ui/input
- 🟢 Add New Coordinator button | Complexity: XS | Reuse primary button
- 🟢 Avatar images | Complexity: XS | Reuse Antd Avatar
- 🟢 Phone & Email icons | Complexity: XS | Reuse from lucide-react
- 🟢 Edit pencil icon | Complexity: XS | Reuse icon button
- 🔴 Application count badge | Complexity: S | Build badge showing "5 Applications"
- 🟡 Active status indicator | Complexity: S | Add "Active" with green dot
- 🔴 Coordinator list item | Complexity: L | Build complete row layout
- 🔴 Sortable table headers | Complexity: M | Add sort arrows to headers

**Summary**: 6 Available | 3 Missing | 1 Needs Work

---

## 🎨 Design 2: Add New Coordinator Modal

**Components:**
- 🟢 Modal container | Complexity: XS | Reuse drawer/dialog
- 🟢 Input fields (First/Last Name) | Complexity: XS | Reuse form inputs
- 🟢 Email & Phone inputs | Complexity: XS | Reuse form inputs
- 🟢 Save/Cancel buttons | Complexity: XS | Reuse button variants

**Summary**: 4 Available | 0 Missing | 0 Needs Work

---

## 🎨 Design 3: Dashboard

**Components:**
- 🔴 User greeting "Hello David 👋" | Complexity: M | Build greeting with avatar
- 🟢 Search bar | Complexity: XS | Reuse search input
- 🟢 Start New Application button | Complexity: XS | Reuse primary button
- 🔴 Section header "Active Applications" | Complexity: S | Build section header
- 🟡 Filter dropdowns (Status/Coordinator/Due Date) | Complexity: M | Combine into unified filter bar
- 🔴 Coordinator group header (Mark Lee) | Complexity: M | Build group header with avatar
- 🟢 Expandable chevron rows | Complexity: XS | Reuse expandable-row-header
- 🔴 Application list items (provider rows) | Complexity: L | Build provider row component
- 🟢 Three-dot action menu | Complexity: S | Reuse dropdown pattern
- 🟡 Status badges (In-Progress/Under Review) | Complexity: S | Add new status variants
- 🟡 Status badges (On Track/Falling Behind) | Complexity: S | Add new status variants
- 🔴 Nested/indented table rows | Complexity: M | Build nested row layout
- 🔴 Alerts section header "Alerts 3" | Complexity: S | Build header with count
- 🔴 Alert item cards | Complexity: M | Build alert card component

**Summary**: 4 Available | 7 Missing | 3 Needs Work

---

## 🎨 Design 4: Provider Details - Basic Info

**Components:**
- 🔴 Breadcrumb (Providers > Provider Details) | Complexity: S | Build breadcrumb component
- 🔴 Provider profile header | Complexity: L | Build header with large avatar + name + status
- 🔴 In-Progress status badge | Complexity: S | Build status with blue dot
- 🟢 Secondary tabs (Basic Info/Applications/etc) | Complexity: M | Adapt existing tabs
- 🟢 Send Message button | Complexity: XS | Reuse secondary button
- 🟢 Three-dot dropdown | Complexity: XS | Reuse dropdown
- 🔴 Key-value info display (Phone/Email/Address) | Complexity: M | Build label-value pairs
- 🔴 Quick Links section | Complexity: M | Build editable list section
- 🔴 Editable list item (NPI/CAQH with icons) | Complexity: M | Build item with edit/copy/delete
- 🟢 Edit/Copy/Delete icon buttons | Complexity: XS | Reuse icon buttons
- 🔴 Add New link | Complexity: S | Build "+ Add New" link

**Summary**: 4 Available | 7 Missing | 0 Needs Work

---

## 🎨 Design 5: Provider Details - Add Quick Link

**Components:**
- 🔴 Collapsible section with inline form | Complexity: M | Build expandable section
- 🔴 Inline form (Title + Value) | Complexity: M | Build inline form with Save/Cancel
- 🟢 Input fields | Complexity: XS | Reuse text inputs
- 🟢 Save/Cancel buttons | Complexity: XS | Reuse button variants

**Summary**: 2 Available | 2 Missing | 0 Needs Work

---

## 🎨 Design 6: Prepare Packet Modal

**Components:**
- 🟢 Modal container | Complexity: XS | Reuse dialog
- 🟢 Select Application dropdown | Complexity: XS | Reuse select
- 🟢 Cover Template dropdown | Complexity: XS | Reuse select
- 🟢 Checkboxes | Complexity: XS | Reuse checkbox
- 🟢 PDF file icons | Complexity: XS | Reuse lucide icons
- 🔴 Two-column layout (Available | Order in Packet) | Complexity: L | Build transfer list layout
- 🔴 Selectable document list (left column) | Complexity: M | Build list with checkboxes
- 🔴 Drag-drop reorderable list (right column) | Complexity: L | Build with drag handles (needs @dnd-kit)
- 🔴 Numbered document list | Complexity: M | Build ordered list (1. 2. 3.)
- 🔴 Drag handles (≡) | Complexity: S | Add drag handle icons
- 🟡 Column headers with subtitle | Complexity: S | Add subtitle pattern

**Summary**: 5 Available | 5 Missing | 1 Needs Work

---

## 🎨 Design 7: Documents Tab

**Components:**
- 🟢 Upload New Document button | Complexity: XS | Reuse secondary button
- 🟢 Add Required Document button | Complexity: XS | Reuse secondary button
- 🟢 Table structure | Complexity: XS | Reuse table component
- 🟢 Calendar icon | Complexity: XS | Reuse lucide icon
- 🔴 Set Expiration Date link | Complexity: M | Build inline date picker link
- 🔴 Document row with expiration date | Complexity: M | Build row with date metadata
- 🟡 Ready for Review status badge | Complexity: S | Add purple dot variant
- 🔴 Missing document row with description | Complexity: M | Build row with long text
- 🔴 Multi-section table (Uploaded + Missing) | Complexity: M | Build table with dividers

**Summary**: 4 Available | 4 Missing | 1 Needs Work

---

## 🎨 Design 8: Add Required Document Modal

**Components:**
- 🟢 Modal container | Complexity: XS | Reuse dialog
- 🟢 Document Name input | Complexity: XS | Reuse text input
- 🟢 Description textarea | Complexity: XS | Reuse textarea
- 🔴 Character counter "0/500" | Complexity: XS | Build counter component
- 🟢 Submit button | Complexity: XS | Reuse primary button
- 🔴 View action link (blue) | Complexity: M | Build inline action link
- 🔴 Delete action link (red) | Complexity: M | Build destructive link
- 🔴 Request/Upload/Edit action links | Complexity: S | Build action link variants
- 🟡 Multiple action links in one cell | Complexity: S | Create layout pattern

**Summary**: 4 Available | 4 Missing | 1 Needs Work

---

## 🎨 Design 9: Action Items Tab

**Components:**
- 🟢 Assign Action Item button | Complexity: XS | Reuse secondary button
- 🟢 Action Items table | Complexity: XS | Reuse table
- 🔴 Action item row (all columns) | Complexity: M | Build row with Application/Action/Target/Instructions/Status
- 🔴 Multi-line instruction cell | Complexity: S | Build cell with text wrapping
- 🟡 Assigned status badge (purple dot) | Complexity: S | Add Assigned variant
- 🟡 Double-dash placeholder "--" | Complexity: XS | Add empty state pattern

**Summary**: 2 Available | 2 Missing | 2 Needs Work

---

## 🎨 Design 10: Monitoring Tab

**Components:**
- 🟢 Add Document/Task links | Complexity: XS | Reuse add links
- 🟢 Expandable chevron rows | Complexity: XS | Reuse expandable component
- 🔴 Tracked elements table | Complexity: L | Build credential tracking table
- 🔴 Multi-level nested tasks (3+ levels) | Complexity: XL | Build recursive nested component
- 🔴 Verification checks table | Complexity: L | Build verification table
- 🔴 File link display (Screenshot01.jpg) | Complexity: S | Build clickable file link
- 🔴 Multi-level indentation CSS | Complexity: M | Build indent depth styles
- 🟡 Active status (green dot) | Complexity: S | Add Active variant
- 🟡 Expiring Soon status (blue dot) | Complexity: S | Add Expiring Soon variant
- 🟡 Expired status (red dot) | Complexity: S | Add Expired variant
- 🟡 Complete status (green dot) | Complexity: S | Add Complete variant
- 🟡 Pending status (blue dot) | Complexity: S | Add Pending variant

**Summary**: 2 Available | 5 Missing | 5 Needs Work

---

## 🎨 Design 11: Applications Tab

**Components:**
- 🟢 Prepare Packet button | Complexity: XS | Reuse secondary button
- 🟢 Add New Application button | Complexity: XS | Reuse secondary button
- 🟢 Expandable Entity rows | Complexity: XS | Reuse expandable component
- 🟢 Three-dot menu | Complexity: XS | Reuse dropdown
- 🟢 PDF icons | Complexity: XS | Reuse file icons
- 🟢 Info icon with tooltip | Complexity: XS | Reuse tooltip
- 🟢 Upload button with icon | Complexity: XS | Reuse button
- 🔴 Nested detail panel (Entity A expanded) | Complexity: XL | Build nested expandable panel
- 🔴 Description with inline Edit link | Complexity: M | Build description with edit
- 🔴 Document list table (Requirements & Templates) | Complexity: L | Build document table
- 🔴 Notes list component (Notes (2)) | Complexity: M | Build notes list
- 🔴 Note item card (date + description) | Complexity: S | Build note card
- 🔴 Application entity row | Complexity: L | Build entity row with all columns
- 🔴 Count indicator badge "2 Notes" | Complexity: S | Build count badge
- 🟡 Review in Progress status (green dot) | Complexity: S | Add Review in Progress variant
- 🟡 Document tag badges (Blank/Completed) | Complexity: S | Add document tag variants
- 🟡 Section header with action link | Complexity: S | Create header + link pattern

**Summary**: 7 Available | 7 Missing | 3 Needs Work

---

## 🎨 Design 12: Checklists Page

**Components:**
- 🟢 Add New Checklist button | Complexity: XS | Reuse primary button
- 🟢 Search input | Complexity: XS | Reuse search
- 🟢 Edit/Delete icons | Complexity: XS | Reuse icon buttons
- 🟢 Avatars in Created By | Complexity: XS | Reuse avatar
- 🟢 Checklist Title input | Complexity: XS | Reuse text input
- 🟢 Description textarea | Complexity: XS | Reuse textarea
- 🟢 Character counter "0/250" | Complexity: XS | Reuse from previous
- 🟢 Close X button | Complexity: XS | Reuse drawer close
- 🔴 Wizard stepper navigation (1. 2. 3.) | Complexity: XL | Build multi-step wizard
- 🔴 Checklist table row (all columns) | Complexity: M | Build checklist row
- 🔴 Sortable headers with ↕ arrows | Complexity: M | Build sortable headers
- 🔴 Field/Document count display | Complexity: S | Build count badges
- 🔴 Step indicator with numbered circles | Complexity: M | Build step indicator
- 🟡 Back button with left arrow | Complexity: S | Add ghost button with icon
- 🟡 Wizard footer layout (Back/Next/Publish) | Complexity: S | Create footer button pattern

**Summary**: 8 Available | 5 Missing | 2 Needs Work

---

## 🎨 Design 13: Checklist Builder - Fields

**Components:**
- 🟢 Search input in palette | Complexity: XS | Reuse search
- 🟢 Preview button | Complexity: XS | Reuse secondary button
- 🟢 Publish Checklist button | Complexity: XS | Reuse primary button
- 🔴 Field palette sidebar (left panel) | Complexity: L | Build field palette with categories
- 🔴 Draggable field items (Full Name/Email/Phone) | Complexity: M | Build draggable field items
- 🔴 Drag-drop zone canvas | Complexity: XL | Build drop zone with placeholder
- 🔴 Field group dividers (Grouped Elements/Basic) | Complexity: S | Build divider component
- 🔴 Editable section title "+ Add Section Title" | Complexity: M | Build editable title
- 🔴 ADD NEW SECTION button | Complexity: S | Build add section button
- 🔴 Field type icon set (A/envelope/phone/etc) | Complexity: M | Create field type icons
- 🔴 Form builder canvas with preview | Complexity: XL | Build canvas with live preview
- 🟡 Split panel layout (palette | canvas) | Complexity: M | Create 2-column layout

**Summary**: 3 Available | 8 Missing | 1 Needs Work

---

## 🎨 Design 14: Checklist Builder - Properties

**Components:**
- 🟢 Toggle switches (Required/Allow multiple) | Complexity: XS | Reuse switch component
- 🟢 Delete icon (red) | Complexity: XS | Reuse delete icon
- 🔴 Dropped field with drag handle | Complexity: L | Build dropped field component
- 🔴 Field properties panel (right sidebar) | Complexity: L | Build properties panel
- 🔴 Sublabel configuration (First Name | Last Name) | Complexity: M | Build sublabel config
- 🔴 Multi-field preview | Complexity: M | Build split field preview
- 🔴 Property group with toggle + description | Complexity: M | Build property group
- 🟡 Three-column layout (palette | canvas | properties) | Complexity: M | Create 3-column layout

**Summary**: 2 Available | 5 Missing | 1 Needs Work

---

## 🎨 Design 15: Start Application - Select Entities

**Components:**
- 🟢 Select Provider dropdown | Complexity: XS | Reuse select
- 🟢 Radio buttons | Complexity: XS | Reuse radio inputs
- 🟢 Back/Next Step buttons | Complexity: XS | Reuse buttons
- 🟢 Wizard stepper | Complexity: XS | Reuse from previous
- 🔴 Entity list item (Valley Hospital + Privileging) | Complexity: M | Build entity item with sublabel
- 🔴 Entity type label (Privileging/Enrollment) | Complexity: S | Build type label

**Summary**: 4 Available | 2 Missing | 0 Needs Work

---

## 🎨 Design 16: Generate Checklist Summary

**Components:**
- 🟢 Back/Next buttons | Complexity: XS | Reuse buttons
- 🔴 Requirements summary list | Complexity: L | Build summary with aggregation
- 🔴 Multi-entity tag display (Valley Hospital/BCBS) | Complexity: M | Build multi-tag component
- 🔴 Entity link badge (blue clickable pills) | Complexity: S | Build entity badge

**Summary**: 1 Available | 3 Missing | 0 Needs Work

---

## 🎨 Design 17: Upload Document Modal

**Components:**
- 🟢 Upload Document button | Complexity: XS | Reuse primary button
- 🟢 Document type dropdown | Complexity: XS | Reuse select
- 🟢 Drag & drop area | Complexity: XS | Reuse drop zone
- 🟢 Close X button | Complexity: XS | Reuse dialog close
- 🔴 File upload drop zone with icon | Complexity: M | Build file drop zone (use react-dropzone)
- 🔴 Upload illustration icon (document + arrow) | Complexity: S | Create/source upload icon
- 🔴 File size limit text "Max file size 14MB" | Complexity: XS | Build helper text

**Summary**: 4 Available | 3 Missing | 0 Needs Work

---

## 🎨 Design 18: Extracted Fields View

**Components:**
- 🔴 Uploaded file card "External App.pdf" | Complexity: S | Build file card with icon
- 🔴 Extracted field list | Complexity: L | Build auto-mapped field list
- 🔴 Field mapping row (field | AI-generated | Edit) | Complexity: M | Build mapping row
- 🔴 AI-generated status badge (blue) | Complexity: S | Build AI-generated badge
- 🟢 Edit link | Complexity: XS | Reuse from previous

**Summary**: 1 Available | 4 Missing | 0 Needs Work

---

## 🎨 Design 19: Field Validation

**Components:**
- 🔴 Field confirmation checkbox (blue checkmark) | Complexity: S | Build confirmation button
- 🔴 Field removal button (X) | Complexity: S | Build removal button
- 🔴 User-edited status badge | Complexity: S | Build User-edited badge
- 🟡 State transition logic (AI → User-edited) | Complexity: M | Create validation transitions

**Summary**: 0 Available | 3 Missing | 1 Needs Work

---

## 🎨 Design 20: Success Confirmation

**Components:**
- 🟢 Success modal | Complexity: XS | Reuse dialog
- 🟢 Done button | Complexity: XS | Reuse primary button
- 🔴 Success content (checkmark + message) | Complexity: S | Build success layout

**Summary**: 2 Available | 1 Missing | 0 Needs Work

---

## 🚀 Quick Start - Build These First (Easiest Components)

### XS Complexity - Super Easy:
1. Character counter "0/500" (Design 8)
2. File size limit helper text (Design 17)
3. Double-dash placeholder "--" (Design 9)

### S Complexity - Easy:
1. Application count badge (Design 1)
2. Section header components (Designs 3, 20)
3. Add New link (Design 4)
4. Breadcrumb navigation (Design 4)
5. In-Progress status badge (Design 4)
6. Status badge variants (Designs 3, 9, 10)

### M Complexity - Medium:
1. Key-value info display (Design 4)
2. User greeting component (Design 3)
3. Coordinator group header (Design 3)

---

## 📝 Notes for Team

**Smart/Dumb Architecture:**
Every component must have:
- **Dumb Component**: UI only (presentation)
- **Smart Container**: Business logic and state

**Example:**
- `ApplicationItem.tsx` (dumb - just renders)
- `ApplicationItemContainer.tsx` (smart - fetches data, handles actions)

**Libraries Needed:**
- `@dnd-kit/core` for drag-and-drop features
- `react-dropzone` for file uploads
- `date-fns` for date handling

---

**Document Created**: October 22, 2025  
**Analyst**: Anurag Tiwari  
**Status**: Ready for team review













