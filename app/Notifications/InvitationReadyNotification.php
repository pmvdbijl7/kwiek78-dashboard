<?php

namespace App\Notifications;

use App\Models\Registration;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\DatabaseMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class InvitationReadyNotification extends Notification
{
    use Queueable;

    /**
     * The registration instance.
     *
     * @var Registration
     */
    private $registration;

    /**
     * Create a new notification instance.
     */
    public function __construct(Registration $registration)
    {
        $this->registration = $registration;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Er staat een nieuwe uitnodiging klaar voor ' . $this->registration->personData->firstname . ' ' . $this->registration->personData->lastname)
            ->view('emails.invitation_ready', [
                'registration' => $this->registration,
                'user' => $notifiable,
            ]);
    }

    /**
     * Get the database representation of the notification.
     */
    public function toDatabase(object $notifiable): DatabaseMessage
    {
        return new DatabaseMessage([
            'type' => 'Uitnodiging klaargezet',
            'message' => 'Er staat een nieuwe uitnodiging klaar voor ' . $this->registration->personData->firstname . ' ' . $this->registration->personData->lastname . '.',
            'url' => route('invitations.index'),
        ]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
