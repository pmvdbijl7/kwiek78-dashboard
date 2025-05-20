<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Uitnodiging klaargezet</title>
</head>
<body>
    <h1>Er staat een nieuwe uitnodiging klaar voor het {{ config('app.name') }}</h1>

    <p>Hallo {{ $user->personData->firstname }},</p>

    <p>Er is zojuist een nieuwe uitnodiging klaargezet voor {{ $registration->personData->firstname }} {{ $registration->personData->lastname }}.</p>

    <p>
        <a href="{{ url('/gebruikers/uitnodigingen') }}">Bekijk uitnodigingen</a>
    </p>

    <p style="margin-top: 2em;">Je ontvangt deze melding als admin of voorzitter van {{ config('app.name') }}.</p>
</body>
</html>