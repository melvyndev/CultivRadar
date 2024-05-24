<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\PlantCrudControllerRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

/**
 * Class PlantController
 * @package App\Http\Controllers\Admin
 * @property-read \Backpack\CRUD\app\Library\CrudPanel\CrudPanel $crud
 */
class PlantController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;

    /**
     * Configure the CrudPanel object. Apply settings to all operations.
     * 
     * @return void
     */
    public function setup()
    {
        CRUD::setModel(\App\Models\Plant::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/plant');
        CRUD::setEntityNameStrings('plant crud controller', 'plantes');
    }

    /**
     * Define what happens when the List operation is loaded.
     * 
     * @see  https://backpackforlaravel.com/docs/crud-operation-list-entries
     * @return void
     */
    protected function setupListOperation()
    {
        CRUD::column('scientific_name')->label('Nom scientifique');
        CRUD::column('common_name')->label('Nom commun');
    
        // Ajouter une colonne temporaire pour afficher l'URL de l'image pour le debug
        CRUD::addColumn([
            'name' => 'image', // The attribute name in the model
            'label' => 'Image', // The label for the column
            'type' => 'image', // The type of the column
            'height' => '50px', // Optional: height of the image in the listing
            'width' => '50px',  // Optional: width of the image in the listing
        ]);
    }
    

    /**
     * Define what happens when the Create operation is loaded.
     * 
     * @see https://backpackforlaravel.com/docs/crud-operation-create
     * @return void
     */
    protected function setupCreateOperation()
    {
        CRUD::setValidation(PlantCrudControllerRequest::class);
        CRUD::setFromDb(); // set fields from db columns.

        /**
         * Fields can be defined using the fluent syntax:
         * - CRUD::field('price')->type('number');
         */
        CRUD::field('image')
        ->type('upload')
        ->label('Image')
        ->upload(true)
        ->disk('public') // the disk where the file will be stored
        ->path('plants') // the path inside the disk where the file will be stored
        ->attributes(['accept' => 'image/*']) // only allow image files
        ->hint('Upload an image file for the plant')
        ->preview(function($entry) {
            if ($entry->image) {
                return asset('storage/plants/' . $entry->image);
            }
            return null;
        });
    
    }

    /**
     * Define what happens when the Update operation is loaded.
     * 
     * @see https://backpackforlaravel.com/docs/crud-operation-update
     * @return void
     */
    protected function setupUpdateOperation()
    {
        $this->setupCreateOperation();
    }

    protected function setupShowOperation()
    {

        CRUD::addColumn([
            'name' => 'image', // The attribute name in the model
            'label' => 'Image', // The label for the column
            'type' => 'image', // The type of the column
            'height' => '50px', // Optional: height of the image in the listing
            'width' => '50px',  // Optional: width of the image in the listing
        ]);

        $this->autoSetupShowOperation();

    }

}
