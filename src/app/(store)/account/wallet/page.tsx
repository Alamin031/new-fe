/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';


import {Card, CardContent} from '../../../components/ui/card';
import {Button} from '../../../components/ui/button';
import {formatPrice} from '../../../lib/utils/format';
import {withProtectedRoute} from '../../../lib/auth/protected-route';
import { Gift } from 'lucide-react';
import { useEffect, useState } from 'react';
import usersService from '../../../lib/api/services/users';
import { useAuthStore } from '../../../store/auth-store';

function WalletPage() {
  const user = useAuthStore(state => state.user);
  const [rewardPoints, setRewardPoints] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      if (!user) return;
      try {
        // Fetch all users' reward points and find the current user's points
        const allRewards = await usersService.getAllRewardPoints();
        const currentUserReward = allRewards.find((r: any) => r.userId === user.id);
        setRewardPoints(currentUserReward?.rewardPoints || 0);
      } catch {}
    }
    fetchData();
  }, [user]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Rewards</h1>
        <p className="text-muted-foreground">Manage your rewards.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-500/10">
                <Gift className="h-7 w-7 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Reward Points</p>
                <p className="text-3xl font-bold">
                  {rewardPoints.toLocaleString()}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              = {formatPrice(rewardPoints)} value • Earn 1 point per ৳100 spent
            </p>
            <Button className="mt-4 w-full" variant="fjhfhs">
              Redeem Points
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default withProtectedRoute(WalletPage, {
  requiredRoles: ['user'],
});
