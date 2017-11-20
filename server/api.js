'use strict'
const api = require('express').Router()
const db = require('../db')
const User = require('../db/models/user')
const Campus= require('../db/models/campus')

// api.use('/campuses', require('./campus'))
// api.use('/students', require('./students'))
// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!
api.get('/hello', (req, res) => res.send({hello: 'world'}))

api.get('/campuses',(req,res,next)=>{ 
	db.models.campus.findAll({
		include:[{model:User, as: 'student'}]
	})
	.then(campuses=>res.json(campuses))
	.catch(next)
})



api.get('/campuses/:id',(req,res,next)=>{
	// const id = req.params.id
	db.models.campus.findOne({
		where:{
			id: req.params.id,
		},
		include:[{model:User, as: 'student'}]
	})
	.then(campus=>{
		if(campus) res.json(campus)
		else{res.sendStatus(404)}
	})
	.catch(next)
})
//recently edited
api.get('/students',(req,res,next)=>{ 
	db.models.user.findAll({include:'student'})
	.then(students=>res.json(students))
	.catch(next)
})

api.get('/students/:id',(req,res,next)=>{
	// const id = req.params.id
	db.models.user.findById(req.params.id)
	.then(student=>{
		//if(student) res.json(student)
		//res.sendStatus(404)
		res.json(student)
	})
	.catch(next)
})

api.post('/campuses',(req,res,next)=>{
	db.models.campus.create(req.body)
	.then(newCampus=>res.json(newCampus))
	.catch(next)
})

api.post('/students',(req,res,next)=>{
	console.log("REQBODY",req.body)
	db.models.user.create(req.body)
	.then(newStudent=>res.json(newStudent))
	.catch(next)
})

api.put('/students/:id',(req,res,next)=>{
	db.models.user.findById(req.params.id)
	.then(foundStudent=>foundStudent.update(req.body))
	.then(updatedStudent=>res.json(updatedStudent))
	.catch(next);
})

api.put('/campuses/:id',(req,res,next)=>{
	db.models.campus.findById(req.params.id)
	.then(foundCampus=>foundCampus.update(req.body))
	.then(updatedCampus=>res.json(updatedCampus))
	.catch(next);
})

api.delete('/campuses/:id',(req,res,next)=>{
	db.models.campus.destroy({
		where:{
			id: req.params.id
		}
	})
	.then(()=>res.status(204).end())
	.catch(next)
})

api.delete('/students/:id',(req,res,next)=>{
	db.models.user.destroy({
		where:{
			id: req.params.id
		}
	})
	.then(()=>res.status(204).end())
	.catch(next)
})

module.exports = api