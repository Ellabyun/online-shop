const path = require('path');

const express = require('express');
const csrf = require('csurf');
const expressSession = require('express-session');

const createSessionConfig = require('./config/session')
const db = require('./data/database');
const addCsrfTokenMiddleware = require('./middleswares/csrf-token');
const errorHandlerMiddleware = require('./middleswares/error-handler');
const checkAuthStatusMiddleware = require('./middleswares/check-auth');
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/products.routes');
const baseRoutes = require('./routes/base.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
//'/products/assets'로 시작하는 요청만 이 미들웨어를 사용하라
//업로드된 이미지를 정적으로 제공하는 방법
//url을 통해 서버의 폴더 구조가 노출되지 않는 것이 장점!
app.use('/products/assets', express.static('product-data'));
app.use(express.urlencoded({extended: false}));

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));
app.use(csrf());

app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);

app.use(baseRoutes);
app.use(authRoutes);
app.use(productRoutes);
app.use('/admin', adminRoutes)

app.use(errorHandlerMiddleware);

db.connectToDatabase()
    .then(function(){
        app.listen(3000);
    })
    .catch(function(error){
        console.log('Failed to connect to the database!');
        console.log(error);
    });
