const express = require('express');
const app = express();

app.use(express.json()); //express.json is a middleware
app.use(middleware);
app.use(logger);

let courses = [
    { id : 1 , name : 'java'} ,
    { id : 2 , name : 'javascript'} ,
    { id : 3 , name : 'python'}
];

app.get('/courses' , (req , res) => {
    res.json(courses);
})

app.post('/courses' , (req , res) => {
    console.log(req.body);
    let singleCourse = {
        id : courses.length+1 , 
        name : req.body.name
    }
    courses.push(singleCourse);
    res.send(courses);
})

app.put('/course/:id' , (req , res) => {
    try{
        let singleCourse = courses.find((course) => {
            return course.id === +req.params.id;
        })

        if(!singleCourse){
            res.status(404).send('course does not exist');
        }

        singleCourse.name = req.body.name;
        res.send(courses);

    } catch(err){
        res.status(500).end(err);
    }
})

function middleware(req , res , next) {
    console.log("called middleware");
    next();
}

//logger middleware --> return method , ip , hostname , date
function logger(req , res , next){
    console.log(req.method , req.ip , req.hostname , new Date());
    next();
}

app.listen(3000 , () => {
    console.log("server has started");
})