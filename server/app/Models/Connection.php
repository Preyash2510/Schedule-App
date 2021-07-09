<?php


namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Laravel\Lumen\Auth\Authorizable;

/**
 * @mixin Builder
 */

/*
 * This model is used for the connections between users
 */

class Connection extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'connectionID', 'user1', 'user2', 'schedule'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
    ];

    protected $table = 'connection';
    protected $primaryKey = 'connectionID';
    public $incrementing = true;

    protected $casts = [
        'schedule' => 'datetime:Y-m-d\TH:i',
    ];

    protected $keyType = 'int';
    public $timestamps = false;
    /**
     * @var mixed|string
     */

}
