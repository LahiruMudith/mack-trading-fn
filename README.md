# Mack Trading — Frontend (React)

A React frontend for the Juki Machine Shop storefront. This repo implements the user-facing UI: product listing & details, contact & inquiry forms, order request flow, blog/news pages, and an admin dashboard for product/inventory management. Built to be paired with a MERN backend (Node/Express + MongoDB).

## Short description
Mack Trading — React frontend for MERN storefront (product showcase, inquiries, admin UI)

## Tech stack
- React (Create React App or Vite)
- React Router
- Context API for global state (auth, cart)
- Axios or Fetch for API calls
- CSS Modules / Tailwind / Styled Components

## Primary features (MVP)
- Product listing and product detail pages (image gallery, specs, stock status)
- Contact & inquiry form (sends to backend + email)
- Order request flow (select product → request form)
- Admin dashboard (product CRUD, inventory management, view inquiries/orders)
- Blog/News section for promotions and maintenance tips
- Search, filter, and basic sorting on product list
- Responsive layout for desktop/mobile

## Repository structure (recommended)
src/
├─ api/                 # Axios instances and API helpers  
├─ assets/              # Images, fonts  
├─ components/          # Reusable UI components (ProductCard, Navbar, Footer, Modal)  
├─ pages/               # Page components (Home, Products, ProductDetail, Contact, Admin)  
├─ context/             # AuthContext, CartContext, etc.  
├─ hooks/               # Custom hooks (useAuth, useProducts)  
├─ routes/              # App routes or route guards  
├─ styles/              # Global CSS / Tailwind config  
├─ utils/               # Helpers (formatPrice, validators)  
├─ App.jsx  
└─ index.jsx

## Getting started (local development)
1. Clone this repo:
   git clone https://github.com/LahiruMudith/mack-trading-fn.git
   cd mack-trading-fn

2. Install dependencies:
   npm install

3. Create a .env file in the project root (see "Environment variables" below).

4. Start the dev server:
   npm start
   or
   yarn start

[//]: # (## Environment variables &#40;.env&#41;)

[//]: # (- REACT_APP_API_URL=http://localhost:5000/api   # backend API base URL)

[//]: # (- REACT_APP_GOOGLE_MAPS_API_KEY=...             # optional for contact map)

[//]: # (- REACT_APP_GEMINI_API_KEY=...                  # optional if using Gemini through your server proxy)

[//]: # (- REACT_APP_SENTRY_DSN=...                      # optional for error tracking)

[//]: # ()
[//]: # (Note: Create React App requires env variables to be prefixed with REACT_APP_. Never commit secrets to git.)

[//]: # ()
[//]: # (## Available scripts)

[//]: # (- npm start — run dev server &#40;hot reload&#41;)

[//]: # (- npm run build — build production-ready static files)

[//]: # (- npm test — run tests &#40;if present&#41;)

[//]: # (- npm run lint — run linter &#40;if configured&#41;)

[//]: # (- npm run format — format code &#40;Prettier&#41;)

[//]: # ()
[//]: # (## API contract &#40;backend expectations&#41;)

[//]: # (- GET /products — list products &#40;supports query params: search, category, inStock, sort&#41;)

[//]: # (- GET /products/:id — product details)

[//]: # (- POST /auth/login — admin login &#40;returns JWT&#41;)

[//]: # (- POST /products — create product &#40;admin&#41;)

[//]: # (- PUT /products/:id — update product &#40;admin&#41;)

[//]: # (- DELETE /products/:id — delete product &#40;admin&#41;)

[//]: # (- POST /inquiries — save a contact/inquiry)

[//]: # (- POST /orders — create an order/request)

[//]: # (- GET /admin/inquiries — list inquiries &#40;admin&#41;)

[//]: # (- GET /admin/orders — list orders &#40;admin&#41;)

[//]: # ()
[//]: # (Adjust endpoint paths to match your backend.)

[//]: # ()
[//]: # (## Image uploads)

[//]: # (- For production use object storage &#40;S3 or equivalent&#41;. For quick dev use direct uploads to the backend &#40;Multer&#41; with a fallback to local storage.)

[//]: # (- Store image URLs in the product document on the backend.)

[//]: # ()
[//]: # (## Deployment)

[//]: # (- Recommended frontend hosts: Vercel or Netlify.)

[//]: # (- Build: npm run build then deploy the produced /build &#40;or /dist&#41; directory.)

[//]: # (- Set production environment variables in your host dashboard &#40;REACT_APP_API_URL -> your deployed backend&#41;.)

[//]: # (- If deploying with a CI pipeline, ensure NODE_ENV=production and proper env vars are set.)

[//]: # ()
[//]: # (## Admin / Auth notes)

[//]: # (- Keep admin credentials secure. Use JWT tokens stored in an httpOnly cookie for security &#40;or localStorage with secure handling&#41;.)

[//]: # (- Protect admin routes on both frontend &#40;route guard&#41; and backend &#40;auth middleware&#41;.)

[//]: # ()
[//]: # (## Testing & QA)

[//]: # (- Add unit tests for critical components &#40;product card, forms&#41; and integration tests for flows &#40;product → order&#41;.)

[//]: # (- Manually test responsive breakpoints and main flows: browse → inquire → admin view.)

[//]: # ()
[//]: # (## Accessibility & SEO)

[//]: # (- Use semantic HTML, proper alt attributes for images, label form inputs, and check keyboard navigation.)

[//]: # (- For SEO, render meta tags per page &#40;title, description&#41;. Consider server-side rendering &#40;Next.js&#41; later if SEO is crucial.)

[//]: # ()
[//]: # (## Optional: Gemini AI chat integration)

[//]: # (- Proxy AI queries through your backend so keys are not exposed in the browser.)

[//]: # (- Implement a lightweight chat widget that sends user queries to a backend endpoint which forwards them to the Gemini API and returns answer snippets.)

[//]: # (- Provide fallbacks &#40;FAQ-based responses&#41; if Gemini keys are not available.)

[//]: # ()
[//]: # (## Contributing)

[//]: # (1. Create a branch: git checkout -b feature/your-feature)

[//]: # (2. Commit changes with clear messages)

[//]: # (3. Open a Pull Request for review)

[//]: # ()
[//]: # (## License)

[//]: # (Add a LICENSE file appropriate for your project &#40;MIT is common for small apps&#41;.)

## Contact
- Owner: Lahiru Mudith

[//]: # (- For backend pairing, set REACT_APP_API_URL to your backend base URL before running.)