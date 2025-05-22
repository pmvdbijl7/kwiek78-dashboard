import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Role } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

interface GeneralSettingsForm {
    name: string;
}

export default function GeneralSettings() {
    const { role } = usePage<{ role: Role }>().props;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<GeneralSettingsForm>>({
        name: role.name,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('roles.update', role.id));
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <div className="grid gap-2">
                <Label htmlFor="name">Naam</Label>

                <Input
                    id="name"
                    className="mt-1 block w-full"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    required
                    autoComplete="name"
                    placeholder="Name"
                />

                <InputError className="mt-2" message={errors.name} />
            </div>

            <Button disabled={processing}>
                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                Opslaan
            </Button>
        </form>
    );
}
