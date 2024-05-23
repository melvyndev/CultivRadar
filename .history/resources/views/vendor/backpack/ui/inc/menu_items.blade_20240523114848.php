{{-- This file is used for menu items by any Backpack v6 theme --}}
<li class="nav-item"><a class="nav-link" href="{{ backpack_url('dashboard') }}"><i class="la la-home nav-icon"></i> {{ trans('backpack::base.dashboard') }}</a></li>

<x-backpack::menu-item title="Plantes" icon="la la-question" :link="backpack_url('plant-crud-controller')" />
<x-backpack::menu-item title="Weather forecast crud controllers" icon="la la-question" :link="backpack_url('weather-forecast-crud-controller')" />
<x-backpack::menu-item title="User crud controllers" icon="la la-question" :link="backpack_url('user-crud-controller')" />
<x-backpack::menu-item title="Location crud controllers" icon="la la-question" :link="backpack_url('location-crud-controller')" />