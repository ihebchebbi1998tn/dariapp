import React from 'react';
import { format } from 'date-fns';
import { User, Mail, Phone, Calendar, MapPin, Building2, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface UserData {
  id: number; // SERIAL PRIMARY KEY
  name: string;
  email: string;
  phone: string;
  avatar?: string; // VARCHAR peut être null
  registered_date: Date; // TIMESTAMP
  location: string;
  bookings_count: number;
  type: 'guest' | 'host' | 'admin';
  status: 'active' | 'inactive' | 'pending';
}

interface UserItemProps {
  user: UserData;
  onClick?: (user: UserData) => void;
  onActivate?: (id: number) => void;
  onDeactivate?: (id: number) => void;
  className?: string;
}

export const UserItem: React.FC<UserItemProps> = ({
  user,
  onClick,
  onActivate,
  onDeactivate,
  className,
}) => {
  const userTypes = {
    guest: { label: 'Invité', color: 'bg-blue-100 text-blue-700' },
    host: { label: 'Hôte', color: 'bg-purple-100 text-purple-700' },
    admin: { label: 'Admin', color: 'bg-amber-100 text-amber-700' },
  };

  const userStatus = {
    active: { label: 'Actif', color: 'bg-green-100 text-green-700' },
    inactive: { label: 'Inactif', color: 'bg-slate-100 text-slate-700' },
    pending: { label: 'En attente', color: 'bg-amber-100 text-amber-700' },
  };

  const typeInfo = userTypes[user.type];
  const statusInfo = userStatus[user.status];

  const handleClick = () => {
    if (onClick) {
      onClick(user);
    }
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-md",
        "glass-card cursor-pointer hover:scale-[1.01]",
        className
      )}
      onClick={handleClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 border-2 border-white">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap justify-between items-start gap-2">
              <div>
                <h3 className="font-medium text-base line-clamp-1">{user.name}</h3>
                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                  <Mail className="w-3.5 h-3.5 mr-1" />
                  <span className="truncate">{user.email}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge className={cn("font-medium", typeInfo.color)}>
                  {typeInfo.label}
                </Badge>
                <Badge className={cn("font-medium", statusInfo.color)}>
                  {statusInfo.label}
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mt-3">
              <div className="flex items-center text-sm">
                <Phone className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center text-sm">
                <MapPin className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
                <span className="truncate">{user.location}</span>
              </div>
              <div className="flex items-center text-sm">
                <Calendar className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
                <span>Inscrit le {format(user.registered_date, 'dd/MM/yyyy')}</span>
              </div>
              <div className="flex items-center text-sm">
                <Building2 className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
                <span>{user.bookings_count} {user.bookings_count <= 1 ? 'Réservation' : 'Réservations'}</span>
              </div>
            </div>
          </div>
          
          <div className="flex-shrink-0 flex flex-col items-center gap-2">
            {user.status === 'active' && onDeactivate && (
              <Button 
                size="sm" 
                variant="outline"
                className="mt-2 h-8 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeactivate(user.id);
                }}
              >
                Désactiver
              </Button>
            )}
            
            {user.status !== 'active' && onActivate && (
              <Button 
                size="sm"
                className="mt-2 h-8 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  onActivate(user.id);
                }}
              >
                Activer
              </Button>
            )}
            
            <ChevronRight className="mt-1 h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
