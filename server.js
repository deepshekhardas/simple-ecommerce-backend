const { app, setupErrorHandlers } = require('./app');
const connectDB = require('./config/db');
const config = require('./config/env');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { typeDefs, resolvers } = require('./graphql');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

// Uncaught Exception Handler
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

const startServer = async () => {
    try {
        // Connect Database
        await connectDB();

        // Setup Apollo Server
        const apolloServer = new ApolloServer({
            typeDefs,
            resolvers,
        });

        await apolloServer.start();

        // Integrate Apollo Middleware
        app.use('/graphql', expressMiddleware(apolloServer, {
            context: async ({ req }) => {
                let token;
                if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
                    token = req.headers.authorization.split(' ')[1];
                }

                if (!token) return { user: null };

                try {
                    const decoded = jwt.verify(token, config.jwt.secret);
                    const user = await User.findById(decoded.id);
                    return { user };
                } catch (err) {
                    return { user: null };
                }
            },
        }));

        console.log('GraphQL Server ready at /graphql');

        // Setup Error Handlers (must be last)
        setupErrorHandlers(app);

        // Start Express Server
        const server = app.listen(config.port, () => {
            console.log(`Server running in ${config.env} mode on port ${config.port}`);
        });

        // Unhandled Rejection Handler
        process.on('unhandledRejection', err => {
            console.log('UNHANDLED REJECTION! 💥 Shutting down...');
            console.log(err.name, err.message);
            server.close(() => {
                process.exit(1);
            });
        });

    } catch (err) {
        console.error('Failed to start server:', err);
    }
};

startServer();
