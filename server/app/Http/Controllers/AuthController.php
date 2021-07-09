<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use mysql_xdevapi\Exception;

class AuthController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * @throws ValidationException
     */
    //This function will add the user to the database
    public function register(Request $request): \Illuminate\Http\JsonResponse
    {
        $this->validate($request, [
            'userName' => 'required',
            'firstName' => 'required',
            'lastName' => 'required',
            'password' => 'required'
        ]);

        $first = $request->input('firstName');
        $last = $request->input('lastName');
        $userName = $request->input('userName');
        $pass = $request->input('password');

        try {
            $register = User::create([
                'firstName' => $first,
                'lastName' => $last,
                'userName' => $userName,
                'password' => $pass
            ]);

            if($register){

                $token = base64_encode(Str::random(40));

                User::where('userName', $userName)->update(['api_token' => $token]);

                return response()->json([
                    'user' => $register,
                    'token' => $token,
                    'message' => 'User Registered!']);
            } else {
                return response()->json(['error' => 'Something went wrong, Cannot Register'], 401);
            }
        } catch (Exception $e){
            return response()->json([
                'error' => $e,
                'message' => 'Something went wrong'
            ], 500);
        }

    }

    //This function will check if the user exist and create a unique api token (stores in database for Authentication)
    public function login(Request $request): \Illuminate\Http\JsonResponse{

        $userName = $request->input('userName');
        $password = $request->input('password');

        try {
            $user = User::where('userName', $userName)->first();

            if($user === null){
                return response()->json([
                    'message' => 'User not found!'
                ], 401);
            } else if ($user AND $password !== $user->password) {
                return response()->json([
                    'message' => 'UserName or Password is Wrong!'
                ], 401);
            }
            else if($user AND $password === $user->password){

                $token = base64_encode(Str::random(40));

                User::where('userName', $user->userName)->update(['api_token' => $token]);

                return response()->json([
                    'user' => $user,
                    'token' => $token,
                    'message' => 'Login Successful'
                ], 200);
            } else {
                return response()->json([
                    'user' => $user,
                    'message' => 'Incorrect Credentials! Please try Again!'
                ], 401);
            }
        } catch(Exception $e){
            return response()->json([
                'error' => $e,
                'message' => 'Something went wrong!'
            ], 500);
        }
    }

    //This function remove the api_token from the user row
    public function logout(Request $request): \Illuminate\Http\JsonResponse{

        $username = $request->input('userName');

        try {
            User::where('userName', $username)->update(['api_token' => null]);
            return response()->json([
                'userName' => $username,
                'message' => 'Logout Successful'
            ]);
        } catch(Exception $e){
            return response()->json([
                'error' => $e,
                'message' => 'Something went wrong!'
            ], 500);
        }
    }
    //
}
