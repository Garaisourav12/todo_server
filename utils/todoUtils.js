module.exports.todoDataValidator = ({ title }) => {
    return new Promise((resolve, reject) => {
        if (!title)
            reject("Missing data");

        if (typeof title !== "string") reject("Datatype of title is wrong");

        // If all are validate
        resolve();
    })
}