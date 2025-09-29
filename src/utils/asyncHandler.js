// Apprach 1: Promises
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
         Promise.resolve(requestHandler(req, res, next)).catch( (error) => next(error))
    }
}

export {asyncHandler}

// Approach number 2 for wrapping up the whole code functions onto async and await.
// const asyncHandler = (fn) => async (req, res, next) 
// => 
//     {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message:error.message
//         })
//     }a
// }