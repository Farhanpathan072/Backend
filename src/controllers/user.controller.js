import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import { upoladOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler( async (req, res) =>{
    // get user details from frontend
    // validation - not empty
    // check if user already exists: email, username
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return response

     const { fullName, email, username, password } = req.body;
     console.log(req.body);
    res.json({"message": "OK return it is perfect"})
    
     if( [fullName, username, email, password].some( (field) => field?.trim === "")  )
        {
            console.log("inside if block")
            throw new ApiError(400, "All fields are required!!")
        }

        const existedUser = await User.findOne({
            $or: [{username}, {email}]
        
        })
        if(existedUser){
            console.log("inside if block of existed user")
            throw  new ApiError(409, "User with email already existed")
        }
        
        const avatarLocalPath = req.files?.avatar[0]?.path
        const coverImageLocalPath  = req.files?.coverImage[0];

        if(!avatarLocalPath){
            throw new ApiError(400, "Avatar file is required");
        }
        const avatar =  await upoladOnCloudinary(avatarLocalPath)
        const coverImage = await upoladOnCloudinary(coverImageLocalPath)

        if(!avatar){    
            throw new ApiError(400, "Avatar file is required")

        }

        const user =  await User.create({  
            fullName,
            avatar: avatar.url,
            coverImage: coverImage?.url || "",
            email,
            password,
            username: username.toLowercase()
         })
      const createdUser = await user.findById(user._id).select("-password -refreshToken")

         if(!createdUser){
            throw new ApiError(500, "something went wrong while registering the user ")
         }

         return res.status(201).json(
            new ApiResponse(200, createdUser, "User registered  successfully")
         )
    } )

export { registerUser}