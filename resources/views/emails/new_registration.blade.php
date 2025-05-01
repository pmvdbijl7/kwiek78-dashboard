<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Nieuwe aanmelding</title>
</head>
<body>
    <h1>Nieuwe aanmelding ontvangen</h1>

    <p>Hallo {{ $user->personData->firstname }},</p>

    <p>Er is een nieuwe aanmelding ingediend:</p>

    <ul>
        <li><strong>Naam:</strong> {{ $registration->personData->firstname }} {{ $registration->personData->lastname }}</li>
        <li><strong>Type lidmaatschap:</strong> {{ $registration->membership_type }}</li>
    </ul>

    <p>
        <a href="{{ url('/aanmeldingen/' . $registration->id) }}">Bekijk aanmelding</a>
    </p>

    <p style="margin-top: 2em;">Je ontvangt deze melding als ledenadministrateur van {{ config('app.name') }}.</p>
</body>
</html>