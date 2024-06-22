{{-- This file is used for menu items by any Backpack v6 theme --}}
<li class="nav-item"><a class="nav-link" href="{{ backpack_url('dashboard') }}"><i class="la la-home nav-icon"></i> {{ trans('backpack::base.dashboard') }}</a></li>
<x-backpack::menu-item title="Utilisateur" icon="la la-user" :link="backpack_url('user-crud-controller')" />
<x-backpack::menu-item title="Plantes" icon="la la-leaf" :link="backpack_url('plant')" />
<!-- <x-backpack::menu-item title="Prévisions Météorologiques" icon="la la-wind" :link="backpack_url('weather-forecast-crud-controller')" />
<x-backpack::menu-item title="Lieux" icon="la la-map-marked" :link="backpack_url('location-crud-controller')" /> -->
