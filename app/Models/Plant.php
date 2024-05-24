<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class Plant extends Model
{
    use CrudTrait;
    use HasFactory;
    

    /*
    |--------------------------------------------------------------------------
    | GLOBAL VARIABLES
    |--------------------------------------------------------------------------
    */

    protected $table = 'plants';
    // protected $primaryKey = 'id';
    // public $timestamps = false;
    protected $guarded = ['id'];
    // protected $fillable = [];
    // protected $hidden = [];

    /*
    |--------------------------------------------------------------------------
    | FUNCTIONS
    |--------------------------------------------------------------------------
    */

    /*
    |--------------------------------------------------------------------------
    | RELATIONS
    |--------------------------------------------------------------------------
    */

    public static function boot()
{
    parent::boot();
    static::deleting(function($obj) {
        Storage::delete(Str::replaceFirst('storage/','public/', $obj->image));
    });
}



public function setImageAttribute($value)
{
    $attribute_name = "image";
    // destination path relative to the disk above
    $destination_path = "plants";

    // if the image was erased
    if ($value==null) {
        // delete the image from disk
        Storage::delete(Str::replaceFirst('storage/','public/',$this->{$attribute_name}));

        // set null in the database column
        $this->attributes[$attribute_name] = null;
    }

    $disk = "public";
    // filename is generated -  md5($file->getClientOriginalName().random_int(1, 9999).time()).'.'.$file->getClientOriginalExtension()
    $this->uploadFileToDisk($value, $attribute_name, $disk, $destination_path, $fileName = null);
    $this->attributes[$attribute_name] = 'storage/' . $this->attributes[$attribute_name];

}

    /*
    |--------------------------------------------------------------------------
    | SCOPES
    |--------------------------------------------------------------------------
    */

    /*
    |--------------------------------------------------------------------------
    | ACCESSORS
    |--------------------------------------------------------------------------
    */

    /*
    |--------------------------------------------------------------------------
    | MUTATORS
    |--------------------------------------------------------------------------
    */
}
