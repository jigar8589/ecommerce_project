const category = require("../model/categoty.model")
const user = require("../model/user.model")




//*****************************************  Add category Controller  ************************************** /
async function AddCategory(categoryName,product_id){
    const createCategory = await category.create({
        categoryName:categoryName,
        product_id:product_id  
    
    })
    return createCategory
}


//*****************************************  Update category Controller ************************************* /
async function UpdateCategory(id,categoryName){
    const categoryUpdated = await category.findByIdAndUpdate({_id:id},{$set:{categoryName:categoryName}})
    return categoryUpdated
}

//*****************************************  get all category Conteroller ************************************* /

async function getCategory(){
    const getAllCategory = await category.find()
    return getAllCategory
}


// **************************************** Check Admin Controller  ********************************************* /
async function CheckAdmin(tokenId){
    const findAdmin = await user.findOne({ _id: tokenId, role: "admin" });
    // console.log(findAdmin)
    return findAdmin
}

// **************************************** Delete category Controller ***************************************** /

async function DeleteCategory(id){
        const DeletedCategory = await category.findByIdAndDelete(id)
        return DeletedCategory
}


module.exports ={
    AddCategory,
    UpdateCategory,
    getCategory,
    CheckAdmin,DeleteCategory
}













