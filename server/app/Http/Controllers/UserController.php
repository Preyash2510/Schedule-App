<?php

namespace App\Http\Controllers;


use App\Models\Connection;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
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

    public function getAll(Request $request): \Illuminate\Http\JsonResponse
    {

        $user = $request->input('user');

        $users = $this->all($user);

        return response()->json([
            'users' => $users
        ]);
    }

    public static function all($user) {
        $users = User::all();

        $connected = DB::select(
            "SELECT * FROM connection WHERE user1 = ?
            UNION
            SELECT * FROM connection WHERE user2 = ?
            "
            , [$user, $user]);

        foreach($users as $key => $u ){
            if($connected) {
                foreach($connected as $connection){

                    if($connection->user1 === $u->userName || $connection->user2 === $u->userName){
                        $u->connected = true;
                        $u->schedule = $connection->schedule;
                        break;
                    } else {
                        $u->connected = false;
                        $u->schedule = null;
                    }
                }
            } else {
                $u->connected = false;
                $u->schedule = null;
            }
        }

        return $users;
    }

    public function update(Request $request): \Illuminate\Http\JsonResponse
    {
        try{
            $this->validate($request, [
                'userName' => 'required',
                'firstName' => 'required',
                'lastName' => 'required'
            ]);

            $userName = $request->input('userName');
            $firstName = $request->input('firstName');
            $lastName = $request->input('lastName');

            $user = User::where('userName', $userName)->first();

            $user->firstName = $firstName;
            $user->lastName = $lastName;

            $user->save();

            if($user) {
                return response()->json([
                    'user' => $user,
                    'message' => 'Info Updated'
                ]);
            } else {
                return response()->json([
                    'message' => "Info didn't Updated"
                ], 500);
            }

        } catch (Exception | ValidationException $e){
            return response()->json([
                'error' => $e,
                'message' => 'Something Went Wrong'
            ], 500);
        }
    }
}
