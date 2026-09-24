const { MongoClient, ObjectId } = require("mongodb");
const url = "mongodb://localhost:27017"
const client = new MongoClient(url)
const dbName = "mydatabase-Tak-1"
async function adduser() {
    try {
        await client.connect()
        console.log("connected to server")
        const db = client.db(dbName)
        const users = db.collection("users")
        const result = await users.insertOne({
            name: "safaa",
            age: 26,
            citey: "October"
        })
        console.log("Inser document Id :", result.insertedId)
        // await addNewUser(user)
        // await addMany(users)
        // await findUser(user, "6ab4494f1f4d0dbeab37eb8e")
        // await CountUser(users)
        await LimitUsers(users)
        await UpdateUser(users, "6ab40bc842d15ac255201f18") 
        await UpdateMany(users)
        await DeleteUser(users, "6ab40bc842d15ac255201f18")
        await DeleteMany(users)
    }
    catch (error) {
        console.log(error);
    }

}
adduser()

async function addNewUser(user) {
    const result = await user.insertOne({
        name: "Ahmed",
        age: 30,
        citey: "Gharbia"
    })
    console.log("Inser document Id :", result.insertedId)

}

async function addMany(users) {
    const Result = await users.insertMany([
        {
            name: "Fatma",
            age: 28,
            citey: "Sharkia"
        },
        {
            name: "Wafaa",
            age: 26,
            citey: "6October"
        },
        {
            name: "Said",
            age: 24,
            citey: "Gharbia"
        },
        {
            name: "Amina",
            age: 24,
            citey: "Zefta"
        }
    ])
    console.log("Inser document Id :", result.insertedCount)


}

async function findUser(user, id) {
    const result = await user.findOne({ _id: id })
    if (result) {
        console.log("Found user:", result);
    }
    else {
        console.log("User not found");
    }

}

// /////////////////////////////////////////////////////////
async function CountUser(users) {
    const count = await users.countDocuments({ age: 26 });
    console.log("Total users:", count);
}
// /////////////////////////////////////////////////////////
async function LimitUsers(users) {
    const result = await users.find({ age: 26 }).limit(2).toArray();
    console.log("Limited users:", result);
}
// /////////////////////////////////////////////////////////
async function UpdateUser(users, id) {
    const result = await users.updateOne(
        { _id: new ObjectId(id) },
        {
            $set: { name: "Marwam" },
            $inc: { age: 150 }

        }
    );
    console.log("Updated user:", result.modifiedCount);
}
// /////////////////////////////////////////////////////////
async function UpdateMany(users) {
    const result = await users.updateMany(
        {},
        {
          
            $inc: { age: 150 }  
        }
    );
    console.log("Updated users:", result.modifiedCount);
}
// /////////////////////////////////////////////////////////
async function DeleteUser(users, id) {
    const result = await users.deleteOne({ _id: new ObjectId(id) });
    console.log("Deleted user:", result.deletedCount);
}
//  /////////////////////////////////////////////////////////
async function DeleteMany(users) {
    const result = await users.deleteMany({ name: "Marwam" });
    console.log("Deleted users:", result.deletedCount);
}