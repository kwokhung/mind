import "./extend";
import * as mqtt from "mqtt";
import { EightInterface } from "./EightInterface";

let client = mqtt.connect("wss://mbltest01.mqtt.iot.gz.baidubce.com:8884/mqtt", {
    username: "mbltest01/mind",
    password: "LUYHdof9is/Cg7XJMC/Nq8Tlk+tNyFrrBPnM9fw4n9Q="
});

client.on("connect", (connack) => {
    //console.log("on connect");
    //console.log(JSON.stringify(connack));

    client.on("message", (topic, message, packet) => {
        //console.log("on message");
        //console.log(JSON.stringify(topic));
        //console.log(JSON.stringify(message));
        //console.log(JSON.stringify(packet));

        console.log(topic + " <= " + message.toString());
    });

    client.subscribe("fromEight/#", (err, granted) => {
        //console.log("subscribe");
        //console.log(JSON.stringify(err));
        //console.log(JSON.stringify(granted));
    });

    client.subscribe("mind/#", (err, granted) => {
        //console.log("subscribe");
        //console.log(JSON.stringify(err));
        //console.log(JSON.stringify(granted));

        if ((typeof err === "undefined" || err === null) && granted.some(value => value.topic === "mind/#" && value.qos !== 128)) {
            let iAm: EightInterface.Inbound.IAmParameter = {
                who: "mind",
                whoAmI: "mind",
                when: new Date().yyyyMMddHHmmss()
            };

            console.log("toEight/iAm" + " => " + JSON.stringify(iAm));

            client.publish("toEight/iAm", JSON.stringify(iAm), (err) => {
                //console.log("publish");
                //console.log(JSON.stringify(err));
            });
        }
    });

    setInterval(() => {
        let heartbeat: EightInterface.Inbound.HeartbeatParameter = {
            who: "mind",
            when: new Date().yyyyMMddHHmmss()
        };

        console.log("toEight/heartbeat" + " => " + JSON.stringify(heartbeat));

        client.publish("toEight/heartbeat", JSON.stringify(heartbeat), (err) => {
            //console.log("publish");
            //console.log(JSON.stringify(err));
        });
    }, 60000);
})
