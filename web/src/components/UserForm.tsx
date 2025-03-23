
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UserData } from './UserItem';

// Schéma de validation pour le formulaire
const formSchema = z.object({
  name: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
  email: z.string().email({ message: 'Adresse e-mail invalide' }),
  phone: z.string().min(5, { message: 'Numéro de téléphone invalide' }),
  location: z.string().min(2, { message: 'Localisation invalide' }),
  type: z.enum(['guest', 'host', 'admin'], { 
    message: 'Veuillez sélectionner un type valide' 
  }),
  status: z.enum(['active', 'inactive', 'pending'], { 
    message: 'Veuillez sélectionner un statut valide' 
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface UserFormProps {
  onSubmit: (data: Partial<UserData>) => void;
  onCancel: () => void;
  initialData?: Partial<UserData>;
}

export const UserForm: React.FC<UserFormProps> = ({ 
  onSubmit, 
  onCancel, 
  initialData 
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      email: initialData?.email || '',
      phone: initialData?.phone || '',
      location: initialData?.location || '',
      type: (initialData?.type as 'guest' | 'host' | 'admin') || 'guest',
      status: (initialData?.status as 'active' | 'inactive' | 'pending') || 'active',
    },
  });

  const handleSubmit = (values: FormValues) => {
    const userData: Partial<UserData> = {
      ...values,
      id: initialData?.id,
      registered_date: initialData?.registered_date || new Date(),
      bookings_count: initialData?.bookings_count || 0,
    };
    onSubmit(userData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Nom complet" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="email@exemple.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone</FormLabel>
              <FormControl>
                <Input placeholder="+33 123 456 789" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Localisation</FormLabel>
              <FormControl>
                <Input placeholder="Paris, France" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="guest">Invité</SelectItem>
                    <SelectItem value="host">Hôte</SelectItem>
                    <SelectItem value="admin">Administrateur</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Statut</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un statut" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active">Actif</SelectItem>
                    <SelectItem value="inactive">Inactif</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit">
            {initialData ? 'Mettre à jour' : 'Ajouter'} l'utilisateur
          </Button>
        </div>
      </form>
    </Form>
  );
};
