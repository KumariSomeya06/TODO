import express from 'express';
const router = express.Router();
import { v4 as uuidv4 } from 'uuid';

import TodoModel from '../model/todomodel.js'
// const TodoModel = require('../model/todomodel')

router.get('/gettodos', async (req, res) => {
    try {
        var alltask = await TodoModel.find({});
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: error
        });
    }

    return res.status(200).json({
        data: alltask
    })
});



router.post('/addtodo', async (req, res) => {
    const task = req.body.task;
    const status = req.body.status;

    const availstatus = ['completed', 'InProgress', 'yet to start'];

    const id = uuidv4();


    if (!task || task.isEmpty) {
        return res.status(400).json({
            message: "Task should not be Empty"
        });
    }

    if (!status || !availstatus.includes(status)) {
        return res.status(400).json({
            message: "Task should match available status 'completed','InProgress','yet to start' "
        })
    }



    const newtask = new TodoModel({ 'task': task, 'status': status, 'id': id })

    try {
        const response = await newtask.save();
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: error
        })
    }



    return res.status(200).json({
        message: "Task Added successfully!!"
    })
})


router.get('/gettask', async (req, res) => {
    try {
        var task = await TodoModel.findMany({ status: 'completed' })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: error
        });
    }

    return res.status(200).json({
        data: task
    })



});


router.delete('/deletetask/:id', async (req, res) => {
    var taskid = req.params.id

    console.log(taskid);
    try {

        var taskitem = await TodoModel.deleteOne({
            id: taskid
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            mesage: error
        });
    }

    if(taskitem['deletedCount']===0)
    {
        return res.status(400).json({
            message: "Item does not exist"
        }); 
    }
    return res.status(200).json({
        message: "task deleted"
    })

})

router.put('./updatetask',async(req,res)=>{

    var name = req.body.name;
    var status = req.body.status
    try {
        const res = await Person.updateOne(
            { name: name }, { ship: status });
    } 
    catch (error) {
        console.log(error);
        return res.status(400).json({
            message: error
        
        });
    }
    return res.status(200).json({
        message: "task updated"
    })

    
})


export default router;