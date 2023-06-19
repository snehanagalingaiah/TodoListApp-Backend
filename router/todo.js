const express = require('express');
const router = express.Router();
const TodoModel = require("../model/todo");


//  API FOR adding new to do
router.post("/post", async (req,res,next) =>{
    console.log("Todos post api hit", req.body.data)
try
    {
    const todo = new TodoModel({data:req.body.data});
    const newTodo = await todo.save()
    return res.status(200).send(newTodo)
     }
 catch(error){
       return res.status(400).send(error.message)
     }
 })

//API to get all todos
router.get("/get", async(req, res, next) =>{
    console.log(" todos get api hit")

    try
    {
     const allTodos = await TodoModel.find({}).sort({createdAt:-1})
     return res.status(200).send(allTodos);
    }
    catch(error)
    {
        res.status(400).send(error)
    }
})

//api to update when a task is done
router.put("/toggle/:id", async(req, res, next) =>{
     console.log("toggle api hit")
    try
    {
     const todo = await TodoModel.findOne({_id:req.params.id});
     const updatedTodo = await TodoModel.findOneAndUpdate({_id:req.params.id}, {done: (!todo.done)},{new:true})
     await updatedTodo.save()
     console.log("toggle api",updatedTodo)
     return res.status(200).send(updatedTodo);
    }
    catch(error)
    {
        res.status(400).send(error)
    }
})

//api to update the task when its edited
router.put("/edit-todo/:id", async(req, res, next) =>{
    console.log("edit-todo api hit")
    try
    {
     const todo = await TodoModel.findOne({_id:req.params.id});
     const updatedTodo = await TodoModel.findOneAndUpdate({_id:req.params.id}, {data: req.body.data},{new:true})
     await updatedTodo.save()
     console.log("edit-todo api",updatedTodo)
     return res.status(200).send(updatedTodo);
    }
    catch(error)
    {
        res.status(400).send(error)
    }
})

//api to delete a todo
router.delete("/delete-todo/:id", async(req, res, next) =>{  
     console.log("delete-todo api hit")
    try
    {
     const deletedTodo = await TodoModel.findOneAndDelete({_id:req.params.id})
     console.log("delete-todo api",deletedTodo)
     return res.status(200).send(deletedTodo);
    }
    catch(error)
    {
        res.status(400).send(error)
    }
})



module.exports = router;