# Sales System Frontend

A modern Vue.js frontend for a sales management system. This application provides a user-friendly interface for managing products, orders, customers, and generating reports.

## Features

- Dashboard with sales overview and key metrics
- Product management (CRUD operations)
- Order management and tracking
- Customer management
- Sales reports and analytics
- User profile management
- Responsive design with Element Plus UI components

## Prerequisites

- Node.js (v14 or higher)
- Yarn package manager (recommended) or npm
- Backend API server (configured separately)

## Project Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd marketsystemui
```

2. Install dependencies:
```bash
yarn install
```

3. Create a `.env` file in the root directory and configure your environment variables:
```
VUE_APP_API_URL=http://localhost:8080
```

4. Start the development server:
```bash
yarn serve
```

The application will be available at `http://localhost:8080`

## Project Structure

```
src/
├── components/         # Reusable components
├── views/             # Page components
├── router/            # Vue Router configuration
├── store/             # Vuex store modules
├── assets/            # Static assets
├── App.vue            # Root component
└── main.js            # Application entry point
```

## Available Scripts

- `yarn serve` - Start development server
- `yarn build` - Build for production
- `yarn lint` - Run ESLint

## Dependencies

- Vue 3
- Vue Router
- Vuex
- Element Plus
- Axios
- Core-js

## API Integration

The application expects the following API endpoints:

- Authentication:
  - POST /api/auth/login
  - POST /api/auth/logout

- Products:
  - GET /api/products
  - POST /api/products
  - PUT /api/products/:id
  - DELETE /api/products/:id

- Orders:
  - GET /api/orders
  - POST /api/orders
  - PUT /api/orders/:id
  - GET /api/orders/:id

- Customers:
  - GET /api/customers
  - POST /api/customers
  - PUT /api/customers/:id
  - GET /api/customers/:id/orders

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. # marketsystemui
