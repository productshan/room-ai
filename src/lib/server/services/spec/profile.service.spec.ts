import { describe, expect, it, vi, beforeEach } from 'vitest';
import { getCurrentProfile, updateCurrentProfile } from '../profile.service';
import { supabaseClient } from '../../supabase/client';
import * as repo from '../../repositories/profiles.repository';

vi.mock('../../supabase/client', () => ({
  supabaseClient: {
    auth: {
      getUser: vi.fn()
    }
  }
}));

vi.mock('../../repositories/profiles.repository', () => ({
  getProfileById: vi.fn(),
  updateProfile: vi.fn()
}));

describe('profile service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getCurrentProfile retrieves profile for valid token', async () => {
    const mockUser = { id: 'user-123' };
    const mockProfile = {
      id: 'user-123',
      username: 'testuser',
      full_name: 'Test User',
      avatar_url: 'http://example.com/avatar.png',
      created_at: '2026-06-27'
    };

    vi.mocked(supabaseClient.auth.getUser).mockResolvedValue({
      data: { user: mockUser as any },
      error: null
    });
    vi.mocked(repo.getProfileById).mockResolvedValue(mockProfile);

    const headers = new Headers();
    headers.set('authorization', 'Bearer valid-jwt-token');

    const result = await getCurrentProfile(headers);
    expect(result).toEqual(mockProfile);
    expect(supabaseClient.auth.getUser).toHaveBeenCalledWith('valid-jwt-token');
    expect(repo.getProfileById).toHaveBeenCalledWith('user-123');
  });

  it('getCurrentProfile throws 401 for invalid token', async () => {
    vi.mocked(supabaseClient.auth.getUser).mockResolvedValue({
      data: { user: null },
      error: new Error('Invalid token') as any
    });

    const headers = new Headers();
    headers.set('authorization', 'Bearer invalid-token');

    await expect(getCurrentProfile(headers)).rejects.toThrow('Unauthorized: Invalid token');
  });

  it('updateCurrentProfile validates payload and updates profile', async () => {
    const mockUser = { id: 'user-123' };
    const mockProfile = {
      id: 'user-123',
      username: 'testuser',
      full_name: 'Updated User',
      avatar_url: 'http://example.com/new.png',
      created_at: '2026-06-27'
    };

    vi.mocked(supabaseClient.auth.getUser).mockResolvedValue({
      data: { user: mockUser as any },
      error: null
    });
    vi.mocked(repo.updateProfile).mockResolvedValue(mockProfile);

    const headers = new Headers();
    headers.set('authorization', 'Bearer valid-jwt-token');

    const payload = {
      full_name: 'Updated User',
      avatar_url: 'http://example.com/new.png'
    };

    const result = await updateCurrentProfile(headers, payload);
    expect(result).toEqual(mockProfile);
    expect(repo.updateProfile).toHaveBeenCalledWith('user-123', payload);
  });
});
