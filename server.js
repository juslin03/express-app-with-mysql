let express = require("express");
let bodyParser = require("body-parser");
let session = require("express-session");
let flashMiddleware = require("./middlewares/flash");

let Message = require("./models/message");

let app = express();

// Moteur de templating
app.set("view engine", "ejs");

// Middlewares
app.use("/assets", express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "MisterJ",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, //parce qu'on ne traite pas de l'https
  })
);

app.use(flashMiddleware);

// Routes
app.get("/", (req, res) => {
    Message.all(messages => {
        res.render("pages/index", { messages: messages });
    })
});

app.post("/", (req, res) => {
  if (req.body.message === undefined || req.body.message === "") {
    req.flash("error", "Vous n'avez pas posté de message :(");
    res.redirect("/");
  }else{
      Message.create(req.body.message, () => {
          req.flash("success", "Message posté avec succès !");
          res.redirect("/");
      });
  }
});

app.get('/message/:id', (req, res) => {
    Message.find(req.params.id, message => {
        res.render("messages/show", { message: message });
    })
});

app.listen(8080, () => {
  console.log(`Server started on port`);
});
