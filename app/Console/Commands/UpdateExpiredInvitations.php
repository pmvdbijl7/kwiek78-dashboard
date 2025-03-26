<?php

namespace App\Console\Commands;

use App\Models\Invitation;
use Illuminate\Console\Command;

class UpdateExpiredInvitations extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cleanup:invitations';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update expired user invitations';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Retrieve expired invitations
        $invitations = Invitation::where('sent_at', '<', now()->subDays(7))
            ->where('status', 'in afwachting')
            ->get();

        // Update invitations status
        foreach ($invitations as $invitation) {
            $invitation->update(['status' => 'verlopen']);
        }

        $this->info('Expired invitations have been updated.');
    }
}
