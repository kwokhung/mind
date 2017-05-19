"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./extend");
var mqtt = require("mqtt");
var client = mqtt.connect("wss://mbltest01.mqtt.iot.gz.baidubce.com:8884/mqtt", {
    username: "mbltest01/mind",
    password: "LUYHdof9is/Cg7XJMC/Nq8Tlk+tNyFrrBPnM9fw4n9Q="
});
client.on("connect", function (connack) {
    //console.log("on connect");
    //console.log(JSON.stringify(connack));
    client.on("message", function (topic, message, packet) {
        //console.log("on message");
        //console.log(JSON.stringify(topic));
        //console.log(JSON.stringify(message));
        //console.log(JSON.stringify(packet));
        console.log(topic + " <= " + message.toString());
    });
    client.subscribe("fromEight/#", function (err, granted) {
        //console.log("subscribe");
        //console.log(JSON.stringify(err));
        //console.log(JSON.stringify(granted));
    });
    client.subscribe("mind/#", function (err, granted) {
        //console.log("subscribe");
        //console.log(JSON.stringify(err));
        //console.log(JSON.stringify(granted));
        if ((typeof err === "undefined" || err === null) && granted.some(function (value) { return value.topic === "mind/#" && value.qos !== 128; })) {
            var data = {
                who: "mind",
                whoAmI: "mind",
                when: new Date().yyyyMMddHHmmss()
            };
            console.log("toEight/i.am" + " => " + JSON.stringify(data));
            client.publish("toEight/i.am", JSON.stringify(data), function (err) {
                //console.log("publish");
                //console.log(JSON.stringify(err));
            });
        }
    });
});