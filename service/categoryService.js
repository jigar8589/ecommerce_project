const category = require("../model/categoty.model")
const product = require("../model/product.model")
const user = require("../model/user.model")



//*****************************************  Add category   ************************************** /
async function AddCategory(categoryName,product_id){
    const createCategory = await category.create({
        categoryName:categoryName,
        product_id:product_id  
    
    })
    return createCategory
}


//*****************************************  Update category  ************************************* /
async function UpdateCategory(id,categoryName){
    const categoryUpdated = await category.findByIdAndUpdate({_id:id},{$set:{categoryName:categoryName}})
    return categoryUpdated
}

//*****************************************  get all category  ************************************* /

async function getCategory(){
    const getAllCategory = await category.find()
    return getAllCategory
}


// **************************************** Check Admin   ********************************************* /
async function CheckAdmin(tokenId){
    const findAdmin = await user.findOne({ _id: tokenId, role: "admin" });
    //  console.log(findAdmin)
    return findAdmin
}

// **************************************** Delete category  ***************************************** /

async function DeleteCategory(id){
        const DeletedCategory = await category.findByIdAndDelete(id)
        return DeletedCategory
}


async function getProduct(category_id){
    
    const getproductbycategory = await product.find({category:category_id})
    console.log(getproductbycategory)
    return getproductbycategory

}

module.exports ={
    AddCategory,
    UpdateCategory,
    getCategory,
    CheckAdmin,DeleteCategory,
    getProduct
}













