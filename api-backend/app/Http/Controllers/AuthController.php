<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth; 
class AuthController extends Controller
{
    // Register API (name, email, password, confirm_password)
    public function register(Request $request){
        $data = $request->validate([
            "name" => "required|string",
            "user_type" => "required|in:user,dealer", // ✅ Add this
            "email" => "required|email|unique:users,email",
            "phone_number" => "required|string|unique:users,phone_number",
            // "password" => "required|confirmed",
        ]);

        //password confirmation
        
        User::create($data);

        return response()->json([
            "status" => true,
            "message" => "User registered successfully"
        ]);
    }

    // Login API (email, password)
    public function login(Request $request){

        $request->validate([
            "email" => "required|email",
            "phone_number" => "required"
        ]);

        if(!Auth::attempt($request->only("email","phone_number"))){

            return response()->json([
                "status" => false,
                "message" => "Invalid Credentials"
            ]);
        }

        $user = Auth::user();

        $token = $user->createToken("myToken")->plainTextToken;

        return response()->json([
            "status" =>true,
            "message" => "User logged In",
            "token" => $token
        ]);
    }

    // Profile API 
    public function profile(){
        
        $user = Auth::user();

        return response()->json([
            "status" =>true,
            "message" => "User profile data",
            "user" => $user       
        ]);
    }
    
    // Logout API
    public function logout(){
        Auth :: logout();
        return response()->json([
            "status" => true,
            "message"=>"User logged out succesfully"
        ]);
    }
    
}
