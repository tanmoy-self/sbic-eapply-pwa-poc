import * as express from 'express';
import {Application} from 'express';
import {addPushSubscriber} from "./add-push-subscriber.route";
import {sendNotification} from "./send-notification.route";
import {getAllClaims, saveClaim} from "./claim-service.route";

const bodyParser = require('body-parser');
const webpush = require('web-push');
const cors = require('cors');

//Check this: https://github.com/web-push-libs/web-push
const vapidKeys = {
    "publicKey": "BFRAR28u6JLh_bC-3aTQr-tECmen5wAZkhjnMTeSoJe1n7aXIsJuqv5yayBCvgB7rZhBJG1Zv5ld3dONY4itQE8",
    "privateKey": "U0Gw51rOA42f1pKDXU4Q_ThKZhBrlkuhlsfL4NAVcFA"
};

webpush.setVapidDetails(
    'mailto:tanmoy_roy1@outlook.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

const app: Application = express();
app.use(bodyParser.json());
app.use(cors({origin: true, credentials: true}));

app.route('/api/claims')
    .post(saveClaim);

app.route('/api/claims')
    .get(getAllClaims);

app.route('/api/notifications')
    .post(addPushSubscriber);

app.route('/api/notifications/enable')
    .post(sendNotification);

const PORT = 9000;
const HOST = 'localhost';

const httpServer = app.listen(PORT, HOST, () => {
    console.log("HTTP Server running at http://" + HOST + ":" + PORT);
});
