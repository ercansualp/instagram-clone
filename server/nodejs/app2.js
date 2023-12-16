import express from "express";
import mysql from "mysql";
import cors from "cors";
import http from "http";
import {Server} from "socket.io";

const app = express();
app.use(cors());
const port = 5000;

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {

});

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "instagram-clone"
});

conn.connect();

app.use(express.json());

// User
app.get("/user", (req, res) => {
    const {uid} = req.headers;
    if (uid) {
        try {
            conn.query(
                {
                    sql: "SELECT * FROM users WHERE uid = ?",
                    values: [uid]
                },
                (error, result) => {
                    if (error) {
                        res.send(false);
                    } else {
                        res.send(result[0]);
                    }
                }
            );
        } catch (err) {
            res.send(false);
        }
    } else {
        res.send(false);
    }
});
app.post("/user", (req, res) => {
    let {user} = req.body;
    if(user) {
        try {
            conn.query(
                {
                    sql: "INSERT INTO users (uid, username, email, password, name) VALUES (?, ?, ?, ?, ?)",
                    values: [user.uid, user.username, user.email, user.password, user.name && user.name]
                },
                (error, result) => {
                    if(error) {
                        res.send(false);
                    } else {
                        try {
                            conn.query(
                                {
                                    sql: "SELECT * FROM users WHERE id = ?",
                                    values: [result.insertId]
                                },
                                (error, result) => {
                                    if(error) {
                                        res.send(false);
                                    } else {
                                        res.send(result[0]);
                                    }
                                }
                            );
                        } catch(err) {
                            res.send(false);
                        }
                    }
                }
            );
        } catch(err) {
            res.send(false);
        }
    } else {
        res.send(false);
    }
});
app.delete("/user", (req, res) => {
    const {uid} = req.body;
    if(uid) {
        try {
            conn.query(
                {
                    sql: "DELETE FROM users WHERE uid = ?",
                    values: [uid]
                },
                (error, result) => {
                    if(error) {
                        res.send(false);
                    } else {
                        res.send(true);
                    }
                }
            );
        } catch (err) {
            res.send(false);
        }
    } else {
        res.send(false);
    }
});
app.patch("/user", (req, res) => {
    const {user} = req.body;
    if(user) {
        try {
            conn.query(
                {
                    sql: "UPDATE users SET name = ?, username = ?, biography = ?, picture = ?, gender = ?, birthdate = ?, private = ? WHERE uid = ?",
                    values: [
                        user.name,
                        user.username,
                        user.biography,
                        user.picture,
                        user.gender,
                        user.birthdate,
                        user.private,
                        user.uid
                    ]
                },
                (error, result) => {
                    if(error) {
                        res.send(false);
                    } else {
                        res.send(true);
                    }
                }
            );
        } catch (err) {
            res.send(false);
        }
    } else {
        res.send(false);
    }
});

app.listen(port, () => {});