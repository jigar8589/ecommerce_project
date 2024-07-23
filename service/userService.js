const user = require("../model/user.model")
const mongoose = require('mongoose')
const express = require('express')




async function handlepost(body){
    const User = new user(body)
    const result = await User.save()
    return result;
}

  

module.exports={
    handlepost
}





