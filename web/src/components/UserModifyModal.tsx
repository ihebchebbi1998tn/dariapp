
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { UserForm } from '@/components/UserForm';
import { UserData } from '@/components/UserItem';

interface UserModifyModalProps {
  user: UserData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Partial<UserData>) => void;
}

export const UserModifyModal: React.FC<UserModifyModalProps> = ({
  user,
  open,
  onOpenChange,
  onSubmit,
}) => {
  if (!user) return null;

  const handleSubmit = (data: Partial<UserData>) => {
    onSubmit(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Modifier l'utilisateur</DialogTitle>
        </DialogHeader>
        <UserForm 
          initialData={user} 
          onSubmit={handleSubmit} 
          onCancel={() => onOpenChange(false)} 
        />
      </DialogContent>
    </Dialog>
  );
};
