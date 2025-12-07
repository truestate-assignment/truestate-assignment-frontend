# Frontend - Retail Sales Management System
https://truestate-assignment-frontend-v2.vercel.app/
Modern, responsive React application for managing retail sales data with advanced search, filtering, and data visualization capabilities.

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS v4
- **HTTP Client**: Axios
- **Icons**: Heroicons
- **State Management**: React Hooks (useState, useEffect, custom hooks)

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx                 # Navigation sidebar
│   │   ├── StatsCards.jsx              # Statistics display
│   │   ├── FilterPanel.jsx             # Filter controls
│   │   ├── TransactionTable.jsx        # Data table
│   │   ├── Pagination.jsx              # Pagination controls
│   │   ├── AddTransactionModal.jsx     # Add/Edit modal
│   │   ├── TransactionDetailSidebar.jsx # Detail view
│   │   └── DeleteConfirmModal.jsx      # Delete confirmation
│   ├── pages/
│   │   ├── Dashboard.jsx               # Dashboard page
│   │   ├── Services.jsx                # Main transactions page
│   │   ├── NotFound.jsx                # 404 page
│   │   └── UnderDevelopment.jsx        # Placeholder pages
│   ├── hooks/
│   │   └── useTransactions.js          # Custom hook for data fetching
│   ├── services/
│   │   └── api.js                      # API service layer
│   ├── styles/
│   │   └── index.css                   # Global styles & Tailwind
│   ├── App.jsx                         # Root component
│   └── main.jsx                        # Entry point
├── public/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Features

### 1. **Advanced Search**
- Real-time search across customer name, phone number, and product name
- Case-insensitive matching
- Debounced input for performance
- Clear button for quick reset
- Visual feedback during search

### 2. **Multi-Select Filters**
- **Customer Region**: North, South, East, West, Central
- **Gender**: Male, Female
- **Product Category**: Clothing, Electronics, Home, Beauty
- **Tags**: New, Sale, Popular
- **Payment Method**: Card, UPI, Cash
- **Age Range**: Dual-slider (18-100)
- **Date Range**: Calendar picker with start/end dates
- **Price Range**: Min/max inputs

### 3. **Flexible Sorting**
- Customer Name (A-Z / Z-A)
- Date (Newest First / Oldest First)
- Total Amount (High to Low / Low to High)
- Visual indicator for active sort

### 4. **Smart Pagination**
- 10 items per page
- Sliding window with ellipsis for large datasets
- Next/Previous navigation
- Jump to specific page
- Disabled states at boundaries

### 5. **Transaction Management**
- **Add**: Modal with image upload (Base64)
- **Edit**: Pre-filled form with existing data
- **Delete**: Confirmation modal with undo option
- **View Details**: Slide-over sidebar with full information

### 6. **Responsive Design**
- Mobile-first approach
- Collapsible sidebar drawer on mobile
- Touch-friendly controls
- Responsive grid layouts
- Optimized for all screen sizes

### 7. **Real-Time Statistics**
- Total Units Sold
- Total Amount (with currency formatting)
- Total Discount
- Updates based on active filters

### 8. **Enhanced UX**
- Loading states with skeletons
- Empty states with helpful messages
- Error handling with retry options
- Copy-to-clipboard for phone numbers
- Smooth transitions and animations
- Active filter indicators

## Component Architecture

### Core Components

#### `App.jsx`
- Root component with routing
- Layout structure
- Header with user profile
- Mobile menu toggle

#### `Sidebar.jsx`
- Navigation menu
- Expandable submenus
- Active route highlighting
- Mobile drawer mode

#### `Services.jsx` (Main Page)
- Orchestrates all components
- Manages global state
- Handles data fetching
- Coordinates filters and pagination

#### `FilterPanel.jsx`
- Reusable filter dropdowns
- Age range slider
- Date range picker
- Reset functionality
- Active filter badges

#### `TransactionTable.jsx`
- Data display
- Row click handlers
- Copy-to-clipboard
- Loading states
- Empty states

#### `Pagination.jsx`
- Page navigation
- Ellipsis for large page counts
- Boundary handling

### Custom Hooks

#### `useTransactions.js`
```javascript
const {
  transactions,      // Current page data
  loading,           // Loading state
  error,             // Error state
  currentPage,       // Current page number
  setCurrentPage,    // Page setter
  totalPages,        // Total pages
  filters,           // Active filters
  updateFilter,      // Update single filter
  resetFilters,      // Clear all filters
  refreshTransactions // Reload data
} = useTransactions();
```

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file:
```env
VITE_API_URL=http://localhost:5000/api/transactions
```

For production:
```env
VITE_API_URL=https://your-backend-url.com/api/transactions
```

### 3. Start Development Server
```bash
npm run dev
```

The app will start on `http://localhost:5173`

### 4. Build for Production
```bash
npm run build
```

Output will be in the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000/api/transactions` |

## Styling

### Tailwind CSS v4

Custom theme configuration in `src/styles/index.css`:

```css
@theme {
  --color-primary-50: #EEF2FF;
  --color-primary-100: #E0E7FF;
  --color-primary-500: #6366F1;
  --color-primary-600: #4F46E5;
  --color-primary-700: #4338CA;
}
```

### Design System

- **Font**: Inter (Google Fonts)
- **Colors**: Indigo primary palette
- **Spacing**: Tailwind default scale
- **Shadows**: Custom elevation system
- **Transitions**: 200ms ease-in-out

## State Management

### Local State (useState)
- Component-specific UI state
- Form inputs
- Modal visibility
- Dropdown open/close

### Custom Hooks
- Data fetching and caching
- Filter state management
- Pagination state
- Search debouncing

### URL State (React Router)
- Current route
- Navigation history

## API Integration

### Service Layer (`api.js`)

```javascript
// Fetch transactions with filters
fetchTransactions({ page, search, filters })

// Get statistics
fetchStats()

// Create transaction
createTransaction(data)

// Update transaction
updateTransaction(id, data)

// Delete transaction
deleteTransaction(id)
```

### Error Handling
- Network errors with retry
- Validation errors with field highlighting
- Server errors with user-friendly messages

## Performance Optimizations

1. **Code Splitting**: Route-based lazy loading
2. **Debounced Search**: 300ms delay
3. **Memoization**: React.memo for expensive components
4. **Virtual Scrolling**: Ready for large datasets
5. **Image Optimization**: Base64 encoding with size limits
6. **Bundle Optimization**: Vite's automatic code splitting

## Responsive Breakpoints

```css
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari 12+, Chrome Mobile)

## Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus indicators
- Screen reader support
- Color contrast compliance (WCAG AA)

## Deployment

### Vercel Deployment

1. Connect GitHub repository
2. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
3. Add environment variables
4. Deploy

### Netlify Deployment

1. Connect GitHub repository
2. Configure build settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
3. Add environment variables
4. Deploy

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Serve the `dist/` directory with any static file server

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint (if configured)

## Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "axios": "^1.6.2",
  "@heroicons/react": "^2.1.0"
}
```

## Development Dependencies

```json
{
  "vite": "^5.0.0",
  "tailwindcss": "^4.0.0",
  "@vitejs/plugin-react": "^4.2.0"
}
```

## File Size Optimization

- **Initial Bundle**: ~150KB (gzipped)
- **Vendor Chunks**: Automatically split by Vite
- **Image Optimization**: Base64 with 2MB limit
- **CSS Purging**: Tailwind removes unused styles

## Testing (Future Enhancement)

Recommended testing setup:
- **Unit Tests**: Vitest
- **Component Tests**: React Testing Library
- **E2E Tests**: Playwright or Cypress

## Known Issues & Limitations

1. Image upload limited to 2MB (Base64 encoding)
2. Date picker requires manual input on some mobile browsers
3. Large datasets (>10k records) may benefit from virtual scrolling

## Future Enhancements

- [ ] Dark mode toggle
- [ ] Export to CSV/PDF
- [ ] Advanced analytics dashboard
- [ ] Bulk operations
- [ ] Offline support with service workers
- [ ] Real-time updates with WebSockets

## License

This project is part of the TruEstate SDE Intern Assignment.

---

**Developed by**: Punit Punde  
**Last Updated**: December 2024
