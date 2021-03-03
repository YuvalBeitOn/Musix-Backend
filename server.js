const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(
	session({
		secret: 'Yuval&Guy',
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false },
	})
);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.resolve(__dirname, 'build')));
} else {
	const corsOptions = {
		origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
		credentials: true,
	};
	app.use(cors(corsOptions));
}

const authRoutes = require('./api/auth/auth.routes');
const userRoutes = require('./api/user/user.routes');
const mixRoutes = require('./api/mix/mix.routes')

app.use('/api/mix', mixRoutes)
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.get('/**', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const logger = require('./services/logger.service');
const port = process.env.PORT || 3030;
http.listen(port, () => {
	console.log(`the server running in port ${port}`);
});
