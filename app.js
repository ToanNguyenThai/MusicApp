const express = require("express"); //xuất empress đã cài đặt
const app = express();
require("dotenv/config")

const cors = require("cors");
const { default: mongoose } = require("mongoose");

app.use(cors({ origin: true }));
app.use(express.json()); //decode express thanh thu ma json co the hieu

app.get("/", (req, res) => {
    return res.json("Hi there.....")
})


// user authentication route
const userRoute = require("./routes/auth");
app.use("/api/users/", userRoute);

// artist route
const artistsRoute = require("./routes/artist");
app.use("/api/artist/", artistsRoute);
// album route
const albumsRoute = require("./routes/albums");
app.use("/api/albums/", albumsRoute)
// song route
const songRoute = require("./routes/songs");
app.use("/api/songs/", songRoute)

//kiểm tra connect từ sv mongodb tới backend
mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true });
mongoose.connection
    .once("open", () => console.log("Connected"))
    .on("error", (error) => {
        console.log('ERROR: ${error}');
    })

app.listen(4000, () => console.log("Listening to post 4000"));
