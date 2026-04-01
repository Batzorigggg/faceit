export function extractMatchStats(match: any, playerId: string) {
    const round = match.rounds[0]

    const map = round.round_stats.Map

    let playerData: any = null
    let playerTeam: any = null
    let enemyTeam: any = null

    for (const team of round.teams) {
        const found = team.players.find(
            (p: any) => p.player_id === playerId
        )

        if (found) {
            playerData = found
            playerTeam = team
        } else {
            enemyTeam = team
        }
    }

    if (!playerData) {
        throw new Error("Player not found in match")
    }

    const stats = playerData.player_stats

    const kills = Number(stats["Kills"])
    const deaths = Number(stats["Deaths"])
    const assists = Number(stats["Assists"])
    const kd = Number(stats["K/D Ratio"])
    const hsPercent = Number(stats["Headshots %"])

    const playerScore = Number(playerTeam.team_stats["Final Score"])
    const enemyScore = Number(enemyTeam.team_stats["Final Score"])

    const result = playerScore > enemyScore

    return {
        map,
        kills,
        deaths,
        assists,
        kd,
        hsPercent,
        result,
    }
}