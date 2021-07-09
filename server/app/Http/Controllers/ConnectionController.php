<?php

namespace App\Http\Controllers;

use App\Models\Connection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class ConnectionController extends Controller
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

    //
    public function connect(Request $request): \Illuminate\Http\JsonResponse
    {

        try{
            $this->validate($request, [
                'user1' => 'required',
                'user2' => 'required'
            ]);

            $user1 = $request->input('user1');
            $user2 = $request->input('user2');

            $connection = Connection::create([
                'user1' => $user1,
                'user2' => $user2
            ]);

            $users = UserController::all($user1);

            if($connection){
                return response()->json([
                    'users' => $users,
                    'message' => 'Connected'
                ]);
            } else {
                return response()->json([
                    'message' => 'Unconnected'
                ]);
            }

        } catch (Exception | ValidationException $e){
            return response()->json([
                'error' => $e,
                'message' => 'Something Went Wrong'
            ], 500);
        }

    }

    public function unconnect(Request $request){
        try{
            $this->validate($request, [
                'user1' => 'required',
                'user2' => 'required'
            ]);

            $user1 = $request->input('user1');
            $user2 = $request->input('user2');

            $connection = Connection::where(function ($query) use ($user1, $user2) {
                $query->where('user1', $user1)->where('user2', $user2);
            })->orWhere(function ($query) use ($user1, $user2) {
                $query->where('user1', $user2)->where('user2', $user1);
            })->first();

            $connection->delete();

            $users = UserController::all($user1);

            if($connection){
                return response()->json([
                    'users' => $users,
                    'message' => 'Unconnected'
                ]);
            } else {
                return response()->json([
                    'message' => 'Still Connected'
                ]);
            }

        } catch (Exception | ValidationException $e){
            return response()->json([
                'error' => $e,
                'message' => 'Something Went Wrong'
            ], 500);
        }
    }

    public function schedule(Request $request): \Illuminate\Http\JsonResponse
    {
        try{
            $this->validate($request, [
                'user1' => 'required',
                'user2' => 'required',
                'dateTime' => 'required'
            ]);

            $user1 = $request->input('user1');
            $user2 = $request->input('user2');
            $dateTime = $request->input('dateTime');

            $connection = Connection::where(function ($query) use ($user1, $user2) {
                $query->where('user1', $user1)->where('user2', $user2);
            })->orWhere(function ($query) use ($user1, $user2) {
                $query->where('user1', $user2)->where('user2', $user1);
            })->update([
                'schedule' => date("Y-m-d H:i:s", strtotime($dateTime))
            ]);

            $users = UserController::all($user1);

            if($connection){
                return response()->json([
                    'users' => $users,
                    'message' => 'Unconnected'
                ]);
            } else {
                return response()->json([
                    'message' => 'Still Connected'
                ]);
            }

        } catch (Exception | ValidationException $e){
            return response()->json([
                'error' => $e,
                'message' => 'Something Went Wrong'
            ], 500);
        }
    }

    public function cancel(Request $request): \Illuminate\Http\JsonResponse
    {
        try{
            $this->validate($request, [
                'user1' => 'required',
                'user2' => 'required'
            ]);

            $user1 = $request->input('user1');
            $user2 = $request->input('user2');

            $connection = Connection::where(function ($query) use ($user1, $user2) {
                $query->where('user1', $user1)->where('user2', $user2);
            })->orWhere(function ($query) use ($user1, $user2) {
                $query->where('user1', $user2)->where('user2', $user1);
            })->first()->update([
                'schedule' => null
            ]);

            $users = UserController::all($user1);

            if($connection){
                return response()->json([
                    'users' => $users,
                    'message' => 'Unconnected'
                ]);
            } else {
                return response()->json([
                    'message' => 'Still Connected'
                ]);
            }

        } catch (Exception | ValidationException $e){
            return response()->json([
                'error' => $e,
                'message' => 'Something Went Wrong'
            ], 500);
        }
    }
}
