const BASE_URL = 'https://open.faceit.com/data/v4';

const headers = {
  Authorization: `Bearer ${process.env.FACEIT_API_KEY}`,
};

export class FaceitService {
  async getPlayer(nickname: string) {
    const res = await fetch(`${BASE_URL}/players?nickname=${nickname}`, {
      headers,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.errors?.[0]?.message || 'Player not found');
    }

    return data;
  }

  async getMatchHistory(playerId: string) {
    const res = await fetch(
      `${BASE_URL}/players/${playerId}/history?game=cs2&limit=10`,
      { headers }
    );

    if (!res.ok) throw new Error('Failed to fetch matches');

    return res.json();
  }

  async getMatchStats(matchId: string) {
    const res = await fetch(`${BASE_URL}/matches/${matchId}/stats`, {
      headers,
    });

    if (!res.ok) throw new Error('Failed to fetch match stats');

    return res.json();
  }
}
