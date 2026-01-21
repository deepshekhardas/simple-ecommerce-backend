const { gql } = require('graphql-tag');

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    phone: String
    role: String!
    createdAt: String
  }

  type ProductVariant {
    size: String
    color: String
    stock: Int
  }

  type Product {
    _id: ID!
    name: String!
    description: String
    price: Float!
    sku: String
    category: String
    images: [String]
    stock: Int
    variants: [ProductVariant]
    averageRating: Float
    numReviews: Int
    createdAt: String
  }

  type CartItem {
    product: Product!
    quantity: Int!
    price: Float!
    variant: ProductVariant
  }

  type Cart {
    _id: ID!
    user: ID!
    items: [CartItem]
    totalPrice: Float
  }

  type OrderItem {
    product: Product!
    quantity: Int!
    price: Float!
  }

  type Order {
    _id: ID!
    user: User
    items: [OrderItem]
    totalAmount: Float
    status: String
    shippingAddress: String
    createdAt: String
  }

  type Review {
    _id: ID!
    user: User
    product: ID!
    rating: Int!
    comment: String
    createdAt: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    # Products
    products(limit: Int, page: Int, category: String): [Product]
    product(id: ID!): Product
    
    # Users (Admin)
    users: [User]
    user(id: ID!): User
    me: User
    
    # Cart
    cart: Cart
    
    # Orders
    orders: [Order]
    order(id: ID!): Order
    myOrders: [Order]
    
    # Reviews
    reviews(productId: ID!): [Review]
    
    # Stats (Admin)
    stats: Stats
  }

  type Stats {
    totalRevenue: Float
    totalOrders: Int
    totalUsers: Int
    totalProducts: Int
  }

  type Mutation {
    # Auth
    register(name: String!, email: String!, password: String!, phone: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    
    # Cart
    addToCart(productId: ID!, quantity: Int!, variantIndex: Int): Cart
    removeFromCart(productId: ID!): Cart
    clearCart: Cart
    
    # Orders
    createOrder(shippingAddress: String!, billingAddress: String): Order
    updateOrderStatus(id: ID!, status: String!): Order
    
    # Reviews
    createReview(productId: ID!, rating: Int!, comment: String): Review
    
    # Products (Admin)
    createProduct(
      name: String!
      description: String
      price: Float!
      sku: String
      category: String
      images: [String]
      stock: Int
    ): Product
    updateProduct(id: ID!, name: String, price: Float, stock: Int): Product
    deleteProduct(id: ID!): Boolean
  }
`;

module.exports = typeDefs;
