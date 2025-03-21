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
        $expiredInvitations = Invitation::where('updated_at', '<', now()->subDays(7))
            ->where('status', 'pending')
            ->get();

        // Update invitations status
        foreach ($expiredInvitations as $invitation) {
            $invitation->update(['status' => 'expired']);
        }

        $this->info('Expired invitations have been updated.');
    }
}
