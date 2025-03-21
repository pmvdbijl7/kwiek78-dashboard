<?php

use App\Console\Commands\UpdateExpiredInvitations;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Schedule::command(UpdateExpiredInvitations::class)->dailyAt('12:00');
