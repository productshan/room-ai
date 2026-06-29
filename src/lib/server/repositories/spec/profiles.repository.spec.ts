import { describe, expect, it } from 'vitest';
import { supabaseAdmin } from '../../supabase/admin';
import { getProfileById, updateProfile } from '../profiles.repository';

describe('profiles repository', () => {
  it('can retrieve and update a profile', async () => {
    // 1. Create a temporary test user using admin API
    const email = `test-${Date.now()}@example.com`;
    const password = 'TestPassword123!';
    const { data: { user }, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        username: `user_${Date.now()}`,
        full_name: 'Testy McTestface',
        avatar_url: 'http://example.com/avatar.png'
      }
    });

    expect(error).toBeNull();
    expect(user).toBeTruthy();
    const userId = user!.id;

    try {
      // The DB trigger handle_new_user should automatically insert the profile!
      // Wait for a brief moment for trigger to commit if needed, or query directly
      const profile = await getProfileById(userId);
      expect(profile).toBeTruthy();
      expect(profile!.full_name).toBe('Testy McTestface');
      expect(profile!.username).toContain('user_');

      // Update the profile
      const updated = await updateProfile(userId, {
        full_name: 'Updated Name',
        avatar_url: 'http://example.com/new-avatar.png'
      });

      expect(updated).toBeTruthy();
      expect(updated!.full_name).toBe('Updated Name');
      expect(updated!.avatar_url).toBe('http://example.com/new-avatar.png');

      const refetched = await getProfileById(userId);
      expect(refetched!.full_name).toBe('Updated Name');
    } finally {
      // Cleanup the user
      await supabaseAdmin.auth.admin.deleteUser(userId);
    }
  });
});
