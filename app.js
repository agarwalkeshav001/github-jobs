var express = require("express"),
    app     = express(),
    path    = require("path"),
    bodyParser = require('body-parser');
    url = require('url');
    app.use(bodyParser.json()),
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.use(express.static('public'))
    app.set('view engine', 'ejs')
    app.set('views', path.join(__dirname, 'views'))
    app.use(express.static(path.join(__dirname, 'views')))

    const fetch = require('node-fetch');

    app.get('/', (req,res) => {
        res.redirect('/index');
    })

    app.get('/index', (req,res) => {
        let url = "https://jobs.github.com/positions.json";
    

        let settings = { method: "Get" };
        fetch(url, settings)
        .then(res => res.json())
        .then((result) => {
    
            res.render('index.ejs',{data: result});
            
            
        });
        
    })

    app.get('/search',(req,res) => {

        let url="https://jobs.github.com/positions.json?search="+req.query.search;
        
        let settings = { method: "Get" };
        fetch(url, settings)
        .then(res => res.json())
        .then((result) => {
            console.log(req.query.search);
            res.render('search.ejs',{data: result});
            
            
        });
    })
    app.get('/positions/:id', (req,res) =>{
    
        let url = "https://jobs.github.com/positions/"+req.params.id+".json?markdown=true";
    

        let settings = { method: "Get" };
        fetch(url, settings)
        .then(res => res.json())
        .then((result) => {
    
            res.render('description.ejs',{data: result});
            
            
        });
    })
    
    var port = process.env.PORT || 3000
    app.listen(port, () => {
    console.log(`Server live at port: ${port}`)
    })