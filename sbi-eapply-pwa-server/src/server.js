"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var add_push_subscriber_route_1 = require("./add-push-subscriber.route");
var send_notification_route_1 = require("./send-notification.route");
var claim_service_route_1 = require("./claim-service.route");
var bodyParser = require('body-parser');
var webpush = require('web-push');
var cors = require('cors');
//Check this: https://github.com/web-push-libs/web-push
var vapidKeys = {
    "publicKey": "BFRAR28u6JLh_bC-3aTQr-tECmen5wAZkhjnMTeSoJe1n7aXIsJuqv5yayBCvgB7rZhBJG1Zv5ld3dONY4itQE8",
    "privateKey": "U0Gw51rOA42f1pKDXU4Q_ThKZhBrlkuhlsfL4NAVcFA"
};
webpush.setVapidDetails('mailto:tanmoy_roy1@outlook.com', vapidKeys.publicKey, vapidKeys.privateKey);
var app = express();
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));
app.route('/api/claims')
    .post(claim_service_route_1.saveClaim);
app.route('/api/claims')
    .get(claim_service_route_1.getAllClaims);
app.route('/api/notifications')
    .post(add_push_subscriber_route_1.addPushSubscriber);
app.route('/api/notifications/enable')
    .post(send_notification_route_1.sendNotification);
var PORT = 9000;
var HOST = 'localhost';
var httpServer = app.listen(PORT, HOST, function () {
    console.log("HTTP Server running at http://" + HOST + ":" + PORT);
});
