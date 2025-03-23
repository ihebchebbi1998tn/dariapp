import React, { useState } from 'react';
import { 
  Users as UsersIcon, 
  Search, 
  Filter, 
  RefreshCw,
  UserPlus,
} from 'lucide-react';
import { Layout } from '@/components/Layout';
import { UserItem, UserData } from '@/components/UserItem';
import { UserModifyModal } from '@/components/UserModifyModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { UserForm } from '@/components/UserForm';

const Users = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  const [usersData, setUsersData] = useState<UserData[]>([
    {
      id: 1,
      name: 'Michael Johnson',
      email: 'michael.johnson@example.com',
      phone: '+1 (555) 123-4567',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      registered_date: new Date('2023-01-15'),
      location: 'New York, USA',
      bookings_count: 8,
      type: 'guest',
      status: 'active'
    },
    {
      id: 2,
      name: 'Sarah Williams',
      email: 'sarah.williams@example.com',
      phone: '+1 (555) 234-5678',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      registered_date: new Date('2023-02-20'),
      location: 'Los Angeles, USA',
      bookings_count: 3,
      type: 'guest',
      status: 'active'
    },
    {
      id: 3,
      name: 'Admin User',
      email: 'admin@example.com',
      phone: '+1 (555) 789-0123',
      avatar: 'https://randomuser.me/api/portraits/men/94.jpg',
      registered_date: new Date('2022-01-10'),
      location: 'San Francisco, USA',
      bookings_count: 0,
      type: 'admin',
      status: 'active'
    }
  ]);

  const filteredUsers = usersData.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(user.id).includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === 'all' || user.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleUserClick = (user: UserData) => {
    setSelectedUser(user);
    setIsModifyModalOpen(true);
  };

  const handleActivateUser = (id: number) => {
    toast({
      title: "Utilisateur activé",
      description: `L'utilisateur ID: ${id} a été activé.`,
    });
  };

  const handleDeactivateUser = (id: number) => {
    toast({
      title: "Utilisateur désactivé",
      description: `L'utilisateur ID: ${id} a été désactivé.`,
      variant: "destructive",
    });
  };

  const resetFilters = () => {
    setSearchQuery('');
    setTypeFilter('all');
    setStatusFilter('all');
    
    toast({
      title: "Filtres réinitialisés",
      description: "Tous les filtres d'utilisateurs ont été réinitialisés.",
    });
  };

  const handleAddUser = (userData: Partial<UserData>) => {
    toast({
      title: "Utilisateur ajouté",
      description: `Nouvel utilisateur ${userData.name} ajouté avec succès.`,
    });
    setIsFormOpen(false);
  };

  const handleUpdateUser = (updatedUserData: Partial<UserData>) => {
    if (!updatedUserData.id) return;
    
    setUsersData(prevUsers => 
      prevUsers.map(user => 
        user.id === updatedUserData.id ? { ...user, ...updatedUserData } : user
      )
    );
    
    toast({
      title: "Utilisateur modifié",
      description: `Les informations de ${updatedUserData.name} ont été mises à jour.`,
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Utilisateurs</h1>
            <p className="text-muted-foreground mt-1">Gérer les utilisateurs et invités</p>
          </div>
          <div>
            <Button onClick={() => setIsFormOpen(true)}>
              <UserPlus className="mr-2 h-4 w-4" />
              Ajouter un utilisateur
            </Button>
          </div>
        </div>

        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher des utilisateurs..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[140px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Type d'utilisateur" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="guest">Invités</SelectItem>
                <SelectItem value="host">Hôtes</SelectItem>
                <SelectItem value="admin">Admins</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="active">Actifs</SelectItem>
                <SelectItem value="inactive">Inactifs</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={resetFilters}
              className="hover:bg-slate-100"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {filteredUsers.length === 0 ? (
          <div className="text-center py-10 bg-muted/20 rounded-lg">
            <UsersIcon className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">Aucun utilisateur trouvé</h3>
            <p className="text-muted-foreground">
              Essayez d'ajuster votre recherche ou vos filtres.
            </p>
            <Button variant="outline" className="mt-4" onClick={resetFilters}>
              Réinitialiser les filtres
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredUsers.map((user) => (
              <UserItem 
                key={user.id} 
                user={user}
                onClick={handleUserClick}
                onActivate={handleActivateUser}
                onDeactivate={handleDeactivateUser}
              />
            ))}

            <div className="flex items-center justify-between border-t border-border pt-4 mt-2">
              <p className="text-sm text-muted-foreground">
                Affichage de {filteredUsers.length} sur {usersData.length} utilisateurs
              </p>
            </div>
          </div>
        )}
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Ajouter un nouvel utilisateur</DialogTitle>
          </DialogHeader>
          <UserForm onSubmit={handleAddUser} onCancel={() => setIsFormOpen(false)} />
        </DialogContent>
      </Dialog>
      
      <UserModifyModal
        user={selectedUser}
        open={isModifyModalOpen}
        onOpenChange={setIsModifyModalOpen}
        onSubmit={handleUpdateUser}
      />
    </Layout>
  );
};

export default Users;
